import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {
  SIDEBAR_DATA_LOGGED_IN,
  SIDEBAR_DATA_LOGGED_OUT,
} from "../../utils/constants";
import NavbarAuth from "../NavbarAuth/NavbarAuth";
import ModalPortal from "../ModalPortal/ModalPortal";
import s from "./Navbar.module.scss";

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setCurrentUser,
  setOrders,
  setUsers,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    if (sidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [sidebar]);
  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        {!sidebar && (
          <div>
            <Link to="#" className={s.menuControls}>
              <FaIcons.FaBars
                className={s.burgerIcon}
                onClick={toggleSidebar}
              />
            </Link>
          </div>
        )}
        <ModalPortal isModalOpen={sidebar} setIsModalOpen={setSidebar}>
          <nav className={sidebar ? clsx(s.sidebar, s.active) : s.sidebar}>
            <ul>
              <li className={s.navbarTop}>
                <Link to="#" className={s.menuControls}>
                  <AiIcons.AiOutlineClose
                    className={s.closeIcon}
                    onClick={toggleSidebar}
                  />
                </Link>
              </li>
              {(isLoggedIn
                ? SIDEBAR_DATA_LOGGED_IN
                : SIDEBAR_DATA_LOGGED_OUT
              ).map((item, index) => {
                if (
                  isLoggedIn &&
                  currentUser?.role === "admin" &&
                  item.access !== "user"
                ) {
                  return (
                    <li key={index} className={s.navText}>
                      <NavLink
                        to={item.path}
                        onClick={() => {
                          toggleSidebar();
                        }}
                        className={({ isActive }) =>
                          isActive ? s.isActive : ""
                        }
                      >
                        {item.icons}
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                } else if (
                  isLoggedIn &&
                  currentUser?.role === "user" &&
                  item.access !== "admin"
                ) {
                  return (
                    <li key={index} className={s.navText}>
                      <NavLink
                        to={item.path}
                        onClick={() => {
                          toggleSidebar();
                        }}
                        className={({ isActive }) =>
                          isActive ? s.isActive : ""
                        }
                      >
                        {item.icons}
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                } else if (!isLoggedIn) {
                  return (
                    <li key={index} className={s.navText}>
                      <NavLink
                        to={item.path}
                        onClick={() => {
                          toggleSidebar();
                        }}
                        className={({ isActive }) =>
                          isActive ? s.isActive : ""
                        }
                      >
                        {item.icons}
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                }
              })}
            </ul>
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
              toggleSidebar={toggleSidebar}
            />
          </nav>
        </ModalPortal>
      </IconContext.Provider>
    </>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
  setOrders: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default Navbar;
