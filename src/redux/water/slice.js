import { createSlice } from "@reduxjs/toolkit";
import {
  createCard,
  deleteCard,
  getWaterDayInfo,
  getWaterMonthInfo,
  updateCard,
} from "./operations";
import { signOut } from "../auth/operations";
import { convertDateIntoStringFormat } from "../../helpers/convertDateFormatForActiveDay";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    activeDay: convertDateIntoStringFormat(new Date()),
    dayItems: [],
    dayWaterAmount: [],
    dayTotal: null,
    monthItems: [],
    monthTotalItems: [],
    monthWaterAmount: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    setActiveDay(state, action) {
      state.activeDay = action.payload;
    },
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

        if (
          action.payload.waterAmount &&
          action.payload.waterAmount.length > 0
        ) {
          state.dayWaterAmount = action.payload.waterAmount;
        } else {
          state.dayWaterAmount = [{}];
        }

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
        state.dayItems.push(action.payload);
        state.monthItems.push(action.payload);
        state.dayWaterAmount[0].dayAmount =
          state.dayWaterAmount[0].dayAmount + action.payload.volume;
      })
      .addCase(createCard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const { _id, ...newData } = action.payload;
        const indexinDay = state.dayItems.findIndex(
          (element) => element._id === _id
        );
        state.dayWaterAmount[0].dayAmount =
          state.dayWaterAmount[0].dayAmount -
          state.dayItems[indexinDay].volume +
          action.payload.volume;
        if (indexinDay !== -1) {
          state.dayItems[indexinDay] = {
            ...state.dayItems[indexinDay],
            ...newData,
          };
        }
        const indexinMonth = state.monthItems.findIndex(
          (element) => element._id === _id
        );
        if (indexinMonth !== -1) {
          state.monthItems[indexinMonth] = {
            ...state.monthItems[indexinMonth],
            ...newData,
          };
        }
      })
      .addCase(updateCard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const cardToDelete = state.dayItems.find((item) => {
          return item._id === action.payload;
        });
        state.dayWaterAmount[0].dayAmount =
          state.dayWaterAmount[0].dayAmount - cardToDelete.volume;
        state.dayItems = state.dayItems.filter(
          (item) => item._id !== action.payload
        );
        state.monthItems = state.monthItems.filter(
          (item) => item._id !== action.payload
        );
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

export const { setActiveDay } = waterSlice.actions;
export default waterReducer;
