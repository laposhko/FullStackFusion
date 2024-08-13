import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { setToken } from "./slice";
export const apiInstance = axios.create({
  baseURL: "https://aquatrackerapp.onrender.com",
  withCredentials: true, // Додає cookie до кожного запиту
  headers: {
    "Content-Type": "application/json",
  },
});
axios.defaults.withCredentials = true;

export const setAuthHeader = (token) => {
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  apiInstance.defaults.headers.common["Authorization"] = "";
  // axios.defaults.headers.common["Authorization"] = "";
};

export const setupAxiosInterceptors = (store) => {
  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axios.post("/users/refresh");
          const accessToken = response.data.data.accessToken;
          setAuthHeader(accessToken);

          store.dispatch(setToken({ token: accessToken }));
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return apiInstance(originalRequest);
        } catch (error) {
          // console.log("error in refresh request", error);
        }
      }
      return Promise.reject("refresh faild", error);
    }
  );
};
export const signUp = createAsyncThunk(
  "auth/signup",
  async (newUser, thunkAPI) => {
    try {
      const response = await apiInstance.post("/users/register", newUser);
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
      const response = await apiInstance.post("/users/login", user);
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
    await apiInstance.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    clearAuthHeader();
    toast.error(`Something went wrong in Sign Out: ${error.message}`);
    thunkAPI.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await apiInstance.post("/users/refresh");
      setAuthHeader(response.data.data.accessToken);
      return response.data.data.accessToken;
    } catch (error) {
      // clearAuthHeader();
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
      const response = await apiInstance.get("/users/current", {
        withCredentials: false,
      });
      return response.data.data.user;
    } catch (error) {
      // toast.error(
      //   `Something wrong in current user information: ${error.message}`
      // );
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
      await apiInstance.post("/users/request-reset-email", userEmail);
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

export const googleAuthLink = createAsyncThunk(
  "auth/googleauth",
  async (_, thunkAPI) => {
    try {
      const response = await apiInstance.get("/auth/get-oauth-url");
      return response.data;
    } catch (error) {
      toast.error(
        `Something went wrong in google authorization: ${error.message}`
      );
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetpassword",
  async (bodyRequest, thunkAPI) => {
    try {
      await apiInstance.post("users/reset-password", bodyRequest);
    } catch (error) {
      toast.error(`Something went wrong in reset password: ${error.message}`);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateCurrentUser = createAsyncThunk(
  "users/updateuser",
  async (updatedUser, thunkAPI) => {
    try {
      const response = await apiInstance.patch("users/update", updatedUser);
      return response.data.data.updatedResult;
    } catch (error) {
      toast.error(
        `Something wrong in updating current user information: ${error.message}`
      );
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
