import { authAPI } from "../../api/authAPI"
import {BaseThunkType, InferActionsTypes} from "../store"

const initialState = {
    token: '',
    isLoading: false,
    errorMessage: '',
}

export const appReducer = (state: AppStateType = initialState,
action: AppActionsTypes): AppStateType => {

    switch (action.type) {

        case 'abz/app/SET-TOKEN':
        case 'abz/app/SET-LOADING-STATUS':
        case 'abz/app/SET-ERROR-MESSAGE':
            return { ...state, ...action.payload }

        default:
            return state
    }
}


export const appActions = {
    setToken: (token: string) => (
        {type: 'abz/app/SET-TOKEN', payload: {token} } as const
    ),
    setLoadingStatus: (isLoading: boolean) => (
        {type: 'abz/app/SET-LOADING-STATUS', payload: {isLoading} } as const
    ),
    setErrorMessage: (errorMessage: string) => (
        {type: 'abz/app/SET-ERROR-MESSAGE', payload: {errorMessage} } as const
    ),
}


export const requestTokenTC = (): BaseThunkType<AppActionsTypes> => 
async (dispatch) => {

    dispatch( appActions.setLoadingStatus(true) )

    try {

        const res = await authAPI.getToken()

        if (res.success) {
            dispatch( appActions.setToken(res.token) )
        }

    } catch (e: any) {
        dispatch( appActions.setErrorMessage(e.response?.data?.message || 'Some error occured') )

    } finally {
        dispatch( appActions.setLoadingStatus(false) )
    }
}



// types
type AppStateType = typeof initialState
export type AppActionsTypes = InferActionsTypes<typeof appActions>
