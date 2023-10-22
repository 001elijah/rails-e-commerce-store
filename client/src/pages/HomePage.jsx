import PropTypes from "prop-types";
import ItemsList from "../components/ItemsList/ItemsList";

const HomePage = ({
  currentUser,
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
        currentUser={currentUser}
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
  currentUser: PropTypes.object,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onManageItems: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default HomePage;
