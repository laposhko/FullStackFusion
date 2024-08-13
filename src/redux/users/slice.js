import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./operations";

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
  extraReducers: (builder) =>
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userQuantity = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      }),
});

const usersReducer = getAllUsersSlice.reducer;

export default usersReducer;
