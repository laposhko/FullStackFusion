import * as Yup from "yup";
import SvgIcon from "../../img/icons/sprite";
import useToast from "../../hooks/useToast";
import { Toaster } from "react-hot-toast";
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

  const { successToast, errorToast } = useToast();

  const [isVisible, setIsVisible] = useState(false);
  const [isCheckVisible, setIsCheckVisible] = useState(false);

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
      successToast("Succesfull sign up");
      navigation("/tracker");
    } catch (error) {
      errorToast("Error in sign up" || error.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
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
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className={style.errorMessage}>{errors.email?.message}</p>
            )}
          </div>
          <div className={style.input}>
            <label className={style.title} htmlFor={passwordId}>
              Password
            </label>
            <div className={style.inputVisContainer}>
              <input
                className={customStyler(errors.password)}
                type={isVisible ? "text" : "password"}
                {...register("password")}
                id={passwordId}
                placeholder="Enter your password"
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
              Repeat Password
            </label>
            <div className={style.inputVisContainer}>
              <input
                className={customStyler(errors.repeatPassword)}
                type={isCheckVisible ? "text" : "password"}
                {...register("repeatPassword")}
                id={repeatPasswordId}
                placeholder="Repeat password"
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
    </>
  );
};

export default SignUpForm;
