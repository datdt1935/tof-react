export enum ColumnDataType {
  TEXT = 'input',
  SELECT_PICKER = 'combobox',
  ACTION = 'action',
  EXPANDER = 'expand',
}

export interface ColumnSettingProps {
  readonly?: boolean;
  hidden?: boolean;
  orderBy?: boolean;
  width?: number | string;
}

export interface CellActionProps {
  faIcon: string;
  style?: React.CSSProperties;
  onClick: Function;
}

export interface HeaderTableProps {
  columnName: string;
  columnHeader: string;
  columnType: ColumnDataType;
  options?: string;
  columnSetting?: ColumnSettingProps;

  actions?: CellActionProps[];
}

export type CommonTableProps = {
  data: any[];
  isExpand?: boolean;
  readonlyTable?: boolean;
  header?: HeaderTableProps[];
  disableSelectedRow?: boolean;

  additionalColumns?: any[];

  rowHeight?: number;
  rowOnClick?: Function;
  rowOnDblClick?: Function;
  onRowSelected?: Function;
  onRowDblClick?: Function;
  onAddRow?: Function;

  onDataCellChanged?: Function;
};

export const EXPANDER_CELL_WIDTH = 100;
