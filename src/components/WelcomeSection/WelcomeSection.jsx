import Logo from "../Logo/Logo.jsx";
import Languages from "../Languages/Languages.jsx";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import css from "./WelcomeSection.module.css";

export default function WelcomeSection() {
  const { t } = useTranslation();
  return (
    <div className={css.welcomeContainer}>
      <Logo />
      <Languages tracker={WelcomeSection} />
      <div>
        <p className={css.subtitle}>{t("WelcomeSection.subtitle")}</p>
        <h1 className={css.mainTitle}>{t("WelcomeSection.title")}</h1>
        <div className={css.buttonBox}>
          <NavLink className={css.linkTry} to="/signup">
            {t("WelcomeSection.linkTry")}
          </NavLink>
          <NavLink className={css.linkSignIn} to="/signin">
            {t("WelcomeSection.signIn")}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
