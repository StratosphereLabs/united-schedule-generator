import type { WriteStream } from 'fs';

export interface WriteCSVOptions<RowData> {
  rows: RowData[];
  file: WriteStream;
  getRowData: (
    row: RowData,
    startDate: string,
    endDate: string,
  ) => string[] | null;
  isRowValid?: (row: RowData) => boolean;
}
