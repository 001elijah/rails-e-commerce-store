import PropTypes from "prop-types";
import s from "./ItemCard.module.scss";

const ItemCard = ({ name, description, price }) => {
  return (
    <>
      <div className={s.itemCard}>
        <div className={s.rowDirection}>
          <div className={s.columnDirection}>
            <h2 className={s.itemName}>{name}</h2>
            <p className={s.itemDescription}>{description}</p>
          </div>
          <span className={s.bigBoldText}>${price}</span>
        </div>
      </div>
    </>
  );
};

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ItemCard;
