import { useDispatch, useSelector } from "react-redux";
import { googleAuthLink } from "../../redux/auth/operations.js";
import { selectAuthGoogleLink } from "../../redux/auth/selectors.js";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import css from "./GoogleAuthorization.module.css";

export default function GoogleAuthorization() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectorGoogleLink = useSelector(selectAuthGoogleLink);

  useEffect(() => {
    dispatch(googleAuthLink());
  }, [dispatch]);
  return (
    <a href={selectorGoogleLink} className={css.googleLink}>
      <FcGoogle className={css.googleIcon} />
      {t("GoogleAuthBtn.text")}
    </a>
  );
}
