import { lazy } from "react";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import { Routes, Route } from "react-router-dom";
import TestModalsPage from "../../pages/TestModalsPage";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const TrackerPage = lazy(() => import("../../pages/TrackerPage/TrackerPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RestrictedRoute component={<HomePage></HomePage>}></RestrictedRoute>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <RestrictedRoute
            component={<SignUpPage></SignUpPage>}
          ></RestrictedRoute>
        }
      ></Route>
      <Route
        path="/signin"
        element={
          <RestrictedRoute
            component={<SignInPage></SignInPage>}
          ></RestrictedRoute>
        }
      ></Route>
      <Route
        path="/tracker"
        element={
          <PrivateRoute component={<TrackerPage></TrackerPage>}></PrivateRoute>
        }
      ></Route>

      <Route
        path="/testModals"
        element={<TestModalsPage></TestModalsPage>}
      ></Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
