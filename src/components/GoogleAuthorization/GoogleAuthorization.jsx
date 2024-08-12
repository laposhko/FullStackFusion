import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import {
  googleAuthLink,
  googleAuthConfirm2,
} from "../../redux/auth/operations.js";
import { selectAuthGoogleLink } from "../../redux/auth/selectors.js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import css from "./GoogleAuthorization.module.css";

export default function GoogleAuthorization() {
  const dispatch = useDispatch();
  const { code } = useParams();
  const selectorGoogleLink = useSelector(selectAuthGoogleLink);

  const handleSuccess = () => {
    try {
      dispatch(googleAuthLink());
      //   console.log(selectorGoogleLink);

      if (selectorGoogleLink) {
        window.location.href = selectorGoogleLink;
        // console.log(code);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const confirmGoogleAuth = async () => {
      if (code) {
        try {
          await dispatch(googleAuthConfirm2({ code })).unwrap();
          navigate("/tracker");
        } catch (error) {
          console.error("Error during Google auth confirmation", error);
        }
      }
    };

    confirmGoogleAuth();
  }, [dispatch, code, navigate]);

  return (
    <button type="button" onClick={handleSuccess}>
      google
    </button>
    //   <GoogleLogin
    //   onSuccess={handleSuccess}
    // />
  );
}
