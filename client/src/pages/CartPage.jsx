import PropTypes from "prop-types";
import CartTable from "../components/CartTable/CartTable";

const CartPage = ({
  currentUser,
  cart,
  handleRemoveFromCart,
  resetCart,
  setOrders,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  return (
    <>
      {cart.length ? (
        <div className="sectionContainer">
          <CartTable
            currentUser={currentUser}
            rows={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            resetCart={resetCart}
            setOrders={setOrders}
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
  currentUser: PropTypes.object,
  cart: PropTypes.array.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  resetCart: PropTypes.func.isRequired,
  setOrders: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default CartPage;
