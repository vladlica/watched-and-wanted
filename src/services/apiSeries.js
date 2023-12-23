import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getSeries() {
  let query = supabase
    .from("series")
    .select("*, extra_info(*)", { count: "exact" });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Series could not be loaded");
  }

  return { data, count };
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
