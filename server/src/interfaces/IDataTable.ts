export interface IDataRow {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
  subRows?: Array<IDataRow>;
}

export interface IDataColumns {
  columnHeader: string;
  columnName: string;
  columnType: string;
  columnSetting: IColumnSetting;
}
export interface IColumnSetting {
  readonly: boolean;
  hidden: boolean;
}

export interface IDataRowResponse {
  data: Array<any>;
  columns: Array<IDataColumns>;
  totalRecords: number;
}

export interface IOptionDropdow {
  textValue: string;
  idValue: number;
}
