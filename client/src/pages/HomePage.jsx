import PropTypes from "prop-types";
import ItemsList from "../components/ItemsList/ItemsList";

const HomePage = ({
  onManageItems,
  items,
  cart,
  setCart,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  return (
    <div className="sectionContainer">
      <ItemsList
        items={items}
        onManageItems={onManageItems}
        cart={cart}
        setCart={setCart}
        throwSuccessPopup={throwSuccessPopup}
        throwErrorPopup={throwErrorPopup}
      />
    </div>
  );
};

HomePage.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onManageItems: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default HomePage;
