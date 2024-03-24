import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

// Params:
// - sortBy: Object - Containing field and direction to sort by
// - filters: Object - Array of filter objects containing field and value to filter by
// - page: Number - Indicating the page of results to retrieve
// - search: String - Used to perform a case-insensitive search on series titles
// - currentUserId: String - Representing the ID of the current user
export async function getSeries({
  sortBy,
  filters,
  page,
  search,
  currentUserId,
}) {
  let query = supabase
    .from("series")
    // Using extra_info(*), we retrieve additional details associated with
    // each series item from the related "extra_info" table, leveraging the
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
    throw new Error("Series could not be loaded");
  }

  return { data, count };
}

// Params:
// - id: String - Unique identifier for a series item
export async function getSeriesDetails(id) {
  const { data, error } = await supabase
    .from("series")
    // Using extra_info(*), we retrieve additional details associated with
    // the series item from the related "extra_info" table, leveraging the
    // foreign key relationship between the two tables
    .select("*, extra_info(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Series not found");
  }

  if (data.status === "watched") {
    // Retrieves an array of watched series items in descending order based on the number of seasons
    const { data: arrayNumberOfSeasons, error1 } = await supabase
      .from("series")
      .select("numSeasons")
      .eq("status", "watched")
      .eq("userId", data.userId)
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

    // Retrieves an array of watched series items in descending order based on the number of episodes
    const { data: arrayNumberOfEpisodes, error2 } = await supabase
      .from("series")
      .select("numEpisodes")
      .eq("status", "watched")
      .eq("userId", data.userId)
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

// Params:
// - newSeries - Object - Containing info about the series item to be created
// - extraInfo - Object - Array of extra info items about the series to be created
export async function createSeries(newSeries, extraInfo) {
  let query = supabase;
  // If there are extra information associated with the series, a stored procedure is used for transactional integrity,
  // otherwise, the series is inserted using the Supabase JavaScript Client
  // For detailed explanations of the stored procedure, refer to the documentation file: "storedProcedures.md"
  if (extraInfo?.length)
    query = query.rpc("insert_series_and_extra_info", {
      p_series_data: [newSeries],
      p_extra_info_data: extraInfo,
    });
  else query = query.from("series").insert([newSeries]).select().single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Series could not be created");
  }

  return data;
}

// Params:
// - id: String - Unique identifier for a series item
// - seriesUpdates - Object - Containing info about the series item to be updated
// - extraInfo - Object - Array of extra info items about the series to be updated
export async function updateSeries(id, seriesUpdates, extraInfo) {
  let query = supabase;
  // If the update operation involves modifying the entire series item,
  // a stored procedure is used to ensure transactional integrity
  // Otherwise, if only the status is being toggled, the update is executed
  // directly using the Supabase JavaScript Client
  // For detailed information about the stored procedure, please refer to the documentation file: "storedProcedures.md"
  if (Boolean(extraInfo)) {
    query = query.rpc("update_series_and_extra_info", {
      p_series_id: id,
      p_series_data: [seriesUpdates],
      p_extra_info_data: extraInfo,
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

// Params:
// - id: String - Unique identifier for a series item
export async function deleteSeries(id) {
  const { data, error } = await supabase.from("series").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Series could not be deleted");
  }

  return data;
}
