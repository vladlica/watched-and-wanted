import { differenceInDays, format } from "date-fns";
import { PAGE_SIZE } from "../utils/constants";
import { checkIfLongestAndShortestBook } from "../utils/helpers";
import supabase from "./supabase";

// Params:
// - filter: Object - Containing field and value to filter by
// - sortBy: Object - Containing field and direction to sort by
// - page: Number - Indicating the page of results to retrieve
// - search: String - Used to perform a case-insensitive search on books authors, titles and series
// - currentUserId: String - Representing the ID of the current user
export async function getBooks({
  filter,
  sortBy,
  page,
  search,
  currentUserId,
}) {
  let query = supabase
    .from("books")
    // Using extra_info(*), we retrieve additional details associated with
    // each book item from the related "extra_info" table, leveraging the
    // foreign key relationship between the two tables
    .select("*, extra_info(*)", { count: "exact" });

  if (currentUserId) query = query.eq("userId", currentUserId);
  else return { data: [], count: 0 };

  if (filter) query = query.eq(filter.field, filter.value);

  if (search)
    // The search query should match the author, title, or series partially or entirely
    query = query.or(
      `author.ilike.%${search}%, title.ilike.%${search}%, series.ilike.%${search}%`
    );

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Books could not be loaded");
  }

  return { data, count };
}

// Params:
// - id: String - Unique identifier for a book item
export async function getBook(id) {
  const { data, error } = await supabase
    .from("books")
    // Using extra_info(*), we retrieve additional details associated with
    // the book item from the related "extra_info" table, leveraging the
    // foreign key relationship between the two tables
    .select("*, extra_info(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Book not found");
  }

  if (data.series) {
    const { data: booksSameSeries, error: error1 } = await supabase
      .from("books")
      .select("*")
      .eq("series", data.series)
      .eq("userId", data.userId)
      .neq("id", id);

    if (error1) {
      console.error(error1);
    }

    if (booksSameSeries?.length) data.booksSameSeries = booksSameSeries;
  }

  const { data: booksSameAuthor, error: error2 } = await supabase
    .from("books")
    .select("*")
    .eq("author", data.author)
    .eq("userId", data.userId)
    .neq("series", data.series)
    .neq("id", id);

  if (error2) {
    console.error(error2);
  }

  if (booksSameAuthor?.length) data.booksSameAuthor = booksSameAuthor;

  if (data.finishDate) {
    const startDate = new Date(
      +format(new Date(data.finishDate), "yyyy"),
      0,
      1
    );

    const endDate = new Date(
      +format(new Date(data.finishDate), "yyyy") + 1,
      0,
      1
    );

    const { data: booksSameYear, error: error3 } = await supabase
      .from("books")
      .select("*")
      .eq("status", "read")
      .gte("finishDate", startDate.toISOString())
      .lt("finishDate", endDate.toISOString())
      .eq("userId", data.userId)
      .neq("id", id);

    if (error3) {
      console.error(error3);
    }

    if (booksSameYear?.length) data.booksSameYear = booksSameYear;

    if (data.status === "read") {
      const { isLongestBook, isShortestBook } = checkIfLongestAndShortestBook(
        data.numPages,
        booksSameYear
      );

      data.isLongestBook = isLongestBook;
      data.isShortestBook = isShortestBook;
    }

    if (data.startDate && data.finishDate) {
      data.numDays =
        differenceInDays(
          new Date(data.finishDate.split("T")[0]),
          new Date(data.startDate.split("T")[0])
        ) + 1;
    }
  }

  return data;
}

// Params:
// - newBook - Object - Containing info about the book item to be created
// - extraInfo - Object - Array of extra info items about the book to be created
export async function createBook(newBook, extraInfo) {
  let query = supabase;
  // If there are extra information associated with the book, a stored procedure is used for transactional integrity,
  // otherwise, the book is inserted using the Supabase JavaScript Client
  // For detailed explanations of the stored procedure, refer to the documentation file: "storedProcedures.md"
  if (extraInfo?.length)
    query = query.rpc("insert_book_and_extra_info", {
      p_book_data: [newBook],
      p_extra_info_data: extraInfo,
    });
  else query = query.from("books").insert([newBook]).select().single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Book could not be created");
  }

  return data;
}

// Params:
// - id: String - Unique identifier for a book item
// - bookUpdates - Object - Containing info about the book item to be updated
// - extraInfo - Object - Array of extra info items about the book to be updated
export async function updateBook(id, bookUpdates, extraInfo) {
  let query = supabase;
  // If the update operation involves modifying the entire book item,
  // a stored procedure is used to ensure transactional integrity
  // Otherwise, if only the status is being toggled, the update is executed
  // directly using the Supabase JavaScript Client
  // For detailed information about the stored procedure, please refer to the documentation file: "storedProcedures.md"
  if (Boolean(extraInfo)) {
    query = query.rpc("update_book_and_extra_info", {
      p_book_id: id,
      p_book_data: [bookUpdates],
      p_extra_info_data: extraInfo,
    });
  } else {
    query = query
      .from("books")
      .update(bookUpdates)
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Book could not be updated");
  }

  return data;
}

// Params:
// - id: String - Unique identifier for a book item
export async function deleteBook(id) {
  const { data, error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Book could not be deleted");
  }

  return data;
}
