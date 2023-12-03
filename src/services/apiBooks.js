import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getBooks({ filter, sortBy, page }) {
  let query = supabase
    .from("books")
    .select("*, extra_info(id, text, link)", { count: "exact" });

  if (filter) query = query.eq(filter.field, filter.value);

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

export async function createBook(newBook, extraInfo) {
  let query = supabase;

  if (extraInfo?.length)
    query = query.rpc("insert_book_and_extra_info", {
      p_book_data: [newBook],
      p_extra_info_data: [extraInfo],
    });
  else query = query.from("books").insert([newBook]).select().single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Book could not be created");
  }

  return data;

  // const { data, error } = await supabase.rpc("insert_book_and_extra_info", {
  //   p_book_data: [newBook],
  //   p_extra_info_data: [extraInfo],
  // });

  // if (error) {
  //   console.error(error);
  //   throw new Error("Book could not be created");
  // }

  // return data;
  // const { data, error } = await supabase
  //   .from("books")
  //   .insert([newBook])
  //   .select()
  //   .single();
  // if (error) {
  //   console.error(error);
  //   throw new Error("Book could not be created");
  // }
  // if (extraInfo?.length) {
  //   const extraInfoArray = extraInfo.map((item) => ({
  //     ...item,
  //     bookId: data.id,
  //   }));
  //   const { error: extraInfoError } = await supabase
  //     .from("extra_info")
  //     .insert(extraInfoArray);
  //   if (extraInfoError) {
  //     console.error(extraInfoError);
  //     deleteBook(data.id);
  //     throw new Error(
  //       "Book could not be created due to problems with creating the comments and the links"
  //     );
  //   }
  // }
  // return data;
}

export async function updateBook(id, bookUpdates, extraInfo) {
  let query = supabase;

  if (Boolean(extraInfo)) {
    query = query.rpc("update_book_and_extra_info", {
      p_book_id: id,
      p_book_data: [bookUpdates],
      p_extra_info_data: [extraInfo],
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
  // const { data, error } = await supabase
  //   .from("books")
  //   .update(obj)
  //   .eq("id", id)
  //   .select()
  //   .single();
  // if (error) {
  //   console.error(error);
  //   throw new Error("Book could not be updated");
  // }
  // const { error: deleteError } = await supabase
  //   .from("extra_info")
  //   .delete()
  //   .eq("bookId", id)
  //   .select();
  // if (deleteError) {
  //   console.error(deleteError);
  //   throw new Error("Book's comments and links could not be updated");
  // }
  // if (extraInfo?.length) {
  //   const extraInfoArray = extraInfo.map((item) => ({
  //     ...item,
  //     bookId: id,
  //   }));
  //   const { error: extraInfoError } = await supabase
  //     .from("extra_info")
  //     .insert(extraInfoArray);
  //   if (extraInfoError) {
  //     console.error(extraInfoError);
  //     throw new Error("Book's comments and links could not be updated");
  //   }
  // }
  // return data;
}

export async function deleteBook(id) {
  const { data, error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Book could not be deleted");
  }

  return data;
}
