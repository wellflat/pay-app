import React from 'react';
import { JSX } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import { Statement } from '../api/statement/route';

type Props = {
  statements: Statement[];
}

const StatementTable = ({ statements }: Props): JSX.Element => {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="statement table">
        <TableHead>
          <TableRow>
            <TableCell>金額</TableCell>
            <TableCell>支払日</TableCell>
            <TableCell>支払先</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {statements.map((s) => (
          <TableRow key={s.id}>
            <TableCell>{formatCurrency(s.amount)}</TableCell>
            <TableCell>{s.payment_date}</TableCell>
            <TableCell>{s.store}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default StatementTable;