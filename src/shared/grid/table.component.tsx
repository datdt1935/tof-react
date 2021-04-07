import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../material-ui';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#ECEFF3',
      color: '#6B778C',
    },
    body: {
      fontSize: 16,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#F8F8F8',
      },
      height: 48,
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function TableComponent(props: any) {
  const classes = useStyles();
  const { header, rows } = props;
  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        className={classes.table}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {header.map((_d: string, i: number) => (
              <StyledTableCell size="small" align="right" key={`header_${_d}`}>
                {_d}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, index: number) => (
            <StyledTableRow key={`row_${index}`}>
              {header.map((_d: string, i: number) => (
                <StyledTableCell size="small" align="right" key={`column_${i}`}>
                  {row[_d]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
