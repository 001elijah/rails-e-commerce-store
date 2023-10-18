import PropTypes from "prop-types";
import ItemsList from "../components/ItemsList/ItemsList";

const HomePage = ({ items }) => {
  return (
    <div className="sectionContainer">
      <ItemsList items={items} />
    </div>
  );
};

HomePage.propTypes = {
  items: PropTypes.array.isRequired,
};

export default HomePage;
