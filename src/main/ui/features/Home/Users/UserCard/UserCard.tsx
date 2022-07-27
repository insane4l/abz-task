import React, { FC } from 'react'
import { TruncatedTextLine } from '../../../../common/TruncatedTextLine/TruncatedTextLine'
import { UserAvatar } from '../../../../common/UserAvatar/UserAvatar'
import './UserCard.scss'

export const UserCard: FC<UserCardPropsType> = React.memo( ({photo, name, position, email, phone}) => {

    const cardDataArr = [
        // {title: name, link: ''},
        {title: position, link: ''},
        {title: email, link: `mailto:${email}`},
        {title: phone, link: `tel:${phone}`},
    ]

    const mappedFields = cardDataArr.map(el => (
        <TruncatedTextLine key={el.title} linkTo={el.link} >
            {el.title}
        </TruncatedTextLine>
    ))
    
    return (
        <div className='user-card'>
            <div className='avatar-box'>
                <UserAvatar userImage={photo} sideLength={70} />
            </div>


            <div className='user-data__list'>
                <h3>
                    <TruncatedTextLine>
                        {name}
                    </TruncatedTextLine>
                </h3>

                {mappedFields}
            </div>

        </div>
    )
})



type UserCardPropsType = {
    photo: string
    name: string
    position: string
    email: string
    phone: string
}