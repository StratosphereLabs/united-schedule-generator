import fs from 'fs';
import {
  COLON,
  COMMA,
  JV_SCHEDULES_PATH,
  NARROWBODY_SCHEDULES_PATH,
  NEWLINE,
  RAW_SCHEDULES_CSV_HEADER,
  RAW_SCHEDULES_PATH,
  SPACE,
  UAX_SCHEDULES_PATH,
  WIDEBODY_SCHEDULES_PATH,
} from './constants';
import { getMonthTimestamps, readCSVFile } from './utils';
import type { WriteCSVOptions } from './types';

export const writeScheduleRows = ({
  rows,
  file,
  getRowData,
  isRowValid,
}: WriteCSVOptions<string[]>): void => {
  const [month, year] = rows[0][0].split(COLON)[1].trim().split(SPACE);
  const [begin, end] = getMonthTimestamps(month, year);
  for (const [index, row] of rows.entries()) {
    if (isRowValid === undefined || isRowValid(row)) {
      file.write([...getRowData(row, index), begin, end].join(COMMA) + NEWLINE);
    }
  }
};

export const createRawSchedules = (): void => {
  const csvFile = fs.createWriteStream(RAW_SCHEDULES_PATH);

  csvFile.write(RAW_SCHEDULES_CSV_HEADER);

  writeScheduleRows({
    rows: readCSVFile(WIDEBODY_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[0] !== 'Sales region' && row[1].length === 3 && row[2].length === 3,
    getRowData: row => [
      row[1],
      row[2],
      'UA',
      row[3].split(SPACE)[1],
      row[6],
      row[7],
      row[4],
      row[5],
    ],
  });

  writeScheduleRows({
    rows: readCSVFile(NARROWBODY_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[2] !== 'Flight #' && row[0].length === 3 && row[1].length === 3,
    getRowData: row => [
      row[0],
      row[1],
      'UA',
      row[2],
      row[5],
      row[6],
      row[3],
      row[4],
    ],
  });

  writeScheduleRows({
    rows: readCSVFile(UAX_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[2] !== 'Flight #' && row[0].length === 3 && row[1].length === 3,
    getRowData: row => [
      row[0],
      row[1],
      'UA',
      row[2],
      row[5],
      row[6],
      row[3],
      row[4],
    ],
  });

  writeScheduleRows({
    rows: readCSVFile(JV_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[0] !== 'Carrier' && row[1].length === 3 && row[2].length === 3,
    getRowData: row => [
      row[1],
      row[2],
      row[0],
      row[3].slice(2, row[3].length),
      row[6],
      row[7],
      row[4],
      row[5],
    ],
  });

  csvFile.close();
};
