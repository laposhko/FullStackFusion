import { lazy, Suspense } from "react";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import { Routes, Route } from "react-router-dom";
import Modals from "../Modal/ModalWindow";
import Loader from "../Loader/Loader.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const TrackerPage = lazy(() => import("../../pages/TrackerPage/TrackerPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

export default function App() {
  return (
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Modals />
    </Suspense>
  );
}
