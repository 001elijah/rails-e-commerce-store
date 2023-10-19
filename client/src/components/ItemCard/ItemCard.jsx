import PropTypes from "prop-types";
import s from "./ItemCard.module.scss";
import CustomAccentButton from "../CustomAccentButton/CustomAccentButton";
import { useState } from "react";
import ModalPortal from "../ModalPortal/ModalPortal";
import EditItemModal from "../EditItemModal/EditItemModal";
import { destroyItemApi } from "../../services/backendAPI";

const ItemCard = ({ onManageItems, id, name, description, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };
  const handleDestroyItem = async () => {
    await destroyItemApi(id);
    onManageItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem.id !== id),
    );
  };
  return (
    <>
      <div className={s.cardWrapper}>
        <div className={s.controlsWrapper}>
          <CustomAccentButton
            type="button"
            title="Edit item"
            onClick={handleOpenModal}
          />
          <CustomAccentButton
            type="button"
            title="Destroy"
            onClick={handleDestroyItem}
          />
        </div>
        <div className={s.itemCard}>
          <div className={s.rowDirection}>
            <div className={s.columnDirection}>
              <h2 className={s.itemName}>{name}</h2>
              <p className={s.itemDescription}>{description}</p>
            </div>
            <span className={s.bigBoldText}>${price}</span>
          </div>
        </div>
      </div>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <EditItemModal
          onManageItems={onManageItems}
          id={id}
          name={name}
          description={description}
          price={price}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </ModalPortal>
    </>
  );
};

ItemCard.propTypes = {
  onManageItems: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ItemCard;
