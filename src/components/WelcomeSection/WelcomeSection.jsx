import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Logo from "../Logo/Logo.jsx";
import css from "./WelcomeSection.module.css";

const isRegister = ({ isRegistredState }) => {
  return clsx(css.linkTry, isRegistredState && css.disabled);
};

const isLoggin = ({ isLogginState }) => {
  return clsx(css.linkSignIn, isLogginState && css.disabled);
};

export default function WelcomeSection() {
  return (
    <div className={css.welcomeContainer}>
      <Logo />
      <div>
        <p className={css.subtitle}>Record daily water intake and track</p>
        <h1 className={css.mainTitle}>Water consumption tracker</h1>
        <div className={css.buttonBox}>
          <NavLink className={isRegister} to="/signup">
            Try tracker
          </NavLink>
          <NavLink className={isLoggin} to="/signin">
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
