import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import * as Yup from "yup";
import { useFormik } from "formik";
import X from "../../assets/icons/x.svg";
import Eye from "../../assets/icons/eye-off.svg";
import EyeOn from "../../assets/icons/eye-on.svg";
import { loginUserApi } from "../../services/backendAPI";
import s from "./LoginModal.module.scss";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must contain 6 characters or more")
    .required("Required"),
});

const LoginModal = ({
  isModalOpen,
  setIsModalOpen,
  setCurrentUser,
  setIsLoggedIn,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const nodeRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const userData = { user: values };
        const response = await loginUserApi(userData);
        if (response.status === 401) {
          throw new Error("Wrong email or password!");
        }
        setIsLoggedIn(true);
        throwSuccessPopup(`Welcome back, ${response.user.first_name}!`);
        actions.resetForm({ values: { email: "", password: "" } });
        setCurrentUser(response.user);
        setIsModalOpen(false);
        document.body.style.overflow = "unset";
      } catch (error) {
        throwErrorPopup(error.message);
      }
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
  setCurrentUser: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default LoginModal;
