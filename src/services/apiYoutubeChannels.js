import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getYoutubeChannels({ sortBy, filters, page, search }) {
  let query = supabase
    .from("youtube_channels")
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
    throw new Error("Youtube channels could not be loaded");
  }

  return { data, count };
}
