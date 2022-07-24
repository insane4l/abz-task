import React, { FC, ReactNode } from 'react'
import './SuperButton.scss'


/** Just a simple link with SupperButton style */
/** Temporary solution for now there is no app navigation routes */
export const SuperScrollButton: FC<SuperScrollButtonPropsType> = ({children, href}) => {
    return (
        <a className='super-btn rounded' href={href}>{children}</a>
    )
}



type SuperScrollButtonPropsType = {
    children: ReactNode
    href: string
}
