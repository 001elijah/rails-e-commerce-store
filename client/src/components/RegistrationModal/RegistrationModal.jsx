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

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message: "Name may contain only letters, apostrophe, dash and spaces.",
      excludeEmptyString: true,
    }),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must contain 6 characters or more")
    .required("Required"),
});

const RegistrationModal = ({ isModalOpen, setIsModalOpen }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const nodeRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      console.log("onSubmit", values);
      //   await registerAPI(values);
      //   await createUserInstanceInDB(values);
      actions.resetForm({ values: { name: "", email: "", password: "" } });
      setIsModalOpen(false);
    },
    validationSchema: RegistrationSchema,
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
        <h2 className={s.title}>Registration</h2>
        <p className={s.caption}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <label className={s.nameInputWrapper}>
          <input
            className={s.nameInput}
            id="name"
            name="name"
            type="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <span className={s.error}>{formik.errors.name}</span>
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
