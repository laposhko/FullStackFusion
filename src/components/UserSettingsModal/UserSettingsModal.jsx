import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import css from "./UserSettingsModal.module.css";
export default function UserSettingsModal() {
  return (
    <div className={css.modal}>
      <h2 className={css.title}>Settings</h2>
      <UserSettingsForm></UserSettingsForm>
    </div>
  );
}
