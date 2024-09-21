import type { WriteStream } from 'fs';

export interface WriteCSVOptions<RowData> {
  rows: RowData[];
  file: WriteStream;
  getRowData: (row: RowData, index: number) => string[];
  isRowValid?: (row: RowData) => boolean;
}
