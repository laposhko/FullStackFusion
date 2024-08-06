// перевірити що повертає бекенд на кожній операції

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://aquatrackerapp.onrender.com";

// import {

//     requestDeleteWater,
//     requestGetWaterDay,
//     requestGetWaterMonth,

//   } from './services';

export const getCards = createAsyncThunk(
  "water/getcards",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water");
      return response.data;
    } catch (error) {
      toast.error(`Something went wrong in getting cards:${error.message}`);
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
      const response = await axios.post("/water", newCard);
      return response.data;
    } catch (error) {
      toast.error(`Something wrong in adding water card:${error.message}`);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCard = createAsyncThunk(
  "water/update",
  async (cardId, thunkAPI) => {
    try {
      const response = await axios.post(`/water/${cardId}`);
      return response;
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
      const response = await axios.delete(`water/delete/${cardId}`);
      return response.data;
    } catch (error) {
      toast.error(`Something wrong in deleting water card:${error.message}`);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
