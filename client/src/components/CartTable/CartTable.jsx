import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomAccentButton from "../CustomAccentButton/CustomAccentButton";
import { useCallback, useEffect, useState } from "react";
import s from "./CartTable.module.scss";
import { addOrderApi } from "../../services/backendAPI";
import { useNavigate } from "react-router-dom";

const ItemRow = ({ rows, row, handleRemoveFromCart, setSum }) => {
  const [editable, setEditable] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(row.quantity);
  const handleEditItem = () => {
    setEditable(!editable);
  };

  const handleSave = useCallback(() => {
    if (+itemQuantity) {
      row.quantity = +itemQuantity;
      setEditable(!editable);
    }
  }, [editable, itemQuantity, row]);

  useEffect(() => {
    setSum(rows.reduce((a, b) => +a + +b.price * +b.quantity, 0));
  }, [rows, setSum, handleSave])

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.description}</TableCell>
      <TableCell align="right">${row.price}</TableCell>
      <TableCell align="right">
        {editable ? (
          <div className={s.qtyWrapper}>
            <input
              className={s.styledInput}
              type="number"
              min="1"
              name="quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />{" "}
            <CustomAccentButton
              type="button"
              title="Save"
              style={s.saveBtn}
              onClick={handleSave}
            />
          </div>
        ) : (
          <div className={s.qtyWrapper}>
            {row.quantity}{" "}
            <CustomAccentButton
              type="button"
              title="Edit"
              onClick={handleEditItem}
            />
          </div>
        )}
      </TableCell>
      <TableCell align="right">Manage</TableCell>
      <TableCell align="right">${+row.price * row.quantity}</TableCell>
      <TableCell align="right"><CustomAccentButton type="button" title="X" style={s.destroyBtn} onClick={() => handleRemoveFromCart(row.id)} /></TableCell>
    </TableRow>
  );
};

export default function CartTable({ rows, handleRemoveFromCart, resetCart }) {
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();

  const handleBuy = async () => {
    await addOrderApi({user_id: 1, amount: sum })
    resetCart();
    navigate("/");
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Q-ty</TableCell>
              <TableCell align="right">Manage</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <ItemRow key={row.id} rows={rows} row={row} handleRemoveFromCart={handleRemoveFromCart} setSum={setSum} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={s.totalPrice}><p>Total price: ${sum}</p><CustomAccentButton type="button" title="Buy" style={s.buyBtn} onClick={handleBuy} /></div>
    </>
  );
}

ItemRow.propTypes = {
  rows: PropTypes.array.isRequired,
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
  handleRemoveFromCart: PropTypes.func.isRequired,
  setSum: PropTypes.func.isRequired
};

CartTable.propTypes = {
  rows: PropTypes.array.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  resetCart: PropTypes.func.isRequired
};
