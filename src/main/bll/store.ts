import {createStore, combineReducers, applyMiddleware, Action} from 'redux'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import { UsersActionsTypes, usersReducer } from './reducers/usersReducer'
import { AuthActionsTypes, authReducer } from './reducers/authReducer'
import { AppActionsTypes, appReducer } from './reducers/appReducer'


const rootReducer = combineReducers({
    app: appReducer,
    users: usersReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export const useAppDispatch = () => useDispatch<DispatchActionType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store // todo: remove



// types

type AppRootActionsType = AppActionsTypes | UsersActionsTypes | AuthActionsTypes

export type AppRootStateType = ReturnType<typeof rootReducer>
export type DispatchActionType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, unknown, A>