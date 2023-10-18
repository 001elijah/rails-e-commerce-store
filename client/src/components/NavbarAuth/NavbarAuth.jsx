import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../ModalPortal/ModalPortal";
import LoginModal from "../LoginModal/LoginModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
const NavbarAuth = ({
  isLoggedIn,
  toggleSidebar,
  navbarAuth,
  navbarLogin,
  navbarLogout,
  navbarRegister,
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

  const handleLogout = () => {
    // logoutAPI();
    console.log("handleLogout");
    // localStorage.setItem("favoriteTeachers", JSON.stringify([]));
    navigate("/");
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
              />
            )}
            {isRegistrationModal && (
              <RegistrationModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
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
  toggleSidebar: PropTypes.func,
  navbarAuth: PropTypes.string.isRequired,
  navbarLogin: PropTypes.string.isRequired,
  navbarLogout: PropTypes.string.isRequired,
  navbarRegister: PropTypes.string.isRequired,
};

export default NavbarAuth;
