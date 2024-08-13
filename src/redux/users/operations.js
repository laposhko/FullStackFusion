import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
// import { setAuthHeader } from "../auth/operations";
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

// export const getCurrentUserInformation = createAsyncThunk(
//   "users/getcurrent",
//   async (_, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const savedToken = state.auth.token;
//       setAuthHeader(savedToken);
//       const response = await axios.get("/users/current");
//       return response.data.data;
//     } catch (error) {
//       toast.error(
//         `Something wrong in current user information: ${error.message}`
//       );
//       thunkAPI.rejectWithValue(error.message);
//     }
//   },
//   {
//     condition(_, thunkAPI) {
//       const state = thunkAPI.getState();
//       return state.auth.token !== null;
//     },
//   }
// );

export const updateCurrentUser = createAsyncThunk(
  "users/updateuser",
  async (updatedUser, thunkAPI) => {
    try {
      console.log(updatedUser);
      const response = await axios.patch("users/update", updatedUser, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data.updatedResult);
      return response.data.data.updatedResult;
    } catch (error) {
      toast.error(
        `Something wrong in updating current user information: ${error.message}`
      );
      thunkAPI.rejectWithValue(error.message);
    }
  }
);


