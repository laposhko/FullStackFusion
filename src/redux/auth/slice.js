// при операції signIn бекенд по фото повертає лише accessToken. Потрібно щоб повертав інформацію про User, бо немає інформації для state.auth.user 

import { createSlice } from "@reduxjs/toolkit";
import { signIn, signOut, signUp } from "./operations";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: null,
            email: null,
            gender: null,
            weight: null,
            dailyActivity: null,
            dailyWaterNorm: null,
            avatar: null,
            id: null,
            createdAt: null,
            updatedAt: null,
        },
        token: null,
        isLoading: false,
        isLoggedIn: false,
        isRefreshing: false,
        isError: false, 
    },
    extraReducers: builder => builder.addCase(signUp.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
    })
    .addCase(signUp.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
    })
    .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
    })
    .addCase(signIn.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
    })
    .addCase(signIn.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
    })
    .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
    })
    .addCase(signOut.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
    })
    .addCase(signOut.fulfilled, (state, action) => {
       state.user = {
        name: null,
        email: null,
        gender: null,
        weight: null,
        dailyActivity: null,
        dailyWaterNorm: null,
        avatar: null,
        id: null,
        createdAt: null,
        updatedAt: null,
    };
    state.token = null;
    state.isLoading = false;
    state.isError = false;
    state.isLoggedIn = false;
    })
});

const authReducer = authSlice.reducer;

export default authReducer;