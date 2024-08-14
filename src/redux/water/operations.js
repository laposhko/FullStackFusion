// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiInstance } from "../auth/operations";
// axios.defaults.baseURL = "https://aquatrackerapp.onrender.com";

// import {

//     requestDeleteWater,
//     requestGetWaterDay,
//     requestGetWaterMonth,

//   } from './services';

export const getWaterDayInfo = createAsyncThunk(
  "water/getwaterdayinfo",
  async (date, thunkAPI) => {
    try {
      const response = await apiInstance.get(`/water/day?date=${date}`);
      return response.data.data;
    } catch (error) {
      toast.error(
        `Something went wrong in getting Water day Info:${error.message}`
      );
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

export const getWaterMonthInfo = createAsyncThunk(
  "water/getwatermonthinfo",
  async (month, thunkAPI) => {
    try {
      const response = await apiInstance.get(`/water/month?date=${month}`);
      return response.data.data;
    } catch (error) {
      toast.error(
        `Something went wrong in getting Month day Info:${error.message}`
      );
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

export const createCard = createAsyncThunk(
  "water/createcard",
  async (newCard, thunkAPI) => {
    try {
      const response = await apiInstance.post("/water", newCard);
      return response.data.data;
    } catch (error) {
      toast.error(`Something wrong in adding water card:${error.message}`);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCard = createAsyncThunk(
  "water/update",
  async (newData, thunkAPI) => {
    try {
      const response = await apiInstance.patch(`/water/${newData._id}`, {
        volume: newData.volume,
        date: newData.date,
      });
      return response.data.data;
    } catch (error) {
      toast.error(`Something wrong in updating water card:${error.message}`);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "water/deletecard",
  async (cardId, thunkAPI) => {
    try {
      await apiInstance.delete(`water/${cardId}`);
      return cardId;
    } catch (error) {
      toast.error(`Something wrong in deleting water card:${error.message}`);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
