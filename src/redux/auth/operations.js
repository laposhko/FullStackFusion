// необхідно додати базовий URL
// додав тостери для помилок, щоб їх ідентифікувати. потрбіно?
// в запиті refresh - пусте тіло з токеном. На фото з бекенду  - тілом має бути name i email, це потрібно перевірити на бекенді. 


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = 'http://localhost:3000';

export const setAuthHeader = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common['Authorization'] = '';
};

export const signUp = createAsyncThunk ('auth/signup', async (newUser, thunkAPI) => {
    try {
        const response = await axios.post('/users/register', newUser);
        setAuthHeader(response.data.accessToken);
        return response.data;
    } catch (error) {
        toast.error(`Something went wrong in Sign Up: ${error.message}`);
        thunkAPI.rejectWithValue(error.message);
    }
});

export const signIn = createAsyncThunk('auth/signin', async (user, thunkAPI) => {
   try {
    const response = await axios.post('/users/login', user);
    setAuthHeader(response.data.accessToken);
   } catch (error) {
    toast.error(`Something went wrong in Sign In: ${error.message}`);
    thunkAPI.rejectWithValue(error.message);
   }
});

export const signOut = createAsyncThunk('auth/signout', async (_, thunkAPI) => {
    try {
        await axios.post('/users/logout');
        clearAuthHeader();
    } catch (error) {
        toast.error(`Something went wrong in Sign Out: ${error.message}`);
        thunkAPI.rejectWithValue(error.message);
    }
});


export const refresh = createAsyncThunk ('auth/refresh', async (token, thunkAPI) => {
    try {
    const fullReduxState = thunkAPI.getState();
    const token = fullReduxState.auth.token;
    setAuthHeader(token);
    const response = await axios.post('/users/refresh');
    return response.data;
    } catch (error) {
        toast.error(`Something went wrong in Refresh: ${error.message}`);
        thunkAPI.rejectWithValue(error.message);
    }
},
{
    condition: (_, thunkAPI) => {
        const fullReduxState = thunkAPI.getState();
        const token = fullReduxState.auth.token;

        return token !== null;
    }
}
);


