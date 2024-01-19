import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getYoutubeChannels({ sortBy, filters, page, search }) {
  let query = supabase
    .from("youtube_channels")
    .select("*, extra_info(*)", { count: "exact" });

  if (filters.length > 0)
    filters.forEach((filter) => (query = query.eq(filter.field, filter.value)));

  if (search) query = query.ilike("channelName", `%${search}%`);

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
    throw new Error("Youtube channels could not be loaded");
  }

  return { data, count };
}

export async function createYoutubeChannel(newYoutubeChannel, extraInfo) {
  let query = supabase;

  if (extraInfo?.length)
    query = query.rpc("insert_channel_and_extra_info", {
      p_channel_data: [newYoutubeChannel],
      p_extra_info_data: [extraInfo],
    });
  else
    query = query
      .from("youtube_channels")
      .insert([newYoutubeChannel])
      .select()
      .single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Youtube channel could not be created");
  }

  return data;
}

export async function updateYoutubeChannel(
  id,
  youtubeChannelUpdates,
  extraInfo
) {
  let query = supabase;

  if (Boolean(extraInfo)) {
    query = query.rpc("update_channel_and_extra_info", {
      p_channel_id: id,
      p_channel_data: [youtubeChannelUpdates],
      p_extra_info_data: [extraInfo],
    });
  } else {
    query = query
      .from("youtube_channels")
      .update(youtubeChannelUpdates)
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Youtube channel could not be updated");
  }

  return data;
}

export async function deleteYoutubeChannel(id) {
  const { data, error } = await supabase
    .from("youtube_channels")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Youtube channel could not be deleted");
  }

  return data;
}
