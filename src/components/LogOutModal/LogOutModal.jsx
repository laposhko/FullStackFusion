import css from "./LogOutModal.module.css";
import { useModalContext } from "../../context/useModalContext.jsx";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { signOut } from "../../redux/auth/operations.js";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogOutModal = () => {
  const { closeModal } = useModalContext();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigate();
  return (
    <div className={css.modalContent}>
      <div className={css.wrapperText}>
        <h2 className={css.title}>{t("LogoutModal.title")}</h2>
        <p className={css.text}>{t("LogoutModal.text")}</p>
      </div>
      <div className={css.buttonContainer}>
        <button
          className={css.logoutButton}
          onClick={() => {
            dispatch(signOut())
              .unwrap()
              .then(() => {
                closeModal();
                toast.success(t("LogoutModal.success"));
                navigation("/");
              })
              .catch(() => {
                alert(t("LogoutModal.error"));
              });
          }}
        >
          {t("LogoutModal.title")}
        </button>
        <button className={css.cancelButton} onClick={closeModal}>
          {t("LogoutModal.cancel")}
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
