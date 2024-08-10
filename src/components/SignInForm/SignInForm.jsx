import * as Yup from "yup";
import SvgIcon from "../../img/icons/sprite";
import useToast from "../../hooks/useToast";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/auth/operations";
import css from "./SignInForm.module.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email field is required"),
  password: Yup.string()
    .min(6, "Password must be more than 6 symbols")
    .required("Password field is required"),
});

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();

  const { successToast, errorToast } = useToast();

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

    successToast("Successful sign in");
    navigate("/tracker");
  } catch (error) {
    errorToast(error.message || "Error in sign in");
  }
};


  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.formTitle}>Sign In</div>
      <div className={css.inputContainer}>
        <div className={css.inputGroup}>
          <label className={css.label} htmlFor={emailId}>
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
            <p className={css.errorMessage}>{errors.email?.message}</p>
          )}
        </div>
        <div className={css.inputGroup}>
          <label className={css.label} htmlFor={passwordId}>
            Password
          </label>
          <div className={css.passwordContainer}>
            <input
              className={customStyler(errors.password)}
              type={showPassword ? "text" : "password"}
              {...register("password")}
              id={passwordId}
              placeholder="Enter your password"
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
        I don't remember the password
      </NavLink>
      <div className={css.submitContainer}>
        <button className={css.submitButton}>Sign In</button>
      </div>
      <div className={css.linkContainer}>
        <p>
          Don't have an account?{" "}
          <Link className={css.signUpLink} to={"/signup"}>
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
