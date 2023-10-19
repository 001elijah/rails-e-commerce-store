import UsersTable from "../components/UsersTable/UsersTable";

function createRecentCustomers(
  id,
  first_name,
  last_name,
  email,
  role,
  created_at,
  updated_at,
) {
  return { id, first_name, last_name, email, role, created_at, updated_at };
}

const recentCustomers = [
  createRecentCustomers(
    "1",
    "Alex",
    "Honcharenko",
    "alexshatov@gmail.com",
    "admin",
    "10/14/2023",
    "10/14/2023",
  ),
  createRecentCustomers(
    "2",
    "Philip",
    "Harbach",
    "philip.h@gmail.com",
    "user",
    "10/14/2023",
    "10/14/2023",
  ),
  createRecentCustomers(
    "3",
    "Mirko",
    "Fisuk",
    "mirkofisuk@gmail.com",
    "admin",
    "10/14/2023",
    "10/14/2023",
  ),
  createRecentCustomers(
    "4",
    "Olga",
    "Semko",
    "olga.s@cool.design",
    "user",
    "10/14/2023",
    "10/14/2023",
  ),
  createRecentCustomers(
    "5",
    "Burak",
    "Long",
    "longburak@gmail.com",
    "user",
    "10/14/2023",
    "10/14/2023",
  ),
];

const AllUsersPage = () => {
  return (
    <div className="sectionContainer">
      <UsersTable rows={recentCustomers} />
    </div>
  );
};

export default AllUsersPage;
