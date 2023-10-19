import PropTypes from "prop-types";
import s from "./CustomAccentButton.module.scss";
import clsx from "clsx";

const CustomAccentButton = ({ type, title, style, onClick }) => {
  return (
    <button
      type={type}
      className={clsx(style ? style : s.button)}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

CustomAccentButton.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default CustomAccentButton;
