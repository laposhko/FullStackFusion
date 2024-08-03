// чи потрібні додаткові селектори?

export const selecAuthUser = state =>  state.auth.user;
export const selectAuthToken = state => state.auth.token;
export const selectAuthIsLoading = state => state.auth.isLoading;
export const selectAuthIsLoggedIn = state => state.auth.isLoggedIn;
export const selectAuthIsRefreshing = state => state.auth.isRefreshing;
export const selectAuthIsError = state => state.auth.isError;
