import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import s from "./OrdersTable.module.scss";
import CustomAccentButton from "../CustomAccentButton/CustomAccentButton";
import { getOrderItems } from "../../services/backendAPI";
import { useState } from "react";

const OrderRow = ({ row, throwErrorPopup }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const handleLoadMore = async (id) => {
    try {
      if (!orderDetails.length) {
        const { status, items } = await getOrderItems(id)
        if (status === 404) {
          throw new Error(`Sorry, no details on order #${id}`)
        }
        setOrderDetails(items);
      }
      setShowDetails(!showDetails);
    } catch (error) {
      throwErrorPopup(error.message);
    }
  }
  return (
    <>
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 }, bgcolor: showDetails && "#c0cfde" }}
      >
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.react_user_id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.first_name}
        </TableCell>
        <TableCell align="right">${row.amount}</TableCell>
        <TableCell align="right">
          {new Date(row.created_at).toLocaleDateString("en-US")}
        </TableCell>
        <TableCell align="right">
          <CustomAccentButton type="button" title={showDetails ? "less" : "more"} onClick={() => handleLoadMore(row.id)} />
        </TableCell>
      </TableRow>
      {
        showDetails &&
        orderDetails
          .map(item =>
            <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, bgcolor: "#dfeaf5" }}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">
                ${item.price}
              </TableCell>
              <TableCell align="center">
                {"X"}
              </TableCell>
              <TableCell align="left">
                {item.quantity}
              </TableCell>
              <TableCell align="left">
                ${+item.price * +item.quantity}
              </TableCell>
            </TableRow>
          )}
    </>
  );
}

export default function OrdersTable({ rows, throwErrorPopup }) {
  return (
    <div className={s.tableWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order id</TableCell>
              <TableCell>User id</TableCell>
              <TableCell>User name</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <OrderRow key={index} row={row} throwErrorPopup={throwErrorPopup} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

OrderRow.propTypes = {
  row: PropTypes.shape({
      id: PropTypes.number.isRequired,
      react_user_id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired
  }),
  throwErrorPopup: PropTypes.func.isRequired
};

OrdersTable.propTypes = {
  rows: PropTypes.array.isRequired,
  throwErrorPopup: PropTypes.func.isRequired
};
