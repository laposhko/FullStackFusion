import * as Yup from "yup";
import sprite from "../../img/icons/sprite.svg";
import clsx from "clsx";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

  const [isVisible, setIsVisible] = useState(false);

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

  const handleFormSubmit = (data) => {
    console.log(data);
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

          <svg className={style.svgIcon}>
            <use
              xlinkHref={`${sprite}#${isVisible ? "icon-eye" : "icon-eye-off"}`}
            ></use>
          </svg>

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
          Already have account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
