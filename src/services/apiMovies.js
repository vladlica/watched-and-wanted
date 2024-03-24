import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

// Params:
// - filters: Object - Array of filter objects containing field and value to filter by
// - sortBy: Object - Containing field and direction to sort by
// - page: Number - Indicating the page of results to retrieve
// - search: String - Used to perform a case-insensitive search on movies titles
// - currentUserId: String - Representing the ID of the current user
export async function getMovies({
  sortBy,
  filters,
  page,
  search,
  currentUserId,
}) {
  let query = supabase
    .from("movies")
    // Using extra_info(*), we retrieve additional details associated with
    // each movie item from the related "extra_info" table, leveraging the
    // foreign key relationship between the two tables
    .select("*, extra_info(*)", { count: "exact" });

  if (currentUserId) query = query.eq("userId", currentUserId);
  else return { data: [], count: 0 };

  if (filters.length > 0)
    filters.forEach((filter) => (query = query.eq(filter.field, filter.value)));

  if (search) query = query.ilike("title", `%${search}%`);

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
    throw new Error("Movies could not be loaded");
  }

  return { data, count };
}

// Params:
// - id: String - Unique identifier for a movie item
export async function getMovie(id) {
  const { data, error } = await supabase
    .from("movies")
    // Using extra_info(*), we retrieve additional details associated with
    // the movie item from the related "extra_info" table, leveraging the
    // foreign key relationship between the two tables
    .select("*, extra_info(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Movie not found");
  }

  if (data.status === "watched") {
    // Retrieves an array of watched movie items in descending order based on the duration
    const { data: arrayDuration, error1 } = await supabase
      .from("movies")
      .select("duration")
      .eq("status", "watched")
      .eq("userId", data.userId)
      .order("duration", { ascending: false });

    if (error1) {
      console.error(error1);
    }

    if (data.duration === arrayDuration.at(0).duration)
      data.longestDuration = true;
    else data.longestDuration = false;

    if (data.duration === arrayDuration.at(-1).duration)
      data.shortestDuration = true;
    else data.shortestDuration = false;
  }

  return data;
}

// Params:
// - newMovie - Object - Containing info about the movie item to be created
// - extraInfo - Object - Array of extra info items about the movie to be created
export async function createMovie(newMovie, extraInfo) {
  let query = supabase;
  // If there are extra information associated with the movie, a stored procedure is used for transactional integrity,
  // otherwise, the movie is inserted using the Supabase JavaScript Client
  // For detailed explanations of the stored procedure, refer to the documentation file: "storedProcedures.md"
  if (extraInfo?.length)
    query = query.rpc("insert_movie_and_extra_info", {
      p_movie_data: [newMovie],
      p_extra_info_data: extraInfo,
    });
  else query = query.from("movies").insert([newMovie]).select().single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Movie could not be created");
  }

  return data;
}

// Params:
// - id: String - Unique identifier for a movie item
// - movieUpdates - Object - Containing info about the movie item to be updated
// - extraInfo - Object - Array of extra info items about the movie to be updated
export async function updateMovie(id, movieUpdates, extraInfo) {
  let query = supabase;
  // If the update operation involves modifying the entire movie item,
  // a stored procedure is used to ensure transactional integrity
  // Otherwise, if only the status is being toggled, the update is executed
  // directly using the Supabase JavaScript Client
  // For detailed information about the stored procedure, please refer to the documentation file: "storedProcedures.md"
  if (Boolean(extraInfo)) {
    query = query.rpc("update_movie_and_extra_info", {
      p_movie_id: id,
      p_movie_data: [movieUpdates],
      p_extra_info_data: [extraInfo],
    });
  } else {
    query = query
      .from("movies")
      .update(movieUpdates)
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Movie could not be updated");
  }

  return data;
}

// Params:
// - id: String - Unique identifier for a movie item
export async function deleteMovie(id) {
  const { data, error } = await supabase.from("movies").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Movie could not be deleted");
  }

  return data;
}
