import { usersAPI, UserType } from "../../api/usersAPI"
import {BaseThunkType, InferActionsTypes} from "../store"

const initialState = {
    users: [] as UserType[],
    currentPage: 1,
    pageCount: 6, // action creator doesn’t exist
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
        case 'abz/users/SET-NEW-USERS-REQUEST-MODE':
        case 'abz/users/SET-CURRENT-PAGE':
        case 'abz/users/SET-TOTAL-PAGES-COUNT':
        case 'abz/users/SET-LOADING-STATUS':
        case 'abz/users/SET-ERROR-MESSAGE':
            return { ...state, ...action.payload }

        default:
            return state
    }
}


export const usersActions = {
    setUsers: (users: UserType[]) => (
        { type: 'abz/users/SET-USERS', users } as const
    ),
    setNewestUsers: (users: UserType[]) => (
        { type: 'abz/users/SET-NEWEST-USERS', payload: {users} } as const
    ),
    setNewUsersRequestMode: (onlyNewUsersRequestMode: boolean) => (
        { type: 'abz/users/SET-NEW-USERS-REQUEST-MODE', payload: {onlyNewUsersRequestMode} } as const
    ),
    setCurrentPage: (currentPage: number) => (
        { type: 'abz/users/SET-CURRENT-PAGE', payload: {currentPage} } as const
    ),
    setTotalPagesCount: (totalPages: number) => (
        { type: 'abz/users/SET-TOTAL-PAGES-COUNT', payload: {totalPages} } as const
    ),
    setLoadingStatus: (isLoading: boolean) => (
        { type: 'abz/users/SET-LOADING-STATUS', payload: {isLoading} } as const
    ),
    setErrorMessage: (errorMessage: string) => (
        { type: 'abz/users/SET-ERROR-MESSAGE', payload: {errorMessage} } as const
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
                dispatch( usersActions.setNewUsersRequestMode(false) )

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