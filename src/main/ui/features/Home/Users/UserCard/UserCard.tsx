import React, { FC } from 'react'
import { Tooltip } from '../../../../common/Tooltip/Tooltip'
import { UserAvatar } from '../../../../common/UserAvatar/UserAvatar'
import './UserCard.scss'

export const UserCard: FC<UserCardPropsType> = React.memo( ({photo, name, position, email, phone}) => {

    const mappedFields = [name, position, email, phone].map(el => (
        <Tooltip key={el} label={el}>
            <div className='data-field'>
                {el}
            </div>
        </Tooltip>
    ))
    
    return (
        <li className='user-card'>
            <div className='avatar-box'>
                <UserAvatar userImage={photo} sideLength={70} />
            </div>

            <div className='data-fields'>
                {mappedFields}
            </div>
          
        </li>
    )
})



type UserCardPropsType = {
    photo: string
    name: string
    position: string
    email: string
    phone: string
}