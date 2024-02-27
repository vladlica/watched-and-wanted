import { differenceInDays, format } from "date-fns";
import { dashboardColors } from "./constants";

export function getInitials(fullName) {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((name) => name.at(0).toUpperCase())
    .join("");
}

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

export function computeContentDistribution({
  books,
  series,
  movies,
  anime,
  youtubeChannels,
}) {
  return [
    { type: "Books", value: books, color: dashboardColors.books.value },
    { type: "Series", value: series, color: dashboardColors.series.value },
    { type: "Movies", value: movies, color: dashboardColors.movies.value },
    { type: "Anime", value: anime, color: dashboardColors.anime.value },
    {
      type: "Youtube Channels",
      value: youtubeChannels,
      color: dashboardColors.youtubeChannels.value,
    },
  ].filter((item) => item.value > 0);
}

export function computeBooksAndPagesReadOverTheYears(books) {
  return books
    .filter((book) => book.status !== "wanted" && book.finishDate)
    .reduce((acc, value) => {
      const year = format(new Date(value.finishDate), "yyyy");
      const item = acc.find((item) => item.year === year);
      if (item) {
        item.books += 1;
        item.pages += value.numPages;
      } else acc.push({ year, books: 1, pages: value.numPages });

      return acc;
    }, [])
    .sort((a, b) => a.year - b.year);
}

export function computeMostReadAuthor(books) {
  return Object.entries(
    books
      .filter((book) => book.status !== "wanted")
      .reduce((acc, value) => {
        const author = value.author.trim();
        acc[author] = acc[author] + 1 || 1;
        return acc;
      }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .filter((item, _, arr) => item[1] === arr[0][1]);
}

export function computeLongestSeries(books) {
  return Object.entries(
    books
      .filter((book) => book.status !== "wanted" && book.series)
      .reduce((acc, value) => {
        const series = value.series.trim();
        acc[series] = acc[series] + 1 || 1;
        return acc;
      }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .filter((item, _, arr) => item[1] === arr[0][1]);
}

export function computeFastestSlowestRead(books) {
  const readInDates = books
    .filter((book) => book.finishDate && book.startDate)
    .map((book) => {
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
  const fastestRead = readInDates
    .sort((a, b) => a.readIn - b.readIn)
    .filter((item, _, arr) => item.readIn === arr[0].readIn);
  const slowestRead = readInDates
    .sort((a, b) => b.readIn - a.readIn)
    .filter((item, _, arr) => item.readIn === arr[0].readIn);

  return { fastestRead, slowestRead };
}

export function computeTotalSeasons(series) {
  return series.reduce(
    (acc, value) => (value.status !== "wanted" ? acc + value.numSeasons : acc),
    0
  );
}

export function computeTotalEpisodesSeries(series) {
  return series.reduce(
    (acc, value) => (value.status !== "wanted" ? acc + value.numEpisodes : acc),
    0
  );
}

export function computeTotalEpisodesAnime(anime) {
  return anime.reduce(
    (acc, value) => (value.status !== "wanted" ? acc + value.numEpisodes : acc),
    0
  );
}

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
  return value;
}

export function checkIfLongestAndShortestBook(numPages, booksSameYear = []) {
  const isLongestBook = !booksSameYear.some(
    (item) => item.status === "read" && item.numPages > numPages
  );

  const isShortestBook = !booksSameYear.some(
    (item) => item.status === "read" && item.numPages < numPages
  );

  return { isLongestBook, isShortestBook };
}

export function capitalizeFirstWord(string) {
  if (string === "") return "";
  return string.at(0).toUpperCase() + string.slice(1);
}

export function convertExtraInfoObjectToArray(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (key.includes("comment")) acc.push({ text: value, link: `` });
    else if (key.includes("link"))
      acc.push({
        text: obj[`${parseInt(key)}altText`],
        link: value,
      });
    return acc;
  }, []);
}

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

export function isHttpValid(str) {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

export function isValidEmail(email) {
  var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email.trim()) === false) {
    return false;
  }

  return true;
}

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
