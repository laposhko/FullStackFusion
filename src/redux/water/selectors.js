// які ще селектори додати?

export const selectWaterState = state => state.water;
export const selectActiveDay = state => state.water.activeDay;
export const selectDayItems = state => state.water.dayItems;
export const selectMonthItems = state => state.water.monthItems;
export const selectMonthTotalItems = state => state.water.monthTotalItems;
export const selectMonthWaterAmount = state => state.water.monthWaterAmount;
export const selectIsLoading = state => state.water.isLoading;
export const selectIsError = state => state.water.isError;

export const dayWaterAmount = state => state.water.dayWaterAmount;
