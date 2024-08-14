import { resetPassword } from "../../redux/auth/operations.js";
import Logo from "../../components/Logo/Logo.jsx";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import * as yup from "yup";
import css from "./ChangePasswordPage.module.css";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");
  const { token } = useParams();
  const { t } = useTranslation();

  let changePasswordSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, t("ChangePassword.passwordMin"))
      .required(t("ChangePassword.passwordRequired")),
  });

  const handleChangePassword = async (event) => {
    event.preventDefault();

    try {
      await changePasswordSchema.validate({ password });
      if (token) {
        dispatch(resetPassword({ password: password, token: token }));
        toast.success(t("ChangePassword.success"));
      } else {
        toast.error(t("ChangePassword.error"));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.changePasswordContainer}>
      <div className={css.changePasswordPage}>
        <Logo />
        <h3 className={css.changePasswordTitle}>{t("ChangePassword.title")}</h3>
        <form onSubmit={handleChangePassword} className={css.passwordForm}>
          <div className={css.passwordFieldWrapper}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("ChangePassword.passwordPlaceholder")}
              className={css.changeInput}
              value={password}
              onChange={handlePasswordChange}
            />
            <div className={css.iconWrapper} onClick={togglePasswordVisibility}>
              {showPassword ? (
                <LuEye className={css.iconPasswordOpen} />
              ) : (
                <LuEyeOff className={css.iconPasswordOff} />
              )}
            </div>
          </div>
          <button type="submit" className={css.changePasswordButton}>
            {t("ChangePassword.save")}
          </button>
        </form>
      </div>
    </div>
  );
}
