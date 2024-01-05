import supabase from "./supabase";

export async function getMovies({ sortBy, filters, page, search }) {
  let query = supabase
    .from("movies")
    .select("*, extra_info(*)", { count: "exact" });

  // if (filters.length > 0)
  //   filters.forEach((filter) => (query = query.eq(filter.field, filter.value)));

  // if (search) query = query.ilike("title", `%${search}%`);

  // if (sortBy)
  //   query = query.order(sortBy.field, {
  //     ascending: sortBy.direction === "asc",
  //   });

  // if (page) {
  //   const from = (page - 1) * PAGE_SIZE;
  //   const to = from + PAGE_SIZE - 1;
  //   query = query.range(from, to);
  // }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Movies could not be loaded");
  }

  return { data, count };
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
