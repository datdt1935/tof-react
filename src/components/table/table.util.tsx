import React from 'react';
import { Typography } from 'components/material-ui';
import TableControlEditable from './control/input.component';
import TableControlAutocomplete from './control/select.component';
import TableControlIconButton from './control/icon-button.component';

import { EXPANDER_CELL_WIDTH, HeaderTableProps } from './table.constant';

const getReadonlyColumn = ({
  columnName,
  columnHeader,
  columnSetting,
}: HeaderTableProps) => ({
  Header: columnHeader,
  accessor: columnName,
  Cell: ({ value }: any) => (
    <Typography noWrap variant="subtitle2">
      {value}
    </Typography>
  ),
});

const getExpandColumn = (onAddRow: Function) => ({
  id: 'expander',
  Header: '',
  Cell: ({ row }: any) =>
    row.canExpand ? (
      <>
        <span
          {...row.getToggleRowExpandedProps({
            style: {
              paddingLeft: `${row.depth * 2}rem`,
              marginRight: 10,
            },
          })}
        >
          {row.isExpanded ? (
            <i className="fal fa-chevron-down"></i>
          ) : (
            <i className="fal fa-chevron-right"></i>
          )}
        </span>
        <span
          style={{
            cursor: 'pointer',
          }}
          onClick={() => onAddRow(row.index, row.original)}
        >
          <i className="fal fa-plus"></i>
        </span>
      </>
    ) : null,
  width: EXPANDER_CELL_WIDTH,
});

const getTextColumn = ({
  columnName,
  columnHeader,
  columnSetting,
}: HeaderTableProps) => {
  return {
    Header: columnHeader,
    accessor: columnName,
    Cell: TableControlEditable,
    ...columnSetting,
  };
};

const getSelectPickerColumn = ({
  columnName,
  columnHeader,
  columnSetting,
}: HeaderTableProps) => {
  return {
    Header: columnHeader,
    accessor: columnName,
    Cell: TableControlAutocomplete,
    ...columnSetting,
  };
};

const getActionColumn = ({
  columnName,
  columnHeader,
  columnSetting,
  actions,
}: HeaderTableProps) => {
  return {
    Header: columnHeader,
    accessor: columnName,
    Cell: (props: any) => (
      <TableControlIconButton
        {...props}
        actions={actions || []}
      ></TableControlIconButton>
    ),
    ...columnSetting,
  };
};

export {
  getActionColumn,
  getExpandColumn,
  getReadonlyColumn,
  getSelectPickerColumn,
  getTextColumn,
};
