import PropTypes from "prop-types";
import s from "./ItemsList.module.scss";
import ItemCard from "../ItemCard/ItemCard";
import CustomAccentButton from "../CustomAccentButton/CustomAccentButton";
import ItemsTable from "../ItemsTable/ItemsTable";

const ItemsList = ({ items }) => {
  const handleAddNewItem = () => {
    console.log('handleAddNewItem')
  }
  const handleToggleView = () => {
    console.log('handleToggleView')
  }
  return (
    <>
      <h1 className={s.title}>Items</h1>
      <CustomAccentButton type="button" title="Add new" onClick={handleAddNewItem} />
      <CustomAccentButton type="button" title="Toggle view" onClick={handleToggleView} />
      <ItemsTable rows={items} />
      <ul className={s.itemsWrapper}>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <ItemCard
                name={item.name}
                description={item.description}
                price={item.price}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ItemsList;
