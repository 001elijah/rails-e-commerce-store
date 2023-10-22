import PropTypes from "prop-types";
import CustomAccentButton from "../CustomAccentButton/CustomAccentButton";
import { useState } from "react";
import ModalPortal from "../ModalPortal/ModalPortal";
import EditItemModal from "../EditItemModal/EditItemModal";
import { destroyItemApi } from "../../services/backendAPI";
import s from "./ItemCard.module.scss";

const ItemCard = ({
  currentUser,
  onManageItems,
  id,
  name,
  description,
  price,
  cart,
  setCart,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };
  const handleDestroyItem = async () => {
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

  const handleAddToCart = () => {
    const item = { id, name, description, price, quantity: +itemQuantity };
    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      setCart((prevItems) => [...prevItems, item]);
    } else {
      const nextCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: +cartItem.quantity + +item.quantity };
        } else {
          return cartItem;
        }
      });
      setCart(nextCart);
    }
    throwSuccessPopup("Item added to cart!");
  };

  return (
    <>
      <div className={s.cardWrapper}>
        {currentUser?.role === "admin" && (
          <div className={s.controlsWrapper}>
            <CustomAccentButton
              type="button"
              title="Edit item"
              onClick={handleOpenModal}
            />
            <CustomAccentButton
              type="button"
              title="Destroy"
              style={s.destroyBtn}
              onClick={handleDestroyItem}
            />
          </div>
        )}
        <div className={s.itemCard}>
          <div className={s.rowDirection}>
            <div className={s.columnDirection}>
              <h2 className={s.itemName}>{name}</h2>
              <p className={s.itemDescription}>{description}</p>
            </div>
            <span className={s.bigBoldText}>${price}</span>
          </div>
        </div>
        {currentUser?.role === "user" && (
          <div className={s.bottomControlsWrapper}>
            <input
              className={s.styledInput}
              type="number"
              name="quantity"
              min="0"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
            <CustomAccentButton
              type="button"
              title="Add to cart"
              style={s.addToCartBtn}
              onClick={handleAddToCart}
            />
          </div>
        )}
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
          throwSuccessPopup={throwSuccessPopup}
          throwErrorPopup={throwErrorPopup}
        />
      </ModalPortal>
    </>
  );
};

ItemCard.propTypes = {
  currentUser: PropTypes.object,
  onManageItems: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default ItemCard;
