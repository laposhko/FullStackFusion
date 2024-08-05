// необхідно додати базовий URL

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// axios.defaults.baseURL = 'http://localhost3000';
 axios.defaults.baseURL = 'https://aquatrackerapp.onrender.com'

export const getAllUsers = createAsyncThunk('users/getallusers', async(_, thunkAPI) => {
try {
    const response = await axios.get('/users/total');
return response.data
} catch (error) {
    toast.error(`Something wrong in total users amount: ${error.message}`);
    thunkAPI.rejectWithValue(error.message);
}
})