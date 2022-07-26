import React from 'react'
import { RegistrationForm } from './RegistrationForm/RegistrationForm'
import './Registration.scss'

export const Registration = () => {
    return (
        <section id='registration' className='registration-section'>
            <h2 className='registration-section__title'>Working with POST request</h2>

            <RegistrationForm />
        </section>
    )
}
