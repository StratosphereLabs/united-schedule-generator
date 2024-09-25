import { stringify } from 'csv-stringify/sync';
import { endOfDay, format, parse, startOfDay } from 'date-fns';
import fs from 'fs';
import {
  COLON,
  FLEET_STRING,
  JV_SCHEDULES_PATH,
  NARROWBODY_SCHEDULES_PATH,
  RAW_SCHEDULES_CSV_HEADER,
  RAW_SCHEDULES_PATH,
  SPACE,
  TIMESTAMP_FORMAT,
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
  const scheduleRows = [];
  for (const row of rows.values()) {
    if (isRowValid === undefined || isRowValid(row)) {
      const rowData = getRowData(row, begin, end);
      if (rowData !== null) {
        scheduleRows.push(rowData);
      }
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
    getRowData: row => {
      try {
        const startDate = format(
          startOfDay(parse(row[4], 'dd-LLL-yy', new Date())),
          TIMESTAMP_FORMAT,
        );
        const endDate = format(
          endOfDay(parse(row[5], 'dd-LLL-yy', new Date())),
          TIMESTAMP_FORMAT,
        );
        return [
          '',
          '',
          airportsData[row[1]].ident,
          '',
          airportsData[row[2]].ident,
          `UAL${row[3].split(' ')[1]}`,
          `UA${row[3].split(' ')[1]}`,
          FLEET_STRING,
          '',
          'AUTO',
          '',
          row[6],
          row[7],
          '',
          '',
          startDate,
          endDate,
          '',
          'scheduled',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ];
      } catch (err) {
        console.error(err);
        return null;
      }
    },
  });

  writeScheduleRows({
    rows: readCSVFile(NARROWBODY_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[2] !== 'Flight #' && row[0].length === 3 && row[1].length === 3,
    getRowData: (row, startDate, endDate) => [
      '',
      '',
      airportsData[row[0]].ident,
      '',
      airportsData[row[1]].ident,
      `UAL${row[2].replace(new RegExp(',', 'g'), '')}`,
      `UA${row[2].replace(new RegExp(',', 'g'), '')}`,
      FLEET_STRING,
      '',
      'AUTO',
      '',
      row[3].length < 5 ? `0${row[3]}` : row[3],
      row[4].length < 5 ? `0${row[4]}` : row[4],
      '',
      '',
      startDate,
      endDate,
      '',
      'scheduled',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
  });

  writeScheduleRows({
    rows: readCSVFile(UAX_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[2] !== 'Flight #' && row[0].length === 3 && row[1].length === 3,
    getRowData: (row, startDate, endDate) => [
      '',
      '',
      airportsData[row[0]].ident,
      '',
      airportsData[row[1]].ident,
      `UAL${row[2].replace(new RegExp(',', 'g'), '')}`,
      `UA${row[2].replace(new RegExp(',', 'g'), '')}`,
      FLEET_STRING,
      '',
      'AUTO',
      '',
      row[3].length < 5 ? `0${row[3]}` : row[3],
      row[4].length < 5 ? `0${row[4]}` : row[4],
      '',
      '',
      startDate,
      endDate,
      '',
      'scheduled',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
  });

  writeScheduleRows({
    rows: readCSVFile(JV_SCHEDULES_PATH),
    file: csvFile,
    isRowValid: row =>
      row[0] !== 'Carrier' && row[1].length === 3 && row[2].length === 3,
    getRowData: (row, startDate, endDate) => [
      '',
      '',
      airportsData[row[1]].ident,
      '',
      airportsData[row[2]].ident,
      `UAL${row[3].slice(2)}`,
      `UA${row[3].slice(2)}`,
      FLEET_STRING,
      '',
      'AUTO',
      '',
      row[4].length < 5 ? `0${row[4]}` : row[4],
      row[5].length < 5 ? `0${row[5]}` : row[5],
      '',
      '',
      startDate,
      endDate,
      '',
      'scheduled',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
  });

  csvFile.close();
};
