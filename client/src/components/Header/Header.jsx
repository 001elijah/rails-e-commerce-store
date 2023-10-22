import { NavLink } from "react-router-dom";
import {
  SIDEBAR_DATA_LOGGED_IN,
  SIDEBAR_DATA_LOGGED_OUT,
} from "../../utils/constants";
import PropTypes from "prop-types";
import NavbarAuth from "../NavbarAuth/NavbarAuth";
import { useMediaQuery } from "react-responsive";
import Navbar from "../Navbar/Navbar";
import s from "./Header.module.scss";

const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setCurrentUser,
  setOrders,
  setUsers,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <header className={s.header}>
      {!isMobile ? (
        <div className="headerContainer">
          <div className={s.headerFlexWrapper}>
            <nav>
              <ul className={s.topNavbar}>
                {(isLoggedIn
                  ? SIDEBAR_DATA_LOGGED_IN
                  : SIDEBAR_DATA_LOGGED_OUT
                ).map(({ path, title, access }) => {
                  if (
                    isLoggedIn &&
                    currentUser?.role === "admin" &&
                    access !== "user"
                  ) {
                    return (
                      <li key={path}>
                        <NavLink
                          className={s.navItem}
                          style={({ isActive }) =>
                            isActive
                              ? {
                                  color: "#ffb700",
                                  cursor: "default",
                                  background: "none",
                                }
                              : { color: "#2c2c2c" }
                          }
                          to={path}
                        >
                          {title}
                        </NavLink>
                      </li>
                    );
                  } else if (
                    isLoggedIn &&
                    currentUser?.role === "user" &&
                    access !== "admin"
                  ) {
                    return (
                      <li key={path}>
                        <NavLink
                          className={s.navItem}
                          style={({ isActive }) =>
                            isActive
                              ? {
                                  color: "#ffb700",
                                  cursor: "default",
                                  background: "none",
                                }
                              : { color: "#2c2c2c" }
                          }
                          to={path}
                        >
                          {title}
                        </NavLink>
                      </li>
                    );
                  } else if (!isLoggedIn) {
                    return (
                      <li key={path}>
                        <NavLink
                          className={s.navItem}
                          style={({ isActive }) =>
                            isActive
                              ? {
                                  color: "#ffb700",
                                  cursor: "default",
                                  background: "none",
                                }
                              : { color: "#2c2c2c" }
                          }
                          to={path}
                        >
                          {title}
                        </NavLink>
                      </li>
                    );
                  }
                })}
              </ul>
            </nav>
            <NavbarAuth
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
              setOrders={setOrders}
              setUsers={setUsers}
              navbarAuth={s.navbarAuth}
              navbarLogin={s.navbarLogin}
              navbarLogout={s.navbarLogout}
              navbarRegister={s.navbarRegister}
              throwSuccessPopup={throwSuccessPopup}
              throwErrorPopup={throwErrorPopup}
            />
          </div>
        </div>
      ) : (
        <div className="headerContainer">
          <div className={s.headerFlexWrapper}>
            <Navbar
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
              setOrders={setOrders}
              setUsers={setUsers}
              currentUser={currentUser}
              throwSuccessPopup={throwSuccessPopup}
              throwErrorPopup={throwErrorPopup}
            />
          </div>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
  setOrders: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default Header;
