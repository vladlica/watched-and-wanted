import { differenceInDays, format } from "date-fns";
import { dashboardColors } from "./constants";

// Params:
// - fullName: String - The full name of the user from which to extract initials
export function getInitials(fullName) {
  if (!fullName) return "";
  return fullName
    .split(" ")
    .slice(0, 2)
    .map(name => name.at(0).toUpperCase())
    .join("");
}

// Params:
// - books: Object - Array of book objects
// - series: Object - Array of series objects
// - movies: Object - Array of movie objects
// - anime: Object - Array of anime objects
// - youtubeChannels: Object - Array of Youtube channel objects
export function computeMediaConsumption(
  books,
  series,
  movies,
  anime,
  youtubeChannels
) {
  const booksConsumption = books.reduce(
    (acc, value) => {
      if (value.status === "wanted") acc.wanted += 1;
      else acc.consumed += 1;
      return acc;
    },
    {
      type: "Books",
      consumed: 0,
      wanted: 0,
    }
  );

  const seriesConsumption = series.reduce(
    (acc, value) => {
      if (value.status === "wanted") acc.wanted += 1;
      else acc.consumed += 1;
      return acc;
    },
    {
      type: "Series",
      consumed: 0,
      wanted: 0,
    }
  );

  const moviesConsumption = movies.reduce(
    (acc, value) => {
      if (value.status === "wanted") acc.wanted += 1;
      else acc.consumed += 1;
      return acc;
    },
    {
      type: "Movies",
      consumed: 0,
      wanted: 0,
    }
  );

  const animeConsumption = anime.reduce(
    (acc, value) => {
      if (value.status === "wanted") acc.wanted += 1;
      else acc.consumed += 1;
      return acc;
    },
    {
      type: "Anime",
      consumed: 0,
      wanted: 0,
    }
  );

  const youtubeChannelsConsumption = youtubeChannels.reduce(
    (acc, value) => {
      if (value.status === "wanted") acc.wanted += 1;
      else acc.consumed += 1;
      return acc;
    },
    {
      type: "Youtube Channels",
      consumed: 0,
      wanted: 0,
    }
  );

  const data = [
    booksConsumption,
    seriesConsumption,
    moviesConsumption,
    animeConsumption,
    youtubeChannelsConsumption,
  ];

  const max = Math.max(
    books.length,
    series.length,
    movies.length,
    anime.length,
    youtubeChannels.length
  );

  return { data, max };
}

// Params:
// - booksCount: Number - The number of books
// - seriesCount: Number - The number of series
// - moviesCount: Number - The number of movies
// - animeCount: Number - The number of anime
// - youtubeChannelsCount: Number - The number of Youtube channels
export function computeContentDistribution({
  books: booksCount,
  series: seriesCount,
  movies: moviesCount,
  anime: animeCount,
  youtubeChannels: youtubeChannelsCount,
}) {
  return [
    { type: "Books", value: booksCount, color: dashboardColors.books.value },
    { type: "Series", value: seriesCount, color: dashboardColors.series.value },
    { type: "Movies", value: moviesCount, color: dashboardColors.movies.value },
    { type: "Anime", value: animeCount, color: dashboardColors.anime.value },
    {
      type: "Youtube Channels",
      value: youtubeChannelsCount,
      color: dashboardColors.youtubeChannels.value,
    },
  ].filter(item => item.value > 0);
}

// Params:
// books: Object - Array of book objects
export function computeBooksAndPagesReadOverTheYears(books) {
  return books
    .filter(book => book.status !== "wanted" && book.finishDate)
    .reduce((acc, value) => {
      const year = format(new Date(value.finishDate), "yyyy");
      // Check if the year has already an entry in the array
      const item = acc.find(item => item.year === year);
      if (item) {
        item.books += 1;
        item.pages += value.numPages;
      } else acc.push({ year, books: 1, pages: value.numPages });

      return acc;
    }, [])
    .sort((a, b) => a.year - b.year);
}

// Params:
// books: Object - Array of book objects
export function computeMostReadAuthor(books) {
  // Using Object.entries to convert each author object to an array of key-value pairs
  // This transformation allows for sorting and filtering operations to be performed effectively
  return (
    Object.entries(
      // Create an object of authors with their respective counts
      books
        .filter(book => book.status !== "wanted")
        .reduce((acc, value) => {
          const author = value.author.trim();
          acc[author] = acc[author] + 1 || 1;
          return acc;
        }, {})
    )
      // Sort the entries based on the count in descending order
      .sort((a, b) => b[1] - a[1])
      // Filter the entries to include only those with the highest count
      .filter((item, _, arr) => item[1] === arr[0][1])
  );
}

