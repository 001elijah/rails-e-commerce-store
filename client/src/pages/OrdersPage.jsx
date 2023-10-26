import PropTypes from "prop-types";
import OrdersTable from "../components/OrdersTable/OrdersTable";

const OrdersPage = ({ orders, throwErrorPopup }) => {
  return (
    <div className="sectionContainer">
      <h1>Orders history</h1>
      {orders.length > 0 ? (
        <OrdersTable rows={orders} throwErrorPopup={throwErrorPopup} />
      ) : (
        <p>No orders yet!</p>
      )}
    </div>
  );
};

OrdersPage.propTypes = {
  orders: PropTypes.array.isRequired,
  throwErrorPopup: PropTypes.func.isRequired
};

export default OrdersPage;
