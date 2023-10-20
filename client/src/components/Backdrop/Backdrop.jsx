import PropTypes from "prop-types";
import s from "./Backdrop.module.scss";

const Backdrop = ({ isModalOpen, setIsModalOpen }) => {
  return isModalOpen ? (
    <div className={s.backdrop} onClick={() => setIsModalOpen()}></div>
  ) : null;
};

Backdrop.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default Backdrop;
