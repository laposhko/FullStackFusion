import { useSelector } from "react-redux";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component }) {
  const isLoggenIn = useSelector(selectAuthIsLoggedIn);
  // const isLoggenIn = true;
  return isLoggenIn ? component : <Navigate to="/" />;
}
