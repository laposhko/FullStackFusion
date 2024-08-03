// необхідно додати базовий URL та перевірити шляхи
// перевірити що повертає бекенд на кожній операції


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = 'http://localhost3000';

import {
    
    requestDeleteWater,
    requestGetWaterDay,
    requestGetWaterMonth,
    
  } from './services';
  

export const getCards = createAsyncThunk('water/getcards', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/water');
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
    }
});

export const createCard = createAsyncThunk('water/createcard', async(newCard, thunkAPI) => {
    try {
        const response = await axios.post('water/addcard', newCard);
    return response.data;
    } catch (error) {
        toast.error(`Something wrong in adding water card:${error.message}`);
        thunkAPI.rejectWithValue(error.message);
    }
});

export const updateCard = createAsyncThunk('water/update', async (updatedCard, thunkAPI) => {
    try {
        const response = await axios.post('water/updatecard', updateCard);
    return response;
    } catch (error) {
        toast.error(`Something wrong in updating water card:${error.message}`);
        thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteCard = createAsyncThunk('water/deletecard', async (id, thunkAPI) => {
    try {
       const response = await axios.delete(`water/delete/${id}`);
       return response.data; 
    } catch (error) {
        toast.error(`Something wrong in deleting water card:${error.message}`);
        thunkAPI.rejectWithValue(error.message);
    }
});



  // export const apiGetWaterMonth = createAsyncThunk(
  //   'water/getWaterMonth',
  //   async (date, thunkAPI) => {
  //     try {
  //       const response = await requestGetWaterMonth(date);
  //       return response.daysInMonth;
  //     } catch (error) {
  //       return thunkAPI.rejectWithValue(error.message);
  //     }
  //   }
  // );

  // export const apiGetWaterDay = createAsyncThunk(
  //   'water/getWaterDay',
  //   async (day, thunkAPI) => {
  //     try {
  //       const response = await requestGetWaterDay(day);
  //       return response;
  //     } catch (error) {
  //       return thunkAPI.rejectWithValue(error.message);
  //     }
  //   }
  // );
