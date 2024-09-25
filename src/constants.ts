import path from 'path';

export const COLON = ':';
export const NEWLINE = '\n';
export const SPACE = ' ';

export const FILE_EXTENSION_XLS = '.xls';
export const FILE_EXTENSION_XLSX = '.xlsx';

export const OUTPUT_PATH = path.join('.');

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

export const OUR_AIRPORTS_URL =
  'https://davidmegginson.github.io/ourairports-data/airports.csv';

export const RAW_SCHEDULES_CSV_HEADER =
  'ID,Departure ID,Departure Code,Arrival ID,Arrival Code,Callsign,Flight Number,Fleets,Altitude,CI,Route,Departure Time,Arrival Time,Flight Length,Flight Distance,Start date,End date,Remarks,Type,Tag,Departure Stand Group,Arrival Stand Group,PAX LF,Luggage LF,Cargo (Weight) LF,Cargo (Volume) LF,Containers,Flightrules,Flighttype,Contpct,Resvrule,Taxifuel,Minfob,Minfod,Melfuel,atcfuel,wxxfuel,addedfuel,tankering,Minfob units,Minfod units,Melfuel units,Atc units,Wxx units,Addedfuel units,Tankering units,Addedfuel label,Delete\n';

export const FLEET_STRING =
  '7631, 7632, 7633, 7634, 7716, 7717, 7635, 7642, 7636, 7637, 7640, 7638, 7641, 7639, 7718, 7719, 7643, 7644, 7645, 7646, 7647, 7648, 7649, 7652, 7650, 7651, 7653, 7654, 7655, 7656, 7657, 7658, 10063';
