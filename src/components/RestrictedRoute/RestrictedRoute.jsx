import { useSelector } from "react-redux";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
export default function RestrictedRoute({ component }) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  // const isLoggedIn = false;
  return isLoggedIn ? <Navigate to="/tracker" /> : component;
}
