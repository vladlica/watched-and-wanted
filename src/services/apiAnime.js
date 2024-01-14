import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getAnime({ filter, sortBy, page, search }) {
  let query = supabase
    .from("anime")
    .select("*, extra_info(*)", { count: "exact" });

  // if (filter) query = query.eq(filter.field, filter.value);

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
    throw new Error("Anime could not be loaded");
  }

  return { data, count };
}

export async function createAnime(newAnime, extraInfo) {
  let query = supabase;

  if (extraInfo?.length)
    query = query.rpc("insert_anime_and_extra_info", {
      p_anime_data: [newAnime],
      p_extra_info_data: [extraInfo],
    });
  else query = query.from("anime").insert([newAnime]).select().single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Anime could not be created");
  }

  return data;
}

export async function updateAnime(id, animeUpdates, extraInfo) {
  let query = supabase;

  if (Boolean(extraInfo)) {
    query = query.rpc("update_anime_and_extra_info", {
      p_anime_id: id,
      p_anime_data: [animeUpdates],
      p_extra_info_data: [extraInfo],
    });
  } else {
    query = query
      .from("anime")
      .update(animeUpdates)
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Anime could not be updated");
  }

  return data;
}

export async function deleteAnime(id) {
  const { data, error } = await supabase.from("anime").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Anime could not be deleted");
  }

  return data;
}
