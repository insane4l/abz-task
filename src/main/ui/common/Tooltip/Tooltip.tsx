import React, { FC, ReactNode, useState } from 'react'
import './Tooltip.scss'

export const Tooltip: FC<TooltipPropsType> = ({label, children}) => {

    const [displayInfo, setInfoDisplay] = useState(false)

    const onMouseOverHandler = () => {
		setInfoDisplay(true)
	}

	const onMouseLeaveHandler = () => {
		setInfoDisplay(false)
	}

    return (
        <div 
            className='tooltip-wrapper'
            onMouseEnter={onMouseOverHandler}
            onMouseLeave={onMouseLeaveHandler}>
                
            {children}

            {displayInfo 
                && <div className='tooltip'>
                    {label}
                </div>
            }
        </div>
    )
}



type TooltipPropsType = {
    label: string
    children: ReactNode
}