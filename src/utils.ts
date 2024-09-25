import axios from 'axios';
import { parse as parseCSV } from 'csv-parse/sync';
import { endOfMonth, format, parse } from 'date-fns';
import fs from 'fs';
import * as XLSX from 'xlsx';
import { MONTH_FORMAT, OUR_AIRPORTS_URL, TIMESTAMP_FORMAT } from './constants';

export const readCSVFile = (path: string): string[][] => {
  const file = fs.readFileSync(path);
  return parseCSV(file) as string[][];
};

export const getCsvFromWorksheet = (worksheet: XLSX.WorkSheet): string =>
  XLSX.utils.sheet_to_csv(worksheet, {
    blankrows: false,
  });

export const getMonthTimestamps = (
  month: string,
  year: string,
): [string, string] => {
  const startDate = parse(`${month} ${year}`, MONTH_FORMAT, new Date());
  const endDate = endOfMonth(startDate);
  return [
    format(startDate, TIMESTAMP_FORMAT),
    format(endDate, TIMESTAMP_FORMAT),
  ];
};

export const mergeKeysAndValues = <T extends Record<string, string>>(
  keys: string[],
  values: string[],
) =>
  keys.reduce<T>(
    (acc, key, index) => ({
      ...acc,
      [key]: values[index],
    }),
    {} as T,
  );

export const fetchGroupedAirportsData = async (): Promise<Record<
  string,
  Record<string, string>
> | null> => {
  try {
    const response = await axios.get(OUR_AIRPORTS_URL);
    const airportsCsv = response.data;
    const airportRows = parseCSV(airportsCsv) as string[][];
    const headers = [...airportRows[0]];
    return airportRows
      .slice(1)
      .reduce<Record<string, Record<string, string>>>((acc, row) => {
        if (row[13].length === 0 || row[11] !== 'yes') {
          return acc;
        }
        return { ...acc, [row[13]]: mergeKeysAndValues(headers, row) };
      }, {});
  } catch (err) {
    console.log(err);
    return null;
  }
};
