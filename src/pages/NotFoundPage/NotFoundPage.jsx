import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className={css.container}>
      <p className={css.notFoundContent}>
        {t("NotFound.text")} <br />
        <NavLink className={css.linkHome} to="/">
          {t("NotFound.link")}
        </NavLink>
      </p>
    </div>
  );
}
