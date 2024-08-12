import * as Yup from "yup";
import SvgIcon from "../../img/icons/sprite";
import useToast from "../../hooks/useToast";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/auth/operations";

import style from "./SignUpForm.module.css";

const SignUpForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  const { t } = useTranslation();

  const { successToast, errorToast } = useToast();

  const [isVisible, setIsVisible] = useState(false);
  const [isCheckVisible, setIsCheckVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("SignUp.emailInvalid"))
      .required(t("SignUp.emailRequired")),
    password: Yup.string()
      .min(6, t("SignUp.passwordMin"))
      .required(t("SignUp.passwordRequired")),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("SignUp.repeatPasswordMatch"))
      .required(t("SignUp.repeatPasswordRequired")),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const customStyler = (errorInput) => {
    return clsx(style.inputField, !!errorInput && style.inputError);
  };

  const setIsCheckVisibleToggler = () => {
    setIsCheckVisible(!isCheckVisible);
  };

  const setVisibleToggler = () => {
    setIsVisible(!isVisible);
  };

  const handleFormSubmit = (data) => {
    try {
      dispatch(
        signUp({
          email: data.email,
          password: data.password,
        })
      );
      successToast(t("SignUp.success"));
      navigation("/tracker");
    } catch (error) {
      errorToast(t("SignUp.error") || error.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form className={style.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={style.formName}>{t("SignUp.signUp")}</div>
        <div className={style.inputContainer}>
          <div className={style.input}>
            <label className={style.title} htmlFor={emailId}>
              {t("SignUp.email")}
            </label>
            <input
              className={customStyler(errors.email)}
              type="email"
              {...register("email")}
              id={emailId}
              placeholder={t("SignUp.emailPlaceholder")}
            />
            {errors.email && (
              <p className={style.errorMessage}>{errors.email?.message}</p>
            )}
          </div>
          <div className={style.input}>
            <label className={style.title} htmlFor={passwordId}>
              {t("SignUp.password")}
            </label>
            <div className={style.inputVisContainer}>
              <input
                className={customStyler(errors.password)}
                type={isVisible ? "text" : "password"}
                {...register("password")}
                id={passwordId}
                placeholder={t("SignUp.passwordPlaceholder")}
              />
              <button
                onClick={setVisibleToggler}
                className={style.iconBtn}
                type="button"
              >
                <SvgIcon
                  className={style.svgIcon}
                  iconName={`${isVisible ? "icon-eye" : "icon-eye-off"}`}
                  width={20}
                  height={20}
                />
              </button>
            </div>
            {errors.password && (
              <p className={style.errorMessage}>{errors.password?.message}</p>
            )}
          </div>
          <div className={style.input}>
            <label className={style.title} htmlFor={repeatPasswordId}>
              {t("SignUp.repeatPassword")}
            </label>
            <div className={style.inputVisContainer}>
              <input
                className={customStyler(errors.repeatPassword)}
                type={isCheckVisible ? "text" : "password"}
                {...register("repeatPassword")}
                id={repeatPasswordId}
                placeholder={t("SignUp.repeatPassword")}
              />
              <button
                onClick={setIsCheckVisibleToggler}
                className={style.iconBtn}
                type="button"
              >
                <SvgIcon
                  className={style.svgIcon}
                  iconName={`${isCheckVisible ? "icon-eye" : "icon-eye-off"}`}
                  width={20}
                  height={20}
                />
              </button>
            </div>
            {errors.repeatPassword && (
              <p className={style.errorMessage}>
                {errors.repeatPassword?.message}
              </p>
            )}
          </div>
        </div>
        <div className="submitBtn">
          <button className={style.formBtn}>{t("SignUp.signUp")}</button>
        </div>
        <div className={style.linkContainer}>
          <p>
            {t("SignUp.text")}{" "}
            <Link className={style.linkTo} to={"/signin"}>
              {t("SignUp.signIn")}
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
