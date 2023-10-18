import OrdersTable from "../components/OrdersTable/OrdersTable";

function createRecentCustomers(id, name, email, amount, date) {
  return { id, name, email, amount, date };
}

const recentCustomers = [
  createRecentCustomers("1", "Alex Shatov", "alexshatov@gmail.com", 2890.66, "10/14/2023"),
  createRecentCustomers("2", "Philip Harbach", "philip.h@gmail.com", 2767.04, "10/14/2023"),
  createRecentCustomers("3", "Mirko Fisuk", "mirkofisuk@gmail.com", 2996.00, "10/14/2023"),
  createRecentCustomers("4", "Olga Semklo", "olga.s@cool.design", 1220.66, "10/14/2023"),
  createRecentCustomers("5", "Burak Long", "longburak@gmail.com", 1890.66, "10/14/2023"),
];

const OrdersPage = () => {
  return <div className="sectionContainer"><OrdersTable rows={recentCustomers} /></div>;
};

export default OrdersPage;
