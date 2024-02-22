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
