import React from 'react'
import { AddNewUserForm } from './AddNewUserFrom/AddNewUserForm'
import './NewUser.scss'

export const NewUser = () => {
    return (
        <section className='new-user-section'>
            <h2 className='new-user-section__title'>Working with POST request</h2>

            <AddNewUserForm />
        </section>
    )
}
