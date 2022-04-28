import { IDataColumns, IDataRow } from 'src/interfaces/IDataTable';

export class DataRowResponse<T> {
  data: Array<T>;
  columns: Array<IDataColumns>;
  totalRecords: number;
  options: any;
}
