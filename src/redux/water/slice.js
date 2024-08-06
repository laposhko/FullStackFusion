import { createSlice } from "@reduxjs/toolkit";
import { createCard, deleteCard, getCards, updateCard } from "./operations";
import { signOut } from "../auth/operations";


const waterSlice = createSlice({
    name: 'water',
    initialState: {
        cards: [],
        isLoading: false,
        isError: false,
    },
    extraReducers: builder => builder.addCase(getCards.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cards = action.payload;
    })
    .addCase(getCards.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    .addCase(createCard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    . addCase(createCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cards = action.payload;
    })
    .addCase(createCard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(updateCard.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
    })
    .addCase(updateCard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(deleteCard.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
    })
    .addCase(signOut.pending, (state)=> {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.cards = [];
    })
    .addCase(signOut.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
});


const waterReducer = waterSlice.reducer;

export default waterReducer;
