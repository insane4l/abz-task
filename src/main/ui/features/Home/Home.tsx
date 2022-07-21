import React from 'react'
import './Home.scss'
import { NewUser } from './NewUser/NewUser'
import { Promo } from './Promo/Promo'
import { Users } from './Users/Users'

export const Home = () => {
    return (
        <div className='home-page'>
            <Promo />
            <div className='app-container'>
                <Users />
                <NewUser />
            </div>
        </div>
    )
}