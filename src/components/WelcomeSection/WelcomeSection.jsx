import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import css from "./WelcomeSection.module.css";

export default function WelcomeSection() {
  return (
    <div className={css.welcomeContainer}>
      <Logo />
      <div>
        <p className={css.subtitle}>Record daily water intake and track</p>
        <h1 className={css.mainTitle}>Water consumption tracker</h1>
        <div className={css.buttonBox}>
          <NavLink className={css.linkTry} to="/signup">
            Try tracker
          </NavLink>
          <NavLink className={css.linkSignIn} to="/signin">
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
