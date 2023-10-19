import PropTypes from "prop-types";
import ItemsList from "../components/ItemsList/ItemsList";

const HomePage = ({ onManageItems, items }) => {
  return (
    <div className="sectionContainer">
      <ItemsList items={items} onManageItems={onManageItems} />
    </div>
  );
};

HomePage.propTypes = {
  items: PropTypes.array.isRequired,
  onManageItems: PropTypes.func.isRequired,
};

export default HomePage;
