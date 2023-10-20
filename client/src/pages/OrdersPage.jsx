import PropTypes from "prop-types";
import OrdersTable from "../components/OrdersTable/OrdersTable";

const OrdersPage = ({ orders }) => {
  return (
    <div className="sectionContainer">
      <OrdersTable rows={orders} />
    </div>
  );
};

OrdersPage.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrdersPage;
