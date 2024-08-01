// import { useSelector } from "react-redux";
// import { selectLoginStatus } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
export default function RestrictedRoute({ component }) {
  // const isLoggedIn = useSelector(selectLoginStatus);
  const isLoggedIn = false;
  return isLoggedIn ? <Navigate to="/contacts" /> : component;
}
