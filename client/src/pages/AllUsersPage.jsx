import PropTypes from "prop-types";
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

const AllUsersPage = ({currentUser}) => {
  return (
    <div className="sectionContainer">
      {
        currentUser?.role === "admin" ?
        <UsersTable rows={recentCustomers} /> :
          <>
            <h2>My profile</h2>
            <p>User id: {currentUser?.id}</p>
            <p>Email: {currentUser?.email}</p>
            <p>Date created: {new Date(currentUser?.created_at).toLocaleDateString("en-US")}</p>
            <p>First name: {currentUser?.first_name}</p>
            <p>Last name: {currentUser?.last_name}</p>
            <p>Role: {currentUser?.role}</p>
          </>
      }
    </div>
  );
};

AllUsersPage.propTypes = {
  currentUser: PropTypes.object
};

export default AllUsersPage;
