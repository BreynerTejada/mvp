import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  tableContainerSx,
  headerCellSx,
  bodyCellSx,
  rowSx,
  emptyStateSx,
} from './DataTable.styles';

export interface Column<T> {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  width?: string | number;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => React.Key;
  emptyMessage?: string;
}

function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No hay datos para mostrar.',
}: DataTableProps<T>) {
  return (
    <Box sx={tableContainerSx}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align || 'left'}
                  sx={headerCellSx}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={rowKey(row)} sx={rowSx}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.align || 'left'}
                    sx={bodyCellSx}
                  >
                    {col.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length === 0 && (
        <Typography sx={emptyStateSx}>{emptyMessage}</Typography>
      )}
    </Box>
  );
}

export default DataTable;
