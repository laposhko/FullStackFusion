import { createSlice } from "@reduxjs/toolkit";
import {
  createCard,
  deleteCard,
  getWaterDayInfo,
  getWaterMonthInfo,
  updateCard,
} from "./operations";
import { signOut } from "../auth/operations";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    dayItems: [],
    dayWaterAmount: [],
    dayTotal: null,
    monthItems: [],
    monthTotalItems: [],
    monthWaterAmount: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getWaterDayInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getWaterDayInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.dayItems = action.payload.items;
        state.dayWaterAmount = action.payload.waterAmount;
        state.dayTotal = action.payload.total;
      })
      .addCase(getWaterDayInfo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getWaterMonthInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getWaterMonthInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.monthItems = action.payload.items;
        state.monthTotalItems = action.payload.totalItems;
        state.monthWaterAmount = action.payload.waterAmount;
      })
      .addCase(getWaterMonthInfo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createCard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cards = action.payload;
      })
      .addCase(createCard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateCard.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateCard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.dayItems = [];
        state.dayWaterAmount = [];
        state.dayTotal = [];
        state.monthItems = [];
        state.monthTotalItems = [];
        state.monthWaterAmount = [];
      })
      .addCase(signOut.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      }),
});

const waterReducer = waterSlice.reducer;

export default waterReducer;
