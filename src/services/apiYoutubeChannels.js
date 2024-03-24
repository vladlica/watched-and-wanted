import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

// Params:
// - sortBy: Object - Containing field and direction to sort by
// - filters: Object - Array of filter objects containing field and value to filter by
// - page: Number - Indicating the page of results to retrieve
// - search: String - Used to perform a case-insensitive search on Youtube channels names
// - currentUserId: String - Representing the ID of the current user
export async function getYoutubeChannels({
  sortBy,
  filters,
  page,
  search,
  currentUserId,
}) {
  let query = supabase
    .from("youtube_channels")
    // Using extra_info(*), we retrieve additional details associated with
    // each Youtube channel item from the related "extra_info" table, leveraging the
    // foreign key relationship between the two tables
    .select("*, extra_info(*)", { count: "exact" });

  if (currentUserId) query = query.eq("userId", currentUserId);
  else return { data: [], count: 0 };

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

// Params:
// - id: String - Unique identifier for a Youtube channel item
export async function getYoutubeChannel(id) {
  const { data, error } = await supabase
    .from("youtube_channels")
    // Using extra_info(*), we retrieve additional details associated with
    // the Youtube channel item from the related "extra_info" table, leveraging the
    // foreign key relationship between the two tables
    .select("*, extra_info(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Youtube channel not found");
  }

  return data;
}

// Params:
// - newYoutubeChannel - Object - Containing info about the Youtube channel item to be created
// - extraInfo - Object - Array of extra info items about the Youtube channel to be created
export async function createYoutubeChannel(newYoutubeChannel, extraInfo) {
  let query = supabase;
  // If there are extra information associated with the Youtube channel, a stored procedure is used for transactional integrity,
  // otherwise, the Youtube channel is inserted using the Supabase JavaScript Client
  // For detailed explanations of the stored procedure, refer to the documentation file: "storedProcedures.md"
  if (extraInfo?.length)
    query = query.rpc("insert_channel_and_extra_info", {
      p_channel_data: [newYoutubeChannel],
      p_extra_info_data: extraInfo,
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

// Params:
// - id: String - Unique identifier for a Youtube channel item
// - youtubeChannelUpdates - Object - Containing info about the Youtube channel item to be updated
// - extraInfo - Object - Array of extra info items about the Youtube channel to be updated
export async function updateYoutubeChannel(
  id,
  youtubeChannelUpdates,
  extraInfo
) {
  let query = supabase;
  // If the update operation involves modifying the entire Youtube channel item,
  // a stored procedure is used to ensure transactional integrity
  // Otherwise, if only the status is being toggled, the update is executed
  // directly using the Supabase JavaScript Client
  // For detailed information about the stored procedure, please refer to the documentation file: "storedProcedures.md"
  if (Boolean(extraInfo)) {
    query = query.rpc("update_channel_and_extra_info", {
      p_channel_id: id,
      p_channel_data: [youtubeChannelUpdates],
      p_extra_info_data: extraInfo,
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

// Params:
// - id: String - Unique identifier for a Youtube channel item
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
