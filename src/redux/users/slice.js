import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./operations";


const getAllUsersSlice = createSlice({
    name: 'users',
    initialState: {
        userQuantity: '',
        isLoading: false,
        isError: false,
    },
    extraReducers: builder => builder.addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userQuantity = action.payload
    })
    .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.isLoading = true;
    })
});

const usersReducer = getAllUsersSlice.reducer;

export default usersReducer;
