import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  // getCurrentUserInformation,
  updateCurrentUser,
} from "./operations";

const getAllUsersSlice = createSlice({
  name: "users",
  initialState: {
    user: {
      _id: null,
      name: null,
      email: null,
      gender: null,
      weight: null,
      dailyActivityTime: null,
      dailyWaterNorm: null,
      avatar: null,
    },
    userQuantity: "",
    isLoading: false,
    isError: false,
  },
  extraReducers: builder =>
    builder
      .addCase(getAllUsers.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userQuantity = action.payload;
      })
      .addCase(getAllUsers.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })
      // .addCase(getCurrentUserInformation.pending, (state) => {
      //   state.isLoading = true;
      //   state.isError = false;
      // })
      // .addCase(getCurrentUserInformation.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isLoggedIn = true;
      //   state.user = action.payload;
      // })
      // .addCase(getCurrentUserInformation.rejected, (state) => {
      //   state.isLoading = false;
      //   state.isError = true;
      // })
      .addCase(updateCurrentUser.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(updateCurrentUser.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      }),
});

const usersReducer = getAllUsersSlice.reducer;

export default usersReducer;
