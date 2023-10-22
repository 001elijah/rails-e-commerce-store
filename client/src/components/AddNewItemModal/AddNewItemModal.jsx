import { useRef } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import * as Yup from "yup";
import { useFormik } from "formik";
import X from "../../assets/icons/x.svg";
import { addItemApi } from "../../services/backendAPI";
import s from "./AddNewItemModal.module.scss";

const ItemSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
});

const AddNewItemModal = ({
  onManageItems,
  isModalOpen,
  setIsModalOpen,
  throwSuccessPopup,
  throwErrorPopup,
}) => {
  const nodeRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const item = await addItemApi(values);
        onManageItems((items) => [...items, item]);
        throwSuccessPopup("New item created!");
        actions.resetForm({ values: { name: "", description: "", price: "" } });
        setIsModalOpen(false);
      } catch (error) {
        throwErrorPopup(error.message);
      }
    },
    validationSchema: ItemSchema,
  });

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
        <h2 className={s.title}>New item</h2>
        <label className={s.emailInputWrapper}>
          <input
            className={s.emailInput}
            id="name"
            name="name"
            placeholder="Item name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <span className={s.error}>{formik.errors.name}</span>
          )}
        </label>
        <label className={s.passwordInputWrapper}>
          <input
            className={s.passwordInput}
            id="description"
            name="description"
            placeholder="Item description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.errors.description && formik.touched.description && (
            <span className={s.error}>{formik.errors.description}</span>
          )}
        </label>
        <label className={s.passwordInputWrapper}>
          <input
            className={s.passwordInput}
            id="price"
            name="price"
            placeholder="Item price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.errors.price && formik.touched.price && (
            <span className={s.error}>{formik.errors.price}</span>
          )}
        </label>
        <button className={s.submitButton} type="submit">
          Save
        </button>
      </form>
    </CSSTransition>
  );
};

AddNewItemModal.propTypes = {
  onManageItems: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func.isRequired,
  throwSuccessPopup: PropTypes.func.isRequired,
  throwErrorPopup: PropTypes.func.isRequired,
};

export default AddNewItemModal;
