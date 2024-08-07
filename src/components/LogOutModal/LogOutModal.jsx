
import css from "./LogOutModal.module.css";
import { useModalContext } from "../../context/useModalContext.jsx";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth/operations.js";


import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogOutModal = () => {
  const { closeModal } = useModalContext();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  return (
    <div className={css.modalContent}>
      <div className={css.wrapperText}>
        <h2 className={css.title}>Log out</h2>
        <p className={css.text}>Do you really want to leave?</p>
      </div>
      <div className={css.buttonContainer}>
        <button
          className={css.logoutButton}
          onClick={() => {
            dispatch(signOut());
            closeModal();
            navigation("/");

            toast.success("You have successfully logged out");
          }}
        >
          Log out
        </button>
        <button className={css.cancelButton} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
