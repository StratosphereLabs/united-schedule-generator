import path from 'path';

export const COLON = ':';
export const COMMA = ',';
export const NEWLINE = '\n';
export const SPACE = ' ';

export const FILE_EXTENSION_XLS = '.xls';
export const FILE_EXTENSION_XLSX = '.xlsx';

export const OUTPUT_PATH = path.join('.', 'src');

export const RAW_SCHEDULES_PATH = path.join(
  OUTPUT_PATH,
  'raw_scheduled_flights.csv',
);
export const NARROWBODY_SCHEDULES_PATH = path.join(
  OUTPUT_PATH,
  'widebody_schedules.csv',
);
export const WIDEBODY_SCHEDULES_PATH = path.join(
  OUTPUT_PATH,
  'narrowbody_schedules.csv',
);
export const UAX_SCHEDULES_PATH = path.join(OUTPUT_PATH, 'uax_schedules.csv');
export const JV_SCHEDULES_PATH = path.join(OUTPUT_PATH, 'jv_schedules.csv');

export const MONTH_FORMAT = 'MMMM y';
export const TIMESTAMP_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const RAW_SCHEDULES_CSV_HEADER =
  'dep_iata,arr_iata,airline_iata,flight_number,aircraft_codes,frequency,dep_time,arr_time,valid_from,valid_to\n';
