import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import * as Yup from "yup";
import { useFormik } from "formik";
import X from "../../assets/icons/x.svg";
import Eye from "../../assets/icons/eye-off.svg";
import EyeOn from "../../assets/icons/eye-on.svg";
// import { createUserInstanceInDB, registerAPI } from "../../services/firebaseAPI";
import s from "./RegistrationModal.module.scss";
import { registerUserApi } from "../../services/backendAPI";

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must contain 6 characters or more")
    .required("Required"),
  password_confirmation: Yup.string()
    .min(6, "Must contain 6 characters or more")
    .required("Required"),
});

const RegistrationModal = ({ isModalOpen, setIsModalOpen }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] = useState(false);
  const nodeRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: async (values, actions) => {
      const userData = { user: values };
      const response = await registerUserApi(userData);
      console.log('onSubmit', response);
      //   await registerAPI(values);
      //   await createUserInstanceInDB(values);
      actions.resetForm({ values: { email: "", password: "", password_confirmation: "" } });
      setIsModalOpen(false);
    },
    validationSchema: RegistrationSchema,
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const togglePasswordConfirmation = () => {
    setPasswordConfirmationShown(!passwordConfirmationShown);
  };
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isModalOpen}
      nodeRef={nodeRef}
      timeout={{ enter: 700, exit: 700 }}
      classNames={{
        enterActive: s.modalEnterActive,
        exitActive: s.modalExitActive,
      }}
    >
      <form className={s.modal} ref={nodeRef} onSubmit={formik.handleSubmit}>
        <button
          type="button"
          className={s.closeButton}
          onClick={() => setIsModalOpen()}
        >
          <img src={X} alt="close" />
        </button>
        <label className={s.emailInputWrapper}>
          <input
            className={s.emailInput}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <span className={s.error}>{formik.errors.email}</span>
          )}
        </label>
        <label className={s.passwordInputWrapper}>
          <input
            className={s.passwordInput}
            id="password"
            name="password"
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <button
            className={s.passwordShownButton}
            type="button"
            onClick={togglePassword}
          >
            <img src={passwordShown ? Eye : EyeOn} alt="toggle show password" />
          </button>
          {formik.errors.password && formik.touched.password && (
            <span className={s.error}>{formik.errors.password}</span>
          )}
        </label>
        <label className={s.passwordInputWrapper}>
          <input
            className={s.passwordInput}
            id="password_confirmation"
            name="password_confirmation"
            type={passwordConfirmationShown ? "text" : "password"}
            placeholder="Confirm password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_confirmation}
          />
          <button
            className={s.passwordShownButton}
            type="button"
            onClick={togglePasswordConfirmation}
          >
            <img src={passwordConfirmationShown ? Eye : EyeOn} alt="toggle show password" />
          </button>
          {formik.errors.password_confirmation && formik.touched.password_confirmation && (
            <span className={s.error}>{formik.errors.password_confirmation}</span>
          )}
        </label>
        <button className={s.submitButton} type="submit">
          Sign Up
        </button>
      </form>
    </CSSTransition>
  );
};

RegistrationModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default RegistrationModal;
