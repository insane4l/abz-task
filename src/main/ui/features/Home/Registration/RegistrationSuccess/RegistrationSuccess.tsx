import React from 'react'
import successImage from '../../../../../../assets/images/registrationSuccess.svg'
import { authActions } from '../../../../../bll/reducers/authReducer'
import { useAppDispatch } from '../../../../../bll/store'
import './RegistrationSuccess.scss'


export const RegistrationSuccess = () => {

    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch( authActions.setRegistrationSuccess(false) )
    }

    return (
        <div className='registration-success__wrapper' onClick={onClickHandler}>
            <img className='registration-success__img' src={successImage} alt='registration success'/>
        </div>
    )
}
