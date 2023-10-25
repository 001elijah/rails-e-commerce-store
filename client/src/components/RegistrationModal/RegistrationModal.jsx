import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import * as Yup from "yup";
import { useFormik } from "formik";
import X from "../../assets/icons/x.svg";
import Eye from "../../assets/icons/eye-off.svg";
import EyeOn from "../../assets/icons/eye-on.svg";
import { registerUserApi } from "../../services/backendAPI";
import s from "./RegistrationModal.module.scss";

const RegistrationSchema = Yup.object().shape({
  role: Yup.string().required(),
  first_name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message: "Name may contain only letters, apostrophe, dash and spaces.",
      excludeEmptyString: true,
    }),
  last_name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message: "Name may contain only letters, apostrophe, dash and spaces.",
      excludeEmptyString: true,
    }),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must contain 6 characters or more")
    .required("Required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required'),
});

const RegistrationModal = ({
  isModalOpen,
  setIsModalOpen,
  setCurrentUser,
  setIsLoggedIn,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] =
    useState(false);
  const nodeRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      role: "user",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: async (values, actions) => {
      try {
        if (values.password !== values.password_confirmation) {
          throw new Error("Confirm your password!");
        }
        const userData = { user: values };
        const response = await registerUserApi(userData);
        if (response.status === 500) {
          throw new Error("Server error!");
        }
        setIsLoggedIn(true);
        throwSuccessPopup(`Welcome to the shop, ${response.user.first_name}!`);
        actions.resetForm({
          values: {
            role: "user",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
          },
        });
        setCurrentUser(response.user);
        setIsModalOpen(false);
        document.body.style.overflow = "unset";
      } catch (error) {
        throwErrorPopup(error.message);
      }
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
        <h2 className={s.title}>Register</h2>
        <label className={s.nameInputWrapper}>
          <input
            className={s.nameInput}
            id="role"
            name="role"
            type="text"
            placeholder="Type 'user' or 'admin'"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          />
          {formik.errors.role && formik.touched.role && (
            <span className={s.error}>{formik.errors.role}</span>
          )}
        </label>
        <label className={s.nameInputWrapper}>
          <input
            className={s.nameInput}
            id="first_name"
            name="first_name"
            type="text"
            placeholder="First name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
          />
          {formik.errors.first_name && formik.touched.first_name && (
            <span className={s.error}>{formik.errors.first_name}</span>
          )}
        </label>
        <label className={s.nameInputWrapper}>
          <input
            className={s.nameInput}
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Last name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
          />
          {formik.errors.last_name && formik.touched.last_name && (
            <span className={s.error}>{formik.errors.last_name}</span>
          )}
        </label>
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
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_confirmation}
          />
          <button
            className={s.passwordShownButton}
            type="button"
            onClick={togglePasswordConfirmation}
          >
            <img
              src={passwordConfirmationShown ? Eye : EyeOn}
              alt="toggle show password"
            />
          </button>
          {formik.errors.password_confirmation &&
            formik.touched.password_confirmation && (
              <span className={s.error}>
                {formik.errors.password_confirmation}
              </span>
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
  setCurrentUser: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default RegistrationModal;
