import PropTypes from "prop-types";
import CartTable from "../components/CartTable/CartTable";

const CartPage = ({
  cart,
  handleRemoveFromCart,
  resetCart,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  return (
    <>
      {cart.length ? (
        <div className="sectionContainer">
          <CartTable
            rows={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            resetCart={resetCart}
            throwSuccessPopup={throwSuccessPopup}
            throwErrorPopup={throwErrorPopup}
          />
        </div>
      ) : (
        <div className="sectionContainer">
          <p>Your cart is empty yet</p>
        </div>
      )}
    </>
  );
};

CartPage.propTypes = {
  cart: PropTypes.array.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  resetCart: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default CartPage;
