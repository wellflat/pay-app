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
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="statement table">
        <TableHead>
          <TableRow>
            <TableCell>支払先</TableCell>
            <TableCell>金額</TableCell>
            <TableCell>支払日</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {statements.map((s, i) => (
          <TableRow key={s.id}>
            <TableCell>{s.store}</TableCell>
            <TableCell>{s.amount}</TableCell>
            <TableCell>{s.payment_date}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default StatementTable;