import { useEffect, useRef, useState } from 'react';

import {
  getActionColumn,
  getExpandColumn,
  getReadonlyColumn,
  getSelectPickerColumn,
  getTextColumn,
} from './table.util';

import {
  ColumnDataType,
  CommonTableProps,
  EXPANDER_CELL_WIDTH,
} from './table.constant';

const useCommonTableHook = (props: CommonTableProps) => {
  const { onAddRow = () => {}, header, isExpand, readonlyTable } = props;
  const [columns, setColumns] = useState<any[]>([]);
  const [columnWidth, setColumnWidth] = useState<number>(0);

  const tableRef = useRef(null);

  useEffect(() => {
    let totalColumn = 0;
    let parentWidth = (tableRef.current as any)?.offsetWidth || 0;
    const columnDef: any[] = [];
    if (!header?.length) {
      setColumns(columnDef);
      return;
    }

    if (isExpand) {
      parentWidth = parentWidth - EXPANDER_CELL_WIDTH;
      columnDef.push(getExpandColumn(onAddRow));
    }

    for (const key in header) {
      if (Object.prototype.hasOwnProperty.call(header, key)) {
        const headerCell = header[key];
        if (headerCell.columnSetting?.hidden) continue;
        totalColumn++;
        if (headerCell.columnSetting?.readonly || readonlyTable) {
          columnDef.push(getReadonlyColumn(headerCell));
          continue;
        }

        switch (headerCell.columnType) {
          case ColumnDataType.TEXT:
            columnDef.push(getTextColumn(headerCell));
            break;
          case ColumnDataType.SELECT_PICKER:
            columnDef.push(getSelectPickerColumn(headerCell));
            break;
          case ColumnDataType.ACTION:
            columnDef.push(getActionColumn(headerCell));
            break;
          default:
            columnDef.push(getReadonlyColumn(headerCell));
            break;
        }
      }
    }
    if (parentWidth > 0) setColumnWidth(parentWidth / totalColumn);

    setColumns(columnDef);
    // eslint-disable-next-line
  }, [header, isExpand, readonlyTable]);
  return { columns, columnWidth, tableRef };
};

export default useCommonTableHook;
