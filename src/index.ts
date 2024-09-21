import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import * as XLSX from 'xlsx';
import {
  FILE_EXTENSION_XLS,
  FILE_EXTENSION_XLSX,
  JV_SCHEDULES_PATH,
  NARROWBODY_SCHEDULES_PATH,
  OUTPUT_PATH,
  UAX_SCHEDULES_PATH,
  WIDEBODY_SCHEDULES_PATH,
} from './constants';
import { createRawSchedules } from './createRawSchedules';
import { getCsvFromWorksheet } from './utils';

export const convertSchedules = (workbook: XLSX.WorkBook): void => {
  const widebodySheet = getCsvFromWorksheet(workbook.Sheets.Widebody);
  const narrowbodySheet = getCsvFromWorksheet(workbook.Sheets.Narrowbody);
  const UAXSheet = getCsvFromWorksheet(workbook.Sheets.UAX);
  const JVSheet = getCsvFromWorksheet(workbook.Sheets.JV);

  fs.writeFileSync(WIDEBODY_SCHEDULES_PATH, widebodySheet);
  fs.writeFileSync(NARROWBODY_SCHEDULES_PATH, narrowbodySheet);
  fs.writeFileSync(UAX_SCHEDULES_PATH, UAXSheet);
  fs.writeFileSync(JV_SCHEDULES_PATH, JVSheet);
};

export const cleanSchedules = (): void => {
  fs.unlinkSync(WIDEBODY_SCHEDULES_PATH);
  fs.unlinkSync(NARROWBODY_SCHEDULES_PATH);
  fs.unlinkSync(UAX_SCHEDULES_PATH);
  fs.unlinkSync(JV_SCHEDULES_PATH);
};

(async () => {
  const files = fs
    .readdirSync(OUTPUT_PATH)
    .filter(
      file =>
        path.extname(file).toLowerCase() === FILE_EXTENSION_XLS ||
        path.extname(file).toLowerCase() === FILE_EXTENSION_XLSX,
    );

  if (files.length === 0) {
    console.log(
      'No schedules files found. Please download the latest one from https://www.unitedcargo.com/en/us/book/schedules.html and place it in the "src" folder.',
    );
    return;
  }

  const result = await inquirer.prompt<{ file: string }>([
    {
      type: 'list',
      name: 'file',
      message: 'Select a United Airlines schedule file (.XLS)',
      choices: files,
    },
  ]);

  const data = fs.readFileSync(path.join(OUTPUT_PATH, result.file));
  const workbook = XLSX.read(data);
  convertSchedules(workbook);
  createRawSchedules();
  cleanSchedules();
})();
