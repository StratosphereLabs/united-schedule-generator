import { stringify } from 'csv-stringify/sync';
import fs from 'fs';
import {
  JV_SCHEDULES_PATH,
  NARROWBODY_SCHEDULES_PATH,
  RAW_SCHEDULES_CSV_HEADER,
  RAW_SCHEDULES_PATH,
  UAX_SCHEDULES_PATH,
  WIDEBODY_SCHEDULES_PATH,
} from './constants';
import { readCSVFile } from './utils';
import type { WriteCSVOptions } from './types';

export const writeScheduleRows = ({
  rows,
  file,
  getRowData,
  isRowValid,
}: WriteCSVOptions<string[]>): void => {
  const scheduleRows = [];
  for (const [index, row] of rows.entries()) {
    if (isRowValid === undefined || isRowValid(row)) {
      const rowData = getRowData(row, index);
      scheduleRows.push(rowData);
    }
  }
  file.write(stringify(scheduleRows));
};

export const createRawSchedules = async (
  airportsData: Record<string, Record<string, string>>,
): Promise<void> => {
  const csvFile = fs.createWriteStream(RAW_SCHEDULES_PATH);

  csvFile.write(RAW_SCHEDULES_CSV_HEADER);

  writeScheduleRows({
    rows: readCSVFile(WIDEBODY_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[0] !== 'Sales region' && row[1].length === 3 && row[2].length === 3,
    getRowData: row => [
      '',
      '',
      airportsData[row[1]].ident,
      '',
      airportsData[row[2]].ident,
      `UAL${row[3].split(' ')[1]}`,
      row[3].split(' ')[1],
    ],
  });

  writeScheduleRows({
    rows: readCSVFile(NARROWBODY_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[2] !== 'Flight #' && row[0].length === 3 && row[1].length === 3,
    getRowData: row => [
      '',
      '',
      airportsData[row[0]].ident,
      '',
      airportsData[row[1]].ident,
      `UAL${row[2]}`,
      row[2],
    ],
  });

  writeScheduleRows({
    rows: readCSVFile(UAX_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[2] !== 'Flight #' && row[0].length === 3 && row[1].length === 3,
    getRowData: row => [
      '',
      '',
      airportsData[row[0]].ident,
      '',
      airportsData[row[1]].ident,
      `UAL${row[2]}`,
      row[2],
    ],
  });

  writeScheduleRows({
    rows: readCSVFile(JV_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[0] !== 'Carrier' && row[1].length === 3 && row[2].length === 3,
    getRowData: row => [
      '',
      '',
      airportsData[row[1]].ident,
      '',
      airportsData[row[2]].ident,
      `UAL${row[3].slice(2)}`,
      row[3].slice(2),
    ],
  });

  csvFile.close();
};
