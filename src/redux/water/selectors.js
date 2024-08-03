// які ще селектори додати?

export const selectWaterCards = state => state.water.cards;
export const selectWaterIsLoading = state => state.water.isLoading;
export const selectWaterIsError = state => state.water.isError;

export const selectMonth = (state) => state.water.selectedMonth;
export const selectDate = (state) => state.water.selectedDate;