import React, { useState } from 'react';
import { useTable, useExpanded } from 'react-table';

import useCommonTableHook from './table.hook';

import styles from './table.module.scss';

import { CommonTableProps, EXPANDER_CELL_WIDTH } from './table.constant';
import { isDarkThemeMode } from 'utils/localstorage';
import classNames from 'classnames';
import { useLayoutStyle } from 'utils/theme.util';
const defaultPropGetter = () => ({});
var clickTiming: any;

function Table({
  columns,
  data,
  getCellProps = defaultPropGetter,
  onDataChanged = defaultPropGetter,
  getRowProps = defaultPropGetter,
  isDarkMode,
  style,
}: any) {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      width: window.innerWidth / columns.length, // width is used for both the flex-basis and flex-grow
    }),
    [columns.length]
  );
  const tableOption = {
    columns,
    data,
    defaultColumn,

    onDataChanged,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    tableOption,
    useExpanded // Use the useExpanded plugin hook,
  );

  return (
    <table
      {...getTableProps()}
      className={classNames(styles.table, {
        [styles.dark]: isDarkMode,
      })}
      style={style}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                {...column.getHeaderProps([
                  {
                    className: column.className,
                    style: column.style,
                  },
                  getCellProps(column),
                ])}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps(getRowProps(row))}>
              {row.cells.map((cell: any) => {
                return (
                  <td
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                        style: cell.column.style,
                      },
                      getCellProps(cell.column),
                    ])}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const TableComponent: React.FC<CommonTableProps> = (props) => {
  const {
    data,
    rowHeight,
    disableSelectedRow,
    onDataCellChanged = defaultPropGetter,
    onRowSelected = defaultPropGetter,
    onRowDblClick = defaultPropGetter,
  } = props;
  const { columns, tableRef, columnWidth } = useCommonTableHook(props);

  const [rowSelected, setRowSelected] = useState<any>(null);
  const styleDarkMode = useLayoutStyle();

  const onDataChanged = (rowIndex: number, columnName: string, value: any) => {
    onDataCellChanged({ rowIndex, columnName, value });
  };
  const isDarkMode = isDarkThemeMode();

  return (
    <div
      ref={tableRef}
      className={classNames(styles.container, 'mini-scrollbar')}
    >
      <Table
        columns={columns}
        data={data}
        getRowProps={(row: any) => ({
<<<<<<< Updated upstream:src/components/table/table.component.tsx
          className: classNames('', {
            [styleDarkMode.rowSelected]:
              !disableSelectedRow && rowSelected === row.id,
          }),
=======
          style: {
            backgroundColor:
              !disableSelectedRow && rowSelected === row.id
                ? isDarkMode
                  ? '#eceff330'
                  : '#cbe6ff'
                : '',
          },
>>>>>>> Stashed changes:src/shared/table/table.component.tsx
          onClick: () => {
            setRowSelected(row.id);
            onRowSelected(row.original);
            if (clickTiming) {
              clearTimeout(clickTiming);
              clickTiming = null;
              onRowDblClick(row);
              return;
            }

            clickTiming = setTimeout(() => {
              clickTiming = null;
            }, 200);
          },
          onDoubleClick: () => {
            onRowDblClick(row);
          },
        })}
        getCellProps={(cellInfo: any) => ({
          width: cellInfo.id === 'expander' ? EXPANDER_CELL_WIDTH : columnWidth,
          style: {
            height: rowHeight,
            width:
              cellInfo.id === 'expander' ? EXPANDER_CELL_WIDTH : columnWidth,
            maxWidth:
              cellInfo.id === 'expander' ? EXPANDER_CELL_WIDTH : columnWidth,
            minWidth:
              cellInfo.id === 'expander' ? EXPANDER_CELL_WIDTH : columnWidth,
          },
        })}
        onDataChanged={onDataChanged}
        isDarkMode={isDarkMode}
        style={{ height: (tableRef.current as any)?.innerHeight }}
      />
    </div>
  );
};

TableComponent.defaultProps = {
  onDataCellChanged: defaultPropGetter,
  rowOnDblClick: defaultPropGetter,
  rowOnClick: defaultPropGetter,
  rowHeight: 40,
};
export default TableComponent;
