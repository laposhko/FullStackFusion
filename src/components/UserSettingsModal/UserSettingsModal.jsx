import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import css from "./UserSettingsModal.module.css";
// import { useModalContext } from "../../context/useModalContext";

export default function UserSettingsModal() {
  // const { closeModal } = useModalContext();

  return (
    <div className={css.modal}>
      <h2 className={css.title}>Settings</h2>
      <UserSettingsForm></UserSettingsForm>
    </div>
  );
}
