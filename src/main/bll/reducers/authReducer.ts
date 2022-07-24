// import { GetUsersRequestParamsType, usersAPI, UserType } from "../../api/usersAPI"
// import {BaseThunkType, InferActionsTypes} from "../store"

// const initialState = {
//     users: [] as UserType[],
//     currentPage: 1,
//     pageCount: 6,
//     isLoading: false,
// }

// export const usersReducer = (state: UsersStateType = initialState,
// action: UsersActionsTypes): UsersStateType => {
    
//     switch (action.type) {

//         case 'abz/users/SET-USERS':
//             return { ...state, users: action.users }

//         case 'abz/users/SET-LOADING-STATUS':
//             return { ...state, isLoading: action.isLoading }

//         default:
//             return state
//     }
// }


// export const usersActions = {
//     setUsers: (users: UserType[]) => (
//         {type: 'abz/users/SET-USERS', users} as const
//     ),
//     setLoadingStatus: (isLoading: boolean) => (
//         {type: 'abz/users/SET-LOADING-STATUS', isLoading} as const
//     ),
// }


// export const requestUsersTC = (params: GetUsersRequestParamsType): BaseThunkType<UsersActionsTypes> => 
// async (dispatch) => {

//     dispatch( usersActions.setLoadingStatus(true) )

//     try {
//         const res = await usersAPI.getUsers(params)


//     } catch (e: any) {


//     } finally {
//         dispatch( usersActions.setLoadingStatus(false) )
//     }
// }


// // types
// type UsersStateType = typeof initialState
// export type UsersActionsTypes = InferActionsTypes<typeof usersActions>