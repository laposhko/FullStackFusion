import Languages from "../Languages/Languages.jsx";
import { useSelector } from "react-redux";
import css from "./UserPanel.module.css";
import { selectAuthUser } from "../../redux/auth/selectors";
import { useTranslation } from "react-i18next";

import UserBar from "../UserBar/UserBar.jsx";

function UserPanel() {
  const user = useSelector(selectAuthUser);
  const { t } = useTranslation();
  return (
    <div className={css.userBarWrapper}>
      <Languages />
      <h2 className={css.welcome}>
        {t("UserPanel.title")}
        <span className={css.userName}>, {user.name}!</span>
      </h2>
      <UserBar />
    </div>
  );
}

export default UserPanel;
