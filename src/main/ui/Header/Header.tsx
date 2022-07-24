import React from 'react'
import './Header.scss'
import mainLogo from '../../../assets/images/mainLogo.svg'
import { SuperScrollButton } from '../common/SuperButton/SuperScrollButton'


export const Header = React.memo( () => {

    return (
        <header className='app-header'>
            <div className='app-container'>
                <div className='app-header__container'>

                    <a href='#top-anchor'>
                        <img className='app-header__logo' src={mainLogo} alt='main_logo' />
                    </a>

                    <div className='app-header__buttons'>
                        <SuperScrollButton href='#users'>Users</SuperScrollButton>
                        <SuperScrollButton href='#registration'>Sign up</SuperScrollButton>
                    </div>

                </div>
            </div>
		</header>
    )
})
