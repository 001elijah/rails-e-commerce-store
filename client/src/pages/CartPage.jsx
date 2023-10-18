import CartTable from "../components/CartTable/CartTable";

function createRecentCustomers(name, description, price, manage, total) {
  return { name, description, price, manage, total };
}

const recentCustomers = [
  createRecentCustomers("Apple", "Some apple", 1.0, "Manage", 2.0),
  createRecentCustomers("Car", "Some car", 28000.0, "Manage", 28000.0),
  createRecentCustomers("Phone", "Some phone", 1200.0, "Manage", 1200.0),
  createRecentCustomers("Toy", "Some toy", 15.0, "Manage", 45.0),
  createRecentCustomers("House", "Some house", 100000.0, "Manage", 100000.0),
];

const CartPage = () => {
  return <div className="sectionContainer"><CartTable rows={recentCustomers} /></div>;
};

export default CartPage;
