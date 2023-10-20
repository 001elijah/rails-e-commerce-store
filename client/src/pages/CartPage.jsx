import PropTypes from "prop-types";
import CartTable from "../components/CartTable/CartTable";

const CartPage = ({ cart, handleRemoveFromCart, resetCart }) => {
  return (
    <>
      {cart.length ? (
        <div className="sectionContainer">
          <CartTable rows={cart} handleRemoveFromCart={handleRemoveFromCart} resetCart={resetCart}/>
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
  resetCart: PropTypes.func.isRequired
};

export default CartPage;
