import SvgIcon from "../../img/icons/sprite";
import * as Yup from "yup";
import sprite from "../../img/icons/sprite.svg";
import clsx from "clsx";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/auth/operations";

import style from "./SignUpForm.module.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email field is required"),
  password: Yup.string()
    .min(6, "Password must be more than 6 symbols")
    .required("Password field is required"),
  repeatPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Repeat password field must match with password field"
    )
    .required("Repeat password field is required"),
});

const SignUpForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  const [isVisible, setIsVisible] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigate();

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

  const setVisibleToggler = () => {
    setIsVisible(!isVisible);
  };

  const handleFormSubmit = (data) => {
    dispatch(
      signUp({
        email: data.email,
        password: data.password,
      })
    );
    navigation("/tracker");
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={style.formName}>Sign Up</div>
      <div className={style.inputContainer}>
        <div className={style.input}>
          <label className={style.title} htmlFor={emailId}>
            Email
          </label>
          <input
            className={customStyler(errors.email)}
            type="email"
            {...register("email")}
            id={emailId}
          />
          {errors.email && (
            <p className={style.errorMessage}>{errors.email?.message}</p>
          )}
        </div>
        <div className={style.input}>
          <label className={style.title} htmlFor={passwordId}>
            Password
          </label>
          <input
            className={customStyler(errors.password)}
            type="password"
            {...register("password")}
            id={passwordId}
          />
          <button type="button">
            <SvgIcon
              className={style.svgIcon}
              iconName={`${sprite}#${isVisible ? "icon-eye" : "icon-eye-off"}`}
              width={20}
              height={20}
            />
          </button>
          {errors.password && (
            <p className={style.errorMessage}>{errors.password?.message}</p>
          )}
        </div>
        <div className={style.input}>
          <label className={style.title} htmlFor={repeatPasswordId}>
            Repeat Password
          </label>
          <input
            className={customStyler(errors.repeatPassword)}
            type="password"
            {...register("repeatPassword")}
            id={repeatPasswordId}
          />
          <button type="button">
            <SvgIcon
              className={style.svgIcon}
              iconName={`${sprite}#${isVisible ? "icon-eye" : "icon-eye-off"}`}
              width={20}
              height={20}
            />
          </button>
          {errors.repeatPassword && (
            <p className={style.errorMessage}>
              {errors.repeatPassword?.message}
            </p>
          )}
        </div>
      </div>
      <div className="submitBtn">
        <button className={style.formBtn}>Sign Up</button>
      </div>
      <div className={style.linkContainer}>
        <p>
          Already have account?{" "}
          <Link className={style.linkTo} to={"/signin"}>
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
