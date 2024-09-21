import { parse as parseCSV } from 'csv-parse/sync';
import { endOfMonth, format, parse } from 'date-fns';
import fs from 'fs';
import * as XLSX from 'xlsx';
import { MONTH_FORMAT, TIMESTAMP_FORMAT } from './constants';

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
