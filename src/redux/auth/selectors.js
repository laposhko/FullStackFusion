// чи потрібні додаткові селектори?

export const selectUser = state =>  state.auth.user;
export const selectToken = state => state.auth.token;
export const selectIsLoading = state => state.auth.isLoading;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsError = state => state.auth.isError;
