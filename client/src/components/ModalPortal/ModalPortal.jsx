import PropTypes from "prop-types";
import { useEffect } from "react";
import { useEscapeKey } from "../../utils/useEscapeKey";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
const modalRoot = document.getElementById("modal-root");
const windowRoot = document.getElementById("window-root");

const ModalPortal = ({ children, isModalOpen = false, setIsModalOpen }) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  useEscapeKey(() => setIsModalOpen(false));
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />,
        modalRoot,
      )}
      {ReactDOM.createPortal(children, windowRoot)}
    </>
  );
};

ModalPortal.propTypes = {
  children: PropTypes.any,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default ModalPortal;
