import type { WriteStream } from 'fs';

export interface WriteCSVOptions<RowData> {
  rows: RowData[];
  file: WriteStream;
  getRowData: (row: RowData) => string[] | null;
  isRowValid?: (row: RowData) => boolean;
}
