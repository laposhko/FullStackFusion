import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useEffect } from "react";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import { Routes, Route, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import {
  getCurrentUserInformation,
  signInGoogle,
} from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const TrackerPage = lazy(() => import("../../pages/TrackerPage/TrackerPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const ResetPassword = lazy(() =>
  import("../../pages/ResetPassword/ResetPassword")
);
const ChangePasswordPage = lazy(() =>
  import("../../pages/ChangePasswordPage/ChangePasswordPage.jsx")
);
import Modals from "../Modal/ModalWindow";
import css from "./App.module.css";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    const processToken = async () => {
      const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(param);
      };

      const accessTokenJWT = getQueryParam("accesstokenjwt");

      if (accessTokenJWT) {
        try {
          const decodedToken = jwtDecode(accessTokenJWT);
          const user = decodedToken.user;
          const accessToken = decodedToken.accessToken;
          const data = { accessToken, user };
          await dispatch(signInGoogle(data)).unwrap();
        } catch (e) {
          console.error(e);
          console.error(t("SignIn.error") || e.message);
        }
      } else {
        dispatch(getCurrentUserInformation());
      }
    };

    processToken();
  }, [dispatch, location.search, t]);

  return (
    <>
      <Toaster
        toastOptions={{
          className: css.toastCssStyles,
          duration: 4000,
          style: {
            marginTop: "24px",
            borderRadius: "10px",
            background: "var(--main-background-color)",
            color: "var(--text-color)",
          },
        }}
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<RestrictedRoute component={<HomePage />} />}
          />
          <Route
            path="/signup"
            element={<RestrictedRoute component={<SignUpPage />} />}
          />
          <Route
            path="/signin"
            element={<RestrictedRoute component={<SignInPage />} />}
          />
          <Route
            path="/tracker"
            element={<PrivateRoute component={<TrackerPage />} />}
          />
          <Route
            path="/resetPassword"
            element={<RestrictedRoute component={<ResetPassword />} />}
          />
          <Route
            path="/changePasswordPage/:token"
            element={<RestrictedRoute component={<ChangePasswordPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
