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
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
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
              <TableCell align="right">This Month</TableCell>
              <TableCell align="right">YTD</TableCell>
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
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
}