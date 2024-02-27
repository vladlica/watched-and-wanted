import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getSeries({ sortBy, filters, page, search, userId }) {
  let query = supabase
    .from("series")
    .select("*, extra_info(*)", { count: "exact" })
    .eq("userId", userId);

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
    throw new Error("Series could not be loaded");
  }

  return { data, count };
}

export async function getSeriesDetails(id) {
  const { data, error } = await supabase
    .from("series")
    .select("*, extra_info(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Series not found");
  }

  if (data.status === "watched") {
    const { data: arrayNumberOfSeasons, error1 } = await supabase
      .from("series")
      .select("numSeasons")
      .eq("status", "watched")
      .order("numSeasons", { ascending: false });

    if (error1) {
      console.error(error1);
    }

    if (data.numSeasons === +arrayNumberOfSeasons.at(0).numSeasons)
      data.biggestNumberOfSeasons = true;
    else data.biggestNumberOfSeasons = false;

    if (data.numSeasons === +arrayNumberOfSeasons.at(-1).numSeasons)
      data.smallestNumberOfSeasons = true;
    else data.smallestNumberOfSeasons = false;

    const { data: arrayNumberOfEpisodes, error2 } = await supabase
      .from("series")
      .select("numEpisodes")
      .eq("status", "watched")
      .order("numEpisodes", { ascending: false });

    if (error2) {
      console.error(error2);
    }

    if (data.numEpisodes === +arrayNumberOfEpisodes.at(0).numEpisodes)
      data.biggestNumberOfEpisodes = true;
    else data.biggestNumberOfEpisodes = false;

    if (data.numEpisodes === +arrayNumberOfEpisodes.at(-1).numEpisodes)
      data.smallestNumberOfEpisodes = true;
    else data.smallestNumberOfEpisodes = false;
  }

  return data;
}

export async function createSeries(newSeries, extraInfo) {
  let query = supabase;

  if (extraInfo?.length)
    query = query.rpc("insert_series_and_extra_info", {
      p_series_data: [newSeries],
      p_extra_info_data: [extraInfo],
    });
  else query = query.from("series").insert([newSeries]).select().single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Series could not be created");
  }

  return data;
}

export async function updateSeries(id, seriesUpdates, extraInfo) {
  let query = supabase;

  if (Boolean(extraInfo)) {
    query = query.rpc("update_series_and_extra_info", {
      p_series_id: id,
      p_series_data: [seriesUpdates],
      p_extra_info_data: [extraInfo],
    });
  } else {
    query = query
      .from("series")
      .update(seriesUpdates)
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Series could not be updated");
  }

  return data;
}

export async function deleteSeries(id) {
  const { data, error } = await supabase.from("series").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Series could not be deleted");
  }

  return data;
}
