import React, { createRef, useEffect, useState } from 'react'
import './UserAvatar.scss'
import defaultAvatar from '../../../../assets/images/defaultAvatar.svg'


export const UserAvatar: React.FC<UserAvatarPropsType> = React.memo( (
{
    userImage, sideLength, altText = 'user image'
}) => {

    const avatarRef = createRef<HTMLDivElement>()
    const [sideAutoLength, setSideAutoLength] = useState<number>()
    const [avatarImage, setAvatarImage] = useState(userImage || defaultAvatar)

    useEffect(() => {
        setSideAutoLength(avatarRef.current!.offsetWidth)
    }, [avatarRef])

    const imgErrorHandler = () => {
        setAvatarImage(defaultAvatar)
    }

    const sizeStyle = sideLength 
        ? { width: (sideLength + 'px'), height: (sideLength + 'px') }
        : { height: (sideAutoLength + 'px') }


    return (
        <div ref={avatarRef} className='user-avatar__wrapper' style={sizeStyle}>
            <img 
                onError={imgErrorHandler}
                className='user-avatar__image'
                src={avatarImage}
                alt={altText}
            />
        </div>
    )
})



type UserAvatarPropsType = {
    userImage?: string | undefined | null
    altText?: string
    /** Side length in pixels 
    * If you don't specify the length of the side: 
    * width will be 100% of parent, height will be equal to width
    */
    sideLength?: number
}
