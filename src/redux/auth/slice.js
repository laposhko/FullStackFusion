import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: null,
            email: null,
        },
        token: null,
        isLoggedIn: false,
        isRefreshin: false,
        isError: false, 
    },
    extraReducers: builder => builder.addCase()
});

const authReducer = authSlice.reducer;

export default authReducer;