import { usersAPI, UserType } from "../../api/usersAPI"
import {BaseThunkType, InferActionsTypes} from "../store"

const initialState = {
    users: [] as UserType[],
    currentPage: 1,
    pageCount: 6, // reducer doesn’t exist
    totalPages: 0,
    // totalUsers: 0, if needed you can extend requestUsersTC with reducer (set from api request)
    isLoading: false,
    errorMessage: '',
    onlyNewUsersRequestMode: false,
}

export const usersReducer = (state: UsersStateType = initialState,
action: UsersActionsTypes): UsersStateType => {

    switch (action.type) {

        case 'abz/users/SET-USERS':
            return { ...state, users: [...state.users, ...action.users] }

        case 'abz/users/SET-NEWEST-USERS':
            return { ...state, users: action.users }

        case 'abz/users/SET-NEW-USERS-REQUEST-MODE':
            return { ...state, onlyNewUsersRequestMode: action.onlyNewUsers }

        case 'abz/users/SET-CURRENT-PAGE':
            return { ...state, currentPage: action.page }

        case 'abz/users/SET-TOTAL-PAGES-COUNT':
            return { ...state, totalPages: action.totalPages }

        case 'abz/users/SET-LOADING-STATUS':
            return { ...state, isLoading: action.isLoading }

        case 'abz/users/SET-ERROR-MESSAGE':
            return { ...state, errorMessage: action.message }

        default:
            return state
    }
}


export const usersActions = {
    setUsers: (users: UserType[]) => (
        {type: 'abz/users/SET-USERS', users} as const
    ),
    setNewestUsers: (users: UserType[]) => (
        {type: 'abz/users/SET-NEWEST-USERS', users} as const
    ),
    setNewUsersRequestMode: (onlyNewUsers: boolean) => (
        {type: 'abz/users/SET-NEW-USERS-REQUEST-MODE', onlyNewUsers} as const
    ),
    setCurrentPage: (page: number) => (
        {type: 'abz/users/SET-CURRENT-PAGE', page} as const
    ),
    setTotalPagesCount: (totalPages: number) => (
        {type: 'abz/users/SET-TOTAL-PAGES-COUNT', totalPages} as const
    ),
    setLoadingStatus: (isLoading: boolean) => (
        {type: 'abz/users/SET-LOADING-STATUS', isLoading} as const
    ),
    setErrorMessage: (message: string) => (
        {type: 'abz/users/SET-ERROR-MESSAGE', message} as const
    ),
}


export const requestUsersTC = (): BaseThunkType<UsersActionsTypes> => 
async (dispatch, getState) => {

    dispatch( usersActions.setLoadingStatus(true) )
    const {currentPage, pageCount, onlyNewUsersRequestMode} = getState().users

    try {

        const res = await usersAPI.getUsers({page: currentPage, count: pageCount})

        if (res.success) {

            if (onlyNewUsersRequestMode) {
                dispatch( usersActions.setNewestUsers(res.users!) )

            } else {
                dispatch( usersActions.setUsers(res.users!) )
            }

            dispatch( usersActions.setTotalPagesCount(res.total_pages!) )
            
        }

    } catch (e: any) {
        dispatch( usersActions.setErrorMessage(e.response?.data?.message || 'Some error occured') )

    } finally {
        dispatch( usersActions.setLoadingStatus(false) )
    }
}


// types
type UsersStateType = typeof initialState
export type UsersActionsTypes = InferActionsTypes<typeof usersActions>