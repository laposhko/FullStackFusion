import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useEffect } from "react";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import { Routes, Route } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import {
  getCurrentUserInformation,
  refresh,
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

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserInformation());
    // setInterval(() => {
    //   dispatch(refresh());
    // }, 5000);
  }, [dispatch]);

  // useEffect(() => {
  // setInterval(()=>{
  //   dispatch()
  // }, 5000)
  // }, []);

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
