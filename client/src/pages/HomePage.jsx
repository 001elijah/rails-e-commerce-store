import PropTypes from "prop-types";
import ItemsList from "../components/ItemsList/ItemsList";

const HomePage = ({ onManageItems, items, cart, setCart }) => {
  return (
    <div className="sectionContainer">
      <ItemsList
        items={items}
        onManageItems={onManageItems}
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
};

HomePage.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onManageItems: PropTypes.func.isRequired,
};

export default HomePage;
