import PropTypes from "prop-types";
import s from "./ItemsList.module.scss";
import ItemCard from "../ItemCard/ItemCard";
import CustomAccentButton from "../CustomAccentButton/CustomAccentButton";
import ItemsTable from "../ItemsTable/ItemsTable";
import { useState } from "react";
import ModalPortal from "../ModalPortal/ModalPortal";
import AddNewItemModal from "../AddNewItemModal/AddNewItemModal";

const ItemsList = ({ onManageItems, items }) => {
  const [enableTableView, setEnableTableView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };

  const handleToggleView = () => {
    setEnableTableView(!enableTableView);
  };
  return (
    <>
      <div className={s.controlsWrapper}>
        <h1 className={s.title}>Items</h1>
        <CustomAccentButton
          type="button"
          title="Toggle view"
          onClick={handleToggleView}
        />
        <CustomAccentButton
          type="button"
          title="Add new"
          onClick={handleOpenModal}
        />
      </div>
      {enableTableView ? (
        <ItemsTable onManageItems={onManageItems} rows={items} />
      ) : (
        <ul className={s.itemsWrapper}>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <ItemCard
                  onManageItems={onManageItems}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                />
              </li>
            );
          })}
        </ul>
      )}
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <AddNewItemModal
          onManageItems={onManageItems}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </ModalPortal>
    </>
  );
};

ItemsList.propTypes = {
  onManageItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default ItemsList;
