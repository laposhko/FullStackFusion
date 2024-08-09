import { resetPassword } from "../../redux/auth/operations.js";
import Logo from "../../components/Logo/Logo.jsx";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import * as yup from "yup";
import css from "./ChangePasswordPage.module.css";

let changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = async event => {
    event.preventDefault();

    try {
      await changePasswordSchema.validate({ password });
      dispatch(resetPassword(password));
      toast.success("Password has been changed successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.changePasswordContainer}>
      <div className={css.changePasswordPage}>
        <Logo />
        <h3 className={css.changePasswordTitle}>Create a password</h3>
        <form onSubmit={handleChangePassword} className={css.passwordForm}>
          <div className={css.passwordFieldWrapper}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
            Save new password
          </button>
        </form>
      </div>
    </div>
  );
}
