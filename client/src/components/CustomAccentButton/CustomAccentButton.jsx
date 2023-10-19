import PropTypes from "prop-types";
import s from "./CustomAccentButton.module.scss";

const CustomAccentButton = ({ type, title, onClick }) => {
  return (
    <button type={type} className={s.button} onClick={onClick}>
      {title}
    </button>
  );
};

CustomAccentButton.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomAccentButton;
