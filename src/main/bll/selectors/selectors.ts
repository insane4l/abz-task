import { AppRootStateType } from "../store";

// app selectors
export const appSelectors = {
    getToken: (state: AppRootStateType) => state.app.token,
    getIsLoading: (state: AppRootStateType) => state.app.isLoading,
    getErrorMessage: (state: AppRootStateType) => state.app.errorMessage,
}

// auth selectors
export const authSelectors = {
    getPositions: (state: AppRootStateType) => state.auth.positions,
    getRegistrationSuccess: (state: AppRootStateType) => state.auth.registrationSuccess,
    getIsPositionsLoading: (state: AppRootStateType) => state.auth.isLoading.positions,
    getIsRegistrationLoading: (state: AppRootStateType) => state.auth.isLoading.registration,
    getErrorMessage: (state: AppRootStateType) => state.auth.errorMessage,
    getFails: (state: AppRootStateType) => state.auth.fails,
}

// users selectors
export const usersSelectors = {
    getUsers: (state: AppRootStateType) => state.users.users,
    getCurrentPage: (state: AppRootStateType) => state.users.currentPage,
    getPageCount: (state: AppRootStateType) => state.users.pageCount,
    getTotalPages: (state: AppRootStateType) => state.users.totalPages,
    getUsersRequestMode: (state: AppRootStateType) => state.users.onlyNewUsersRequestMode,
    getIsLoading: (state: AppRootStateType) => state.users.isLoading,
    getErrorMessage: (state: AppRootStateType) => state.users.errorMessage,
}