import { NavLink } from "react-router-dom";
import {
  SIDEBAR_DATA_LOGGED_IN,
  SIDEBAR_DATA_LOGGED_OUT,
} from "../../utils/constants";
import PropTypes from "prop-types";
import NavbarAuth from "../NavbarAuth/NavbarAuth";
import s from "./Header.module.scss";

const Header = ({ isLoggedIn }) => {
  return (
    <header className={s.header}>
      <div className="headerContainer">
        <div className={s.headerFlexWrapper}>
          <nav>
            <ul className={s.topNavbar}>
              {(isLoggedIn
                ? SIDEBAR_DATA_LOGGED_IN
                : SIDEBAR_DATA_LOGGED_OUT
              ).map(({ path, title }) => (
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
              ))}
            </ul>
          </nav>
          <NavbarAuth
            isLoggedIn={isLoggedIn}
            navbarAuth={s.navbarAuth}
            navbarLogin={s.navbarLogin}
            navbarLogout={s.navbarLogout}
            navbarRegister={s.navbarRegister}
          />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