// Params:
// books: Object - Array of book objects
export function computeLongestSeries(books) {
  // Using Object.entries to convert each series object to an array of key-value pairs
  // This transformation allows for sorting and filtering operations to be performed effectively
  return (
    Object.entries(
      // Create an object of series with their respective counts
      books
        .filter(book => book.status !== "wanted" && book.series)
        .reduce((acc, value) => {
          const series = value.series.trim();
          acc[series] = acc[series] + 1 || 1;
          return acc;
        }, {})
    )
      // Sort the entries based on the count in descending order
      .sort((a, b) => b[1] - a[1])
      // Filter the entries to include only those with the highest count
      .filter((item, _, arr) => item[1] === arr[0][1])
  );
}

// Params:
// books: Object - Array of book objects
export function computeFastestSlowestRead(books) {
  const readInDates = books
    .filter(book => book.finishDate && book.startDate)
    .map(book => {
      return {
        id: book.id,
        title: book.title,
        readIn:
          differenceInDays(
            new Date(book.finishDate.split("T")[0]),
            new Date(book.startDate.split("T")[0])
          ) + 1,
      };
    });
  const fastestRead = [...readInDates]
    .sort((a, b) => a.readIn - b.readIn)
    // Filter the entries to include only those with the lowest count for the read duration
    .filter((item, _, arr) => item.readIn === arr[0].readIn);

  const slowestRead = [...readInDates]
    .sort((a, b) => b.readIn - a.readIn)
    // Filter the entries to include only those with the highest count for the read duration
    .filter((item, _, arr) => item.readIn === arr[0].readIn);

  return { fastestRead, slowestRead };
}

// Params:
// books: Object - Array of series objects
export function computeTotalSeasons(series) {
  return series.reduce(
    (acc, value) => (value.status !== "wanted" ? acc + value.numSeasons : acc),
    0
  );
}

// Params:
// books: Object - Array of series objects
export function computeTotalEpisodesSeries(series) {
  return series.reduce(
    (acc, value) => (value.status !== "wanted" ? acc + value.numEpisodes : acc),
    0
  );
}

// Params:
// books: Object - Array of anime objects
export function computeTotalEpisodesAnime(anime) {
  return anime.reduce(
    (acc, value) => (value.status !== "wanted" ? acc + value.numEpisodes : acc),
    0
  );
}

// Params:
// books: Object - Array of movies objects
export function computeTotalWatchTime(movies) {
  const totalMinutes = movies.reduce(
    (acc, value) => (value.status !== "wanted" ? acc + value.duration : acc),
    0
  );

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);

  const daysString = days === 1 ? "day" : "days";
  const hoursString = hours === 1 ? "hour" : "hours";
  const value = `${days > 0 ? `${days} ${daysString}` : ""} ${
    hours > 0 ? `${hours} ${hoursString}` : ""
  }`;
  return value.trim();
}

// Params:
// - numPages: Number - The number of pages in the book to be checked
// - booksSameYear: Object - An array of book objects read in the same year as the book to be checked
export function checkIfLongestAndShortestBook(numPages, booksSameYear = []) {
  const isLongestBook = !booksSameYear.some(item => item.numPages > numPages);

  const isShortestBook = !booksSameYear.some(item => item.numPages < numPages);

  return { isLongestBook, isShortestBook };
}

// Params:
// - string: String - The input string to be capitalized
export function capitalizeFirstWord(string) {
  if (string === "") return "";
  return string.at(0).toUpperCase() + string.slice(1);
}

// Params:
// - obj: Object - Containing the extra info. The object has the following structure: {1comment: someText, 2comment: someText, 3altText: someText, 3link: someLink}
export function convertExtraInfoObjectToArray(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (key.includes("comment")) acc.push({ text: value, link: `` });
    else if (key.includes("link"))
      acc.push({
        // Extract the corresponding alt text from the object and use it as the text for the link
        text: obj[`${parseInt(key)}altText`],
        link: value,
      });
    return acc;
  }, []);
}

// Params:
// array: Object - Array of extra info objects
export function convertExtraInfoFromDatabase(array) {
  return array.reduce((acc, value) => {
    if (!value.link)
      acc.push({ type: "comment", valid: true, text: value.text });
    else
      acc.push({
        type: "link",
        valid: true,
        link: value.link,
        text: value.text,
      });

    return acc;
  }, []);
}

// Params:
// - str: String - The input string to be validated
export function isHttpValid(str) {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

// Params:
// - email: String - The input email to be validated
export function isValidEmail(email) {
  var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email.trim()) === false) {
    return false;
  }

  return true;
}

// Params:
// - date: Date - The input date object to be converted
export function convertDateToISO(date) {
  if (!date) return null;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  const miliSeconds = new Date().getMilliseconds();

  return new Date(
    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${miliSeconds}`
  ).toISOString();
}
