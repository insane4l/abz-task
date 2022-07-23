import React from 'react'
import './Header.scss'
import mainLogo from '../../../assets/images/mainLogo.svg'
import { SuperButton } from '../common/SuperButton/SuperButton'


export const Header = React.memo( () => {

    return (
        <header className='app-header'>
            <div className='app-container'>
                <div className='app-header__container'>

                    <img className='app-header__logo' src={mainLogo} alt='main_logo' />

                    <div className='app-header__buttons'>
                        <SuperButton>Users</SuperButton>
                        <SuperButton>Sign up</SuperButton>
                    </div>

                </div>
            </div>
		</header>
    )
})
