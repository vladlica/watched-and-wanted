import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getMovies({
  sortBy,
  filters,
  page,
  search,
  currentUserId,
}) {
  let query = supabase
    .from("movies")
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

export async function getMovie(id) {
  const { data, error } = await supabase
    .from("movies")
    .select("*, extra_info(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Movie not found");
  }

  if (data.status === "watched") {
    const { data: arrayDuration, error1 } = await supabase
      .from("movies")
      .select("duration")
      .eq("status", "watched")
      .eq("userId", data.userId)
      .order("duration", { ascending: false });

    if (error1) {
      console.error(error1);
    }

    if (data.duration === +arrayDuration.at(0).duration)
      data.biggestDuration = true;
    else data.biggestDuration = false;

    if (data.duration === +arrayDuration.at(-1).duration)
      data.smallestDuration = true;
    else data.smallestDuration = false;
  }

  return data;
}

export async function createMovie(newMovie, extraInfo) {
  let query = supabase;

  if (extraInfo?.length)
    query = query.rpc("insert_movie_and_extra_info", {
      p_movie_data: [newMovie],
      p_extra_info_data: [extraInfo],
    });
  else query = query.from("movies").insert([newMovie]).select().single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Movie could not be created");
  }

  return data;
}

export async function updateMovie(id, movieUpdates, extraInfo) {
  let query = supabase;

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

export async function deleteMovie(id) {
  const { data, error } = await supabase.from("movies").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Movie could not be deleted");
  }

  return data;
}
