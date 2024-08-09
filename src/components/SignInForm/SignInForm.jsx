import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import css from "./SignInForm.module.css";
import Logo from "../../components/Logo/Logo";
import sprite from "../../img/icons/sprite.svg";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async data => {
    try {
      const response = await dispatch({ type: "auth/signIn", payload: data });

      if (response.error) {
        throw new Error(response.error.message);
      }

      localStorage.setItem("token", response.payload.token);
      navigate("/tracker");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.signInContainer}>
      <div className={css.signInForm}>
        <div className={css.formSection}>
          <Logo />
          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <h2 className={css.formTitle}>Sign In</h2>
            <div className={css.inputContainer}>
              <label htmlFor="email" className={css.formLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
                className={`${css["form-control"]} ${
                  errors.email ? css["is-invalid"] : ""
                }`}
              />
              <p className={css.errorMessage}>{errors.email?.message}</p>
            </div>

            <div className={css.inputContainer}>
              <label htmlFor="password" className={css.formLabel}>
                Password
              </label>

              <div className={css.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`${css["form-control"]} ${
                    errors.password ? css["is-invalid"] : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={css.togglePassword}>
                  <svg className={css.svgIcon}>
                    <use
                      xlinkHref={`${sprite}#${
                        showPassword ? "icon-eye" : "icon-eye-off"
                      }`}></use>
                  </svg>
                </button>
              </div>
              <p className={css.errorMessage}>{errors.password?.message}</p>
            </div>
            <NavLink className={css.resetPassword} to="/resetPassword">
              I don&apos;t remember the password
            </NavLink>
            <button type="submit" className={css.btnform}>
              Sign In
            </button>
            <div className={css.spanSignIn}>
              <p>
                Don&apos;t have an account?{" "}
                <a href="/signup" className={css.link}>
                  Sign Up
                </a>
              </p>
            </div>
          </form>
          <div className={css.imageSection}>{/* Place for an image */}</div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
