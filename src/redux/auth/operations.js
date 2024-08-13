// необхідно додати базовий URL
// додав тостери для помилок, щоб їх ідентифікувати. потрбіно?

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://aquatrackerapp.onrender.com";

export const setAuthHeader = token => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/users/register", newUser);
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      toast.error(`Something went wrong in Sign Up: ${error.message}`);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signin",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", user);
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      // toast.error(`Something went wrong in Sign In: ${error.message}`);
      //we do not need this toast on login page as it has own toast
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk("auth/signout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    toast.error(`Something went wrong in Sign Out: ${error.message}`);
    thunkAPI.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (token, thunkAPI) => {
    try {
      const fullReduxState = thunkAPI.getState();
      const token = fullReduxState.auth.token;
      setAuthHeader(token);
      const response = await axios.post("/users/refresh");
      return response.data.data;
    } catch (error) {
      toast.error(`Something went wrong in Refresh: ${error.message}`);
      thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const fullReduxState = thunkAPI.getState();
      const token = fullReduxState.auth.token;

      return token !== null;
    },
  }
);

export const getCurrentUserInformation = createAsyncThunk(
  "users/getcurrent",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const savedToken = state.auth.token;
      setAuthHeader(savedToken);
      const response = await axios.get("/users/current");
      return response.data.data.user;
    } catch (error) {
      toast.error(
        `Something wrong in current user information: ${error.message}`
      );
      thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const state = thunkAPI.getState();
      return state.auth.token !== null;
    },
  }
);
export const requestResetEmail = createAsyncThunk(
  "auth/resetemail",
  async (userEmail, thunkAPI) => {
    try {
      await axios.post("/users/request-reset-email", userEmail);
      toast.success(
        `A password reset link has been sent to ${userEmail.email}. Please check your email.`
      );
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("The email address is incorrect. Please try again.");
        } else if (error.response.status === 500) {
          toast.error(
            "Something went wrong on the server. Please try again later."
          );
        }
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetpassword",
  async (bodyRequest, thunkAPI) => {
    try {
      await axios.post("users/reset-password", bodyRequest);
    } catch (error) {
      toast.error(`Something went wrong in reset password: ${error.message}`);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
