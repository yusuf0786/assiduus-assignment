import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Box, Stack, Typography } from '@mui/material';

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Sales', "1,194.58", "11,418.29"),
  createData('Advertising', "6,879.02", "9,271.36"),
  createData('Inventory', "4,692.26", "9,768.09"),
  createData('Entertainment', "0.00", "0.00"),
  createData('Product', "4,652.10", "2,529.90"),
];

export function AccountWatchlistTable() {
  return (
    <>
    <Stack className="card-header" direction="row" justifyContent="space-between" flexWrap="wrap" sx={{boxShadow:1, padding:"1rem"}}>
        <Typography variant="h6" component="h3" fontWeight={700}>Account watchlist</Typography>
    </Stack>
    <Box className="card-body">
      <TableContainer component={Paper} sx={{ boxShadow:0, background: "none", }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell>This Month</TableCell>
              <TableCell>YTD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
}