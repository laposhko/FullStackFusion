
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://aquatrackerapp.onrender.com";

export const getAllUsers = createAsyncThunk(
  "users/getallusers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users/total");
      return response.data;
    } catch (error) {
      toast.error(`Something wrong in total users amount: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentUserInformation = createAsyncThunk('users/getcurrent', async (_, thunkAPI) =>{
    try {
        const response = await axios.get('/users/current');
        return response.data;
    } catch (error) {
        toast.error(`Something wrong in current user information: ${error.message}`);
        thunkAPI.rejectWithValue(error.message);
    }
});

export const updateCurrentUser = createAsyncThunk('users/updateuser', async(updatedUser, thunkAPI) => {
    try {
        const response = await axios.patch('users/update', updatedUser);
        return response;
    } catch (error) {
        toast.error(`Something wrong in updating current user information: ${error.message}`);
        thunkAPI.rejectWithValue(error.message);
    }
});
