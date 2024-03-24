import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

// Params:
// - filter: Object - Containing field and value to filter by
// - sortBy: Object - Containing field and direction to sort by
// - page: Number - Indicating the page of results to retrieve
// - search: String - Used to perform a case-insensitive search on anime titles
// - currentUserId: String - Representing the ID of the current user
export async function getAnime({
  filter,
  sortBy,
  page,
  search,
  currentUserId,
}) {
  let query = supabase
    .from("anime")
    // Using extra_info(*), we retrieve additional details associated with
    // each anime item from the related "extra_info" table, leveraging the
    // foreign key relationship between the two tables
    .select("*, extra_info(*)", { count: "exact" });

  if (currentUserId) query = query.eq("userId", currentUserId);
  else return { data: [], count: 0 };

  if (filter) query = query.eq(filter.field, filter.value);

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
    throw new Error("Anime could not be loaded");
  }

  return { data, count };
}

// Params:
// - id: String - Unique identifier for an anime item
export async function getAnimeDetails(id) {
  const { data, error } = await supabase
    .from("anime")
    // Using extra_info(*), we retrieve additional details associated with
    // the anime item from the related "extra_info" table, leveraging the
    // foreign key relationship between the two tables
    .select("*, extra_info(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Anime not found");
  }

  if (data.status === "watched") {
    // Retrieves an array of watched anime items in descending order based on the number of episodes
    const { data: arrayEpisodes, error1 } = await supabase
      .from("anime")
      .select("numEpisodes")
      .eq("status", "watched")
      .eq("userId", data.userId)
      .order("numEpisodes", { ascending: false });

    if (error1) {
      console.error(error1);
    }

    console.log(arrayEpisodes);

    if (data.numEpisodes === arrayEpisodes.at(0).numEpisodes)
      data.biggestNumberOfEpisodes = true;
    else data.biggestNumberOfEpisodes = false;

    if (data.numEpisodes === arrayEpisodes.at(-1).numEpisodes)
      data.smallestNumberOfEpisodes = true;
    else data.smallestNumberOfEpisodes = false;
  }

  return data;
}

// Params:
// - newAnime - Object - Containing info about the anime item to be created
// - extraInfo - Object - Array of extra info items about the anime to be created
export async function createAnime(newAnime, extraInfo) {
  let query = supabase;
  // If there are extra information associated with the anime, a stored procedure is used for transactional integrity,
  // otherwise, the anime is inserted using the Supabase JavaScript Client
  // For detailed explanations of the stored procedure, refer to the documentation file: "storedProcedures.md"
  if (extraInfo?.length)
    query = query.rpc("insert_anime_and_extra_info", {
      p_anime_data: [newAnime],
      p_extra_info_data: extraInfo,
    });
  else query = query.from("anime").insert([newAnime]).select().single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Anime could not be created");
  }

  return data;
}

// Params:
// - id: String - Unique identifier for an anime item
// - animeUpdates - Object - Containing info about the anime item to be updated
// - extraInfo - Object - Array of extra info items about the anime to be updated
export async function updateAnime(id, animeUpdates, extraInfo) {
  let query = supabase;
  // If the update operation involves modifying the entire anime item,
  // a stored procedure is used to ensure transactional integrity
  // Otherwise, if only the status is being toggled, the update is executed
  // directly using the Supabase JavaScript Client
  // For detailed information about the stored procedure, please refer to the documentation file: "storedProcedures.md"
  if (Boolean(extraInfo)) {
    query = query.rpc("update_anime_and_extra_info", {
      p_anime_id: id,
      p_anime_data: [animeUpdates],
      p_extra_info_data: extraInfo,
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

// Params:
// - id: String - Unique identifier for an anime item
export async function deleteAnime(id) {
  const { data, error } = await supabase.from("anime").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Anime could not be deleted");
  }

  return data;
}
