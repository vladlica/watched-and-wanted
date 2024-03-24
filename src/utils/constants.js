// The number of items per page in table
export const PAGE_SIZE = 10;
export const baseUrl = window.location.origin;
export const RADIAN = Math.PI / 180;
// Mapping different status values to their corresponding tag colors.
export const statusToTagColor = {
  read: "green",
  watched: "green",
  subscribed: "green",
  wanted: "silver",
};

// Mapping different types of media to their corresponding colors to be used in the dashboard page
export const dashboardColors = {
  books: { color: "orange", value: "var(--color-orange-500)" },
  series: { color: "green", value: "var(--color-green-500)" },
  movies: { color: "blue", value: "var(--color-blue-500)" },
  anime: { color: "yellow", value: "var(--color-yellow-500)" },
  youtubeChannels: { color: "red", value: "var(--color-red-500)" },
};
