const getHeader = (obj) => (obj ? Object.keys(obj).join(",") : "");

const quote = (value) => {
  if (typeof value === "object") {
    throw new Error("Nested JSON cannot be converted to csv");
  }

  if (typeof value !== "string" || value.search(/[\,|\"|\n]/) === -1) {
    return value;
  }

  return `"${value.replace(/\"/g, `""`)}"`;
};

const getBody = (obj, header) =>
  header
    .split(",")
    .map((key) => quote(obj[key]))
    .join(",");

/**
 * Converts a JSON string into a CSV string
 * @param {String} json - input JSON
 */
export default function json2csv(json) {
  if (!json || typeof json !== "string") {
    return "";
  }

  const parsedJson = JSON.parse(json);

  let header, body;

  if (Array.isArray(parsedJson)) {
    header = getHeader(parsedJson[0]);
    body = parsedJson.map((entity) => getBody(entity, header)).join("\n");
  } else {
    header = getHeader(parsedJson);
    body = getBody(parsedJson, header);
  }

  return `${header}\n${body}`.trim();
}
