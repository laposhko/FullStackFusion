
import { createSlice } from "@reduxjs/toolkit";
import { googleAuthorization, refresh, signIn, signOut, signUp } from "./operations";

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
        googleAuthLink: null,
        token: null,
        isLoading: false,
        isLoggedIn: false,
        isRefreshing: false,
        isError: false, 
    },
    extraReducers: builder => builder.addCase(signUp.pending, (state) => {
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
    .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    .addCase(signIn.pending, (state) => {
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
    .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    .addCase(signOut.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
    })
    .addCase(signOut.fulfilled, (state) => {
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
    state.googleAuthLink = null;
    state.token = null;
    state.isLoading = false;
    state.isError = false;
    state.isLoggedIn = false;
    })
    .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
        state.isError = false;
        state.isLoggedIn = false;
    })
    .addCase(refresh.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.token = action.payload;
    })
    .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.isError = true;
    })
    .addCase(googleAuthorization.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
    })
    .addCase(googleAuthorization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.googleAuthLink = action.payload;
    })
    .addCase(googleAuthorization.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
});

const authReducer = authSlice.reducer;

export default authReducer;