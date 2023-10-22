import PropTypes from "prop-types";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const SharedLayout = ({
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setCurrentUser,
  setOrders,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setOrders={setOrders}
        throwSuccessPopup={throwSuccessPopup}
        throwErrorPopup={throwErrorPopup}
      />
      <Outlet />
    </Suspense>
  );
};

SharedLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
  setOrders: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default SharedLayout;
