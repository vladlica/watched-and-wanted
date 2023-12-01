export function getInitials(fullName) {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((name) => name.at(0).toUpperCase())
    .join("");
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
