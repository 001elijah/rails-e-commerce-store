import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../ModalPortal/ModalPortal";
import LoginModal from "../LoginModal/LoginModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import { logoutUserApi } from "../../services/backendAPI";
const NavbarAuth = ({
  isLoggedIn,
  setIsLoggedIn,
  setCurrentUser,
  setOrders,
  setUsers,
  toggleSidebar,
  navbarAuth,
  navbarLogin,
  navbarLogout,
  navbarRegister,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isRegistrationModal, setIsRegistrationModal] = useState(false);

  const handleOpenModal = async (e) => {
    const button = e.target;

    if (button.innerText === "Login") {
      setIsRegistrationModal(false);
      await setIsLoginModal(true);
    } else {
      setIsLoginModal(false);
      await setIsRegistrationModal(true);
    }

    toggleSidebar && (await toggleSidebar());
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUserApi();
      setIsLoggedIn(false);
      setCurrentUser(null);
      setOrders([]);
      setUsers([]);
      throwSuccessPopup("Logged out successfully!");
      toggleSidebar && (await toggleSidebar());
      navigate("/");
    } catch (error) {
      throwErrorPopup(error.message);
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <button className={navbarLogout} type="button" onClick={handleLogout}>
          Log Out
        </button>
      ) : (
        <>
          <ul className={navbarAuth}>
            <li className={navbarLogin}>
              <button type="button" onClick={(e) => handleOpenModal(e)}>
                Login
              </button>
            </li>
            <li className={navbarRegister}>
              <button type="button" onClick={(e) => handleOpenModal(e)}>
                Registration
              </button>
            </li>
          </ul>
          <ModalPortal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          >
            {isLoginModal && (
              <LoginModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setCurrentUser={setCurrentUser}
                setIsLoggedIn={setIsLoggedIn}
                throwSuccessPopup={throwSuccessPopup}
                throwErrorPopup={throwErrorPopup}
              />
            )}
            {isRegistrationModal && (
              <RegistrationModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setCurrentUser={setCurrentUser}
                setIsLoggedIn={setIsLoggedIn}
                throwSuccessPopup={throwSuccessPopup}
                throwErrorPopup={throwErrorPopup}
              />
            )}
          </ModalPortal>
        </>
      )}
    </>
  );
};

NavbarAuth.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setOrders: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func,
  navbarAuth: PropTypes.string.isRequired,
  navbarLogin: PropTypes.string.isRequired,
  navbarLogout: PropTypes.string.isRequired,
  navbarRegister: PropTypes.string.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default NavbarAuth;
