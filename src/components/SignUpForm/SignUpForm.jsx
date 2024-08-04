import * as Yup from "yup";
import { useId } from "react";
import { useForm } from "react-hook-form";

import style from "./SignUpForm.module.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(6, "Password shoud not be less than 5 symbols")
    .required("Password field is required"),
  repeatedPassword: Yup.string()
    .matches(Yup.ref("password"), "Passwords does not match")
    .required("Repeat password field is required"),
});

const SignUpForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log("Your data", data);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={style.formName}>Sign Up</div>
      <div className={style.inputContainer}>
        <div className={style.input}>
          <label className={style.title} htmlFor={emailId}>
            Email
          </label>
          <input type="email" {...register("email")} id={emailId} />
        </div>
        <div className={style.input}>
          <label className={style.title} htmlFor={passwordId}>
            Password
          </label>
          <input type="password" {...register("password")} id={passwordId} />
        </div>
        <div className={style.input}>
          <label className={style.title} htmlFor={repeatPasswordId}>
            Repeat Password
          </label>
          <input
            type="password"
            {...register("repeatedPassword")}
            id={repeatPasswordId}
          />
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
