import PropTypes from "prop-types";
import ItemCard from "../ItemCard/ItemCard";
import CustomAccentButton from "../CustomAccentButton/CustomAccentButton";
import ItemsTable from "../ItemsTable/ItemsTable";
import { useState } from "react";
import ModalPortal from "../ModalPortal/ModalPortal";
import AddNewItemModal from "../AddNewItemModal/AddNewItemModal";
import s from "./ItemsList.module.scss";

const ItemsList = ({
  currentUser,
  onManageItems,
  items,
  cart,
  setCart,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  const [enableTableView, setEnableTableView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };

  const handleToggleView = () => {
    setEnableTableView(!enableTableView);
  };
  if (items.length === 0) {
    return <div className={s.loader}></div>;
  }
  return (
    <>
      <h1 className={s.title}>Items</h1>
      {currentUser?.role === "admin" && (
        <div className={s.controlsWrapper}>
          <CustomAccentButton
            type="button"
            title="Toggle view"
            onClick={handleToggleView}
          />
          <CustomAccentButton
            type="button"
            title="Add new"
            style={s.addNewBtn}
            onClick={handleOpenModal}
          />
        </div>
      )}
      {enableTableView ? (
        <ItemsTable
          onManageItems={onManageItems}
          rows={items}
          throwSuccessPopup={throwSuccessPopup}
          throwErrorPopup={throwErrorPopup}
        />
      ) : (
        <ul className={s.itemsWrapper}>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <ItemCard
                  currentUser={currentUser}
                  onManageItems={onManageItems}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  cart={cart}
                  setCart={setCart}
                  throwSuccessPopup={throwSuccessPopup}
                  throwErrorPopup={throwErrorPopup}
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
          throwSuccessPopup={throwSuccessPopup}
          throwErrorPopup={throwErrorPopup}
        />
      </ModalPortal>
    </>
  );
};

ItemsList.propTypes = {
  currentUser: PropTypes.object,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  onManageItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default ItemsList;
