import { NavLink } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <p className={css.notFoundContent}>
        Page not found. Return to <br />
        <NavLink className={css.linkHome} to="/">
          Home Page
        </NavLink>
      </p>
    </div>
  );
}
