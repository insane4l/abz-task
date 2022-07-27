import { authAPI, PositionType, RegisterFailsType } from "../../api/authAPI"
import { OptionType } from "../../ui/common/SuperRadio/SuperRadio"
import {BaseThunkType, InferActionsTypes} from "../store"
import { requestUsersTC, usersActions } from "./usersReducer"

const initialState = {
    positions: [] as OptionType[],
    isLoading: { positions: false, registration: false } as LoadingStatusesType,
    registrationSuccess: true,
    errorMessage: '',
    fails: {} as RegisterFailsType,
}

export const authReducer = (state: AuthStateType = initialState,
action: AuthActionsTypes): AuthStateType => {

    switch (action.type) {

        case 'abz/auth/SET-POSITIONS':
            return { 
                ...state, 
                positions: action.positions.map(el => {
                    return {
                        label: el.name,
                        value: `${el.id}`,
                        disabled: false
                    }
                })
            }

        case 'abz/auth/SET-LOADING-STATUSES':
            return { ...state, isLoading: {...state.isLoading, ...action.loadingStatuses} }

        case 'abz/auth/SET-REGISTRATION-SUCCESS':
            return { ...state, registrationSuccess: action.isSuccess }

        case 'abz/auth/SET-ERROR-MESSAGE':
            return { ...state, errorMessage: action.message }

        case 'abz/auth/SET-REGISTRATION-FAILS':
            return { ...state, fails: action.fails }

        default:
            return state
    }
}


export const authActions = {
    setPositions: (positions: PositionType[]) => (
        {type: 'abz/auth/SET-POSITIONS', positions} as const
    ),
    setLoadingStatuses: (loadingStatuses: LoadingStatusesType) => (
        {type: 'abz/auth/SET-LOADING-STATUSES', loadingStatuses} as const
    ),
    setRegistrationSuccess: (isSuccess: boolean) => (
        {type: 'abz/auth/SET-REGISTRATION-SUCCESS', isSuccess} as const
    ),
    setErrorMessage: (message: string) => (
        {type: 'abz/auth/SET-ERROR-MESSAGE', message} as const
    ),
    setRegistrationFails: (fails: RegisterFailsType) => (
        {type: 'abz/auth/SET-REGISTRATION-FAILS', fails} as const
    ),
}


export const requestPositionsTC = (): BaseThunkType<AuthActionsTypes> => 
async (dispatch) => {

    dispatch( authActions.setLoadingStatuses({positions: true}) )

    try {

        const res = await authAPI.getPositions()

        if (res.success) {
            dispatch( authActions.setPositions(res.positions!) )
        }

    } catch (e: any) {
        dispatch( authActions.setErrorMessage(e.response?.data?.message || 'Some error occured') )

    } finally {
        dispatch( authActions.setLoadingStatuses({positions: false}) )
    }
}



export const requestRegistrationTC = (payload: FormData): BaseThunkType<AuthActionsTypes> => 
async (dispatch, getState) => {

    dispatch( authActions.setLoadingStatuses({registration: true}) )
    dispatch( authActions.setErrorMessage('') )
    dispatch( authActions.setRegistrationFails({}) )

    const token = getState().app.token

    try {

        const res = await authAPI.register(payload, token)

        if (res.success) {
            dispatch( authActions.setRegistrationSuccess(true) )
            dispatch( usersActions.setNewUsersRequestMode(true) )
            dispatch( usersActions.setCurrentPage(1) )
            dispatch( requestUsersTC() )
        }
        
    } catch (e: any) {

        dispatch( authActions.setErrorMessage(e.response?.data?.message || 'Some error occured') )

        if (e.response?.data?.fails) {
            dispatch( authActions.setRegistrationFails(e.response.data.fails) )
        }

    } finally {
        dispatch( authActions.setLoadingStatuses({registration: false}) )
    }
}


// types
type AuthStateType = typeof initialState
export type AuthActionsTypes = InferActionsTypes<typeof authActions> 
| ReturnType<typeof usersActions.setNewUsersRequestMode> | ReturnType<typeof usersActions.setCurrentPage>

type LoadingStatusesType = {
    positions?: boolean
    registration?: boolean
}