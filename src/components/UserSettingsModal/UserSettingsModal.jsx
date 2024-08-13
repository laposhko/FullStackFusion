import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import { useTranslation } from "react-i18next";
import css from "./UserSettingsModal.module.css";
// import { useModalContext } from "../../context/useModalContext";

export default function UserSettingsModal() {
  const { t } = useTranslation();
  return (
    <div className={css.modal}>
      <h2 className={css.title}>{t("UserSettingsModal.title")}</h2>
      <UserSettingsForm></UserSettingsForm>
    </div>
  );
}
