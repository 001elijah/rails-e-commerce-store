import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomAccentButton from "../CustomAccentButton/CustomAccentButton";
import { useState } from "react";
import { destroyItemApi, editItemApi } from "../../services/backendAPI";
import s from "./ItemsTable.module.scss";

const ItemRow = ({
  row,
  onManageItems,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  const { id, name, description, price, created_at, updated_at } = row;
  const [itemName, setItemName] = useState(name);
  const [itemDescription, setItemDescription] = useState(description);
  const [itemPrice, setItemPrice] = useState(price);
  const [editable, setEditable] = useState(false);

  const handleEditItem = () => {
    setEditable(!editable);
  };

  const handleSaveItem = async (id) => {
    try {
      const item = await editItemApi({
        id,
        name: itemName,
        description: itemDescription,
        price: itemPrice,
      });
      setEditable(false);
      onManageItems((prevItems) => {
        const nextItems = prevItems.map((prevItem) => {
          if (prevItem.id === item.id) {
            return { ...prevItem, ...item };
          } else {
            return prevItem;
          }
        });
        return nextItems;
      });
      throwSuccessPopup("Edit item success!");
    } catch (error) {
      throwErrorPopup(error.message);
    }
  };

  const handleDestroyItem = async (id) => {
    try {
      await destroyItemApi(id);
      onManageItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.id !== id),
      );
      throwSuccessPopup("Destroy item success!");
    } catch (error) {
      throwErrorPopup(error.message);
    }
  };
  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell align="right">
        {editable ? (
          <input
            className={s.styledInput}
            type="text"
            name="name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        ) : (
          name
        )}
      </TableCell>
      <TableCell align="right">
        {editable ? (
          <input
            className={s.styledInput}
            type="text"
            name="description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
        ) : (
          description
        )}
      </TableCell>
      <TableCell align="right">
        {editable ? (
          <input
            className={s.styledInput}
            type="text"
            name="price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
        ) : (
          `$${price}`
        )}
      </TableCell>
      <TableCell align="right">
        {new Date(created_at).toLocaleDateString("en-US")}
      </TableCell>
      <TableCell align="right">
        {new Date(updated_at).toLocaleDateString("en-US")}
      </TableCell>
      <TableCell align="right">
        {editable ? (
          <CustomAccentButton
            type="button"
            title="Save"
            style={s.saveBtn}
            onClick={() => handleSaveItem(row.id)}
          />
        ) : (
          <CustomAccentButton
            type="button"
            title="Edit"
            onClick={handleEditItem}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {editable ? (
          <CustomAccentButton
            type="button"
            title="Cancel"
            onClick={handleEditItem}
          />
        ) : (
          <CustomAccentButton
            type="button"
            title="Destroy"
            style={s.destroyBtn}
            onClick={() => handleDestroyItem(row.id)}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default function ItemsTable({
  onManageItems,
  rows,
  throwSuccessPopup,
  throwErrorPopup,
}) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item id</TableCell>
              <TableCell align="right">Item name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Updated at</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <ItemRow
                key={row.id}
                row={row}
                onManageItems={onManageItems}
                throwSuccessPopup={throwSuccessPopup}
                throwErrorPopup={throwErrorPopup}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

ItemRow.propTypes = {
  onManageItems: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

ItemsTable.propTypes = {
  onManageItems: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};
