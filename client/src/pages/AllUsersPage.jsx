import PropTypes from "prop-types";
import UsersTable from "../components/UsersTable/UsersTable";

const AllUsersPage = ({ currentUser, users }) => {
  return (
    <div className="sectionContainer">
      {currentUser?.role === "admin" ? (
        <UsersTable rows={users} />
      ) : (
        <>
          <h2>My profile</h2>
          <p>User id: {currentUser?.id}</p>
          <p>Email: {currentUser?.email}</p>
          <p>
            Date created:{" "}
            {new Date(currentUser?.created_at).toLocaleDateString("en-US")}
          </p>
          <p>First name: {currentUser?.first_name}</p>
          <p>Last name: {currentUser?.last_name}</p>
          <p>Role: {currentUser?.role}</p>
        </>
      )}
    </div>
  );
};

AllUsersPage.propTypes = {
  currentUser: PropTypes.object,
  users: PropTypes.array.isRequired,
};

export default AllUsersPage;
