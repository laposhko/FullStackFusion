import { createSlice } from "@reduxjs/toolkit";
import {
  googleAuthLink,
  refresh,
  requestResetEmail,
  resetPassword,
  signIn,
  signOut,
  signUp,
  getCurrentUserInformation,
} from "./operations";
// import { getCurrentUserInformation } from "../users/operations";

// getCurrentUserInformation;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
      gender: null,
      weight: null,
      dailyActivity: null,
      dailyWaterNorm: null,
      avatar: null,
      id: null,
      createdAt: null,
      updatedAt: null,
    },
    googleLink: null,
    token: null,
    isLoading: false,
    isLoggedIn: false,
    isRefreshing: false,
    isError: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUp.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(signIn.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(signOut.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
          gender: null,
          weight: null,
          dailyActivity: null,
          dailyWaterNorm: null,
          avatar: null,
          id: null,
          createdAt: null,
          updatedAt: null,
        };
        state.googleLink = null;
        state.token = null;
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
        state.isError = false;
        state.isLoggedIn = false;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.token = action.payload.refreshToken;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.isError = true;
      })
      .addCase(requestResetEmail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(requestResetEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(requestResetEmail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(googleAuthLink.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(googleAuthLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.googleLink = action.payload;
      })
      .addCase(googleAuthLink.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCurrentUserInformation.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCurrentUserInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUserInformation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      }),
});

const authReducer = authSlice.reducer;

export default authReducer;
