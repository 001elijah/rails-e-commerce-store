import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import s from "./OrdersTable.module.scss"

export default function OrdersTable({ rows }) {
  return (
    <div className={s.tableWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User id</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.created_at}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.user_id}
                </TableCell>
                <TableCell align="right">${row.amount}</TableCell>
                <TableCell align="right">{new Date(row.created_at).toLocaleDateString("en-US")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

OrdersTable.propTypes = {
  rows: PropTypes.array.isRequired,
};
