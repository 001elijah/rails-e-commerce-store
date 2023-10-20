import PropTypes from "prop-types";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const SharedLayout = ({ isLoggedIn }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
    </Suspense>
  );
};

SharedLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SharedLayout;
