import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import * as Yup from "yup";
import { useFormik } from "formik";
import X from "../../assets/icons/x.svg";
import Eye from "../../assets/icons/eye-off.svg";
import EyeOn from "../../assets/icons/eye-on.svg";
// import { loginAPI } from "../../services/firebaseAPI";
import s from "./LoginModal.module.scss";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must contain 6 characters or more")
    .required("Required"),
});

const LoginModal = ({ isModalOpen, setIsModalOpen }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const nodeRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      //   loginAPI(values);
      console.log("onSubmit", values);
      actions.resetForm({ values: { email: "", password: "" } });
      setIsModalOpen(false);
    },
    validationSchema: LoginSchema,
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
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
        <h2 className={s.title}>Log In</h2>
        <p className={s.caption}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
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
        <button className={s.submitButton} type="submit">
          Log In
        </button>
      </form>
    </CSSTransition>
  );
};

LoginModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default LoginModal;
