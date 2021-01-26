import _ from "lodash";

const countChars = (xs, ch) => xs.split("").filter((x) => x === ch).length;

const dequote = (xs) => {
  if (/^".*"$/.test(xs)) {
    xs = xs.slice(1, xs.length - 1);
  }
  return xs.replace(/""/g, '"');
};

export const normalizeValues = (values) => {
  const result = [];
  let merging = false;
  let k = 0;
  values.forEach((value) => {
    if (!merging) {
      result[k++] = value;
    } else {
      result[k - 1] += "," + value;
    }
    if (countChars(value, '"') % 2 === 1) {
      merging = !merging;
    }
  });
  return result.map(dequote);
};

const getRecord = (header, record) => {
  let values = record.trim().split(",");

  return _.zipObject(header, normalizeValues(values));
};

/**
 * Converts a CSV string into a JSON string
 * @param {String} csv - input CSV
 */
export default function csv2json(csv) {
  if (!csv || typeof csv !== "string") {
    return "";
  }

  const lines = csv.trim().split("\n");

  if (lines.length < 2) {
    return "";
  }

  const header = lines[0].trim().split(",");

  if (lines.length === 2) {
    const obj = getRecord(header, lines[1]);

    return JSON.stringify(obj);
  }

  // lines.length > 2

  const obj = [];
  lines.slice(1).forEach((line) => {
    const record = getRecord(header, line);
    obj.push(record);
  });

  return JSON.stringify(obj);
}

export const isValidCsv = (csv) => true;
