import React from 'react'
import { UserAvatar } from '../../../../common/UserAvatar/UserAvatar'
import './UserCard.scss'

export const UserCard = React.memo( () => {
    return (
        <li className='user-card'>
            <div className='data-field'>
                <UserAvatar />
            </div>

            <div className='data-field'>
                <div className='user-card__name'></div>
            </div>

            <div className='data-field'>
                <div className='user-card__position'></div>
                <div className='user-card__email'></div>
                <div className='user-card__tel'></div>
            </div>
        </li>
    )
})
