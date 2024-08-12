import * as Yup from "yup";
import SvgIcon from "../../img/icons/sprite";
import useToast from "../../hooks/useToast";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/auth/operations";
import css from "./SignInForm.module.css";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();

  const { t } = useTranslation();

  const { successToast, errorToast } = useToast();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("SignIn.emailInvalid"))
      .required(t("SignIn.emailRequired")),
    password: Yup.string()
      .min(6, t("SignIn.passwordMin"))
      .required(t("SignIn.passwordRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const customStyler = (errorInput) => {
    return `${css.inputField} ${!!errorInput ? css.inputError : ""}`;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        signIn({
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      successToast(t("SignIn.success"));
      navigate("/tracker");
    } catch (error) {
      errorToast(t("SignIn.error") || error.message);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.formTitle}>{t("SignIn.signIn")}</div>
      <div className={css.inputContainer}>
        <div className={css.inputGroup}>
          <label className={css.label} htmlFor={emailId}>
            {t("SignIn.email")}
          </label>
          <input
            className={customStyler(errors.email)}
            type="email"
            {...register("email")}
            id={emailId}
            placeholder={t("SignIn.emailPlaceholder")}
          />
          {errors.email && (
            <p className={css.errorMessage}>{errors.email?.message}</p>
          )}
        </div>
        <div className={css.inputGroup}>
          <label className={css.label} htmlFor={passwordId}>
            {t("SignIn.password")}
          </label>
          <div className={css.passwordContainer}>
            <input
              className={customStyler(errors.password)}
              type={showPassword ? "text" : "password"}
              {...register("password")}
              id={passwordId}
              placeholder={t("SignIn.passwordPlaceholder")}
            />
            <button
              onClick={togglePasswordVisibility}
              className={css.eyeToggle}
              type="button"
            >
              <SvgIcon
                className={css.svgIcon}
                iconName={`${showPassword ? "icon-eye" : "icon-eye-off"}`}
                width={20}
                height={20}
              />
            </button>
          </div>
          {errors.password && (
            <p className={css.errorMessage}>{errors.password?.message}</p>
          )}
        </div>
      </div>
      <NavLink className={css.resetPassword} to="/resetPassword">
        {t("SignIn.passwordForget")}
      </NavLink>
      <div className={css.submitContainer}>
        <button className={css.submitButton}>{t("SignIn.signIn")}</button>
      </div>
      <div className={css.linkContainer}>
        <p>
          {t("SignIn.text")}{" "}
          <Link className={css.signUpLink} to={"/signup"}>
            {t("SignIn.signUp")}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
