import React from 'react'
import { RegistrationForm } from './RegistrationForm/RegistrationForm'
import './Registration.scss'
import { useAppSelector } from '../../../../bll/store'
import { RegistrationSuccess } from './RegistrationSuccess/RegistrationSuccess'
import { authSelectors } from '../../../../bll/selectors/selectors'

export const Registration = () => {

    const registrationSuccess = useAppSelector(authSelectors.getRegistrationSuccess)

    return (
        <section id='registration' className='registration-section'>
            
            

            {registrationSuccess
                ? <>
                    <h2 className='registration-section__title'>User successfully registered</h2>
                    <RegistrationSuccess />
                </>

                : <>
                    <h2 className='registration-section__title'>Working with POST request</h2>
                    <RegistrationForm />
                </>
            }

        </section>
    )
}
