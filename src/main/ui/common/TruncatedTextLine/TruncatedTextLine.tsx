import React, { createRef, FC, useEffect, useState } from 'react'
import './TruncatedTextLine.scss'

// todo: need code refactoring

/** One line of text. 
 * If the text does not fit, it will be clickable with tooltip  */
export const TruncatedTextLine: FC<TruncatedTextLinePropsType> = React.memo( ({children}) => {

    const textLineDiv = createRef<HTMLDivElement>()
    const [textOverflowed, setTextOverflowed] = useState(false)

    useEffect(() => {
        if (textLineDiv.current) {

            const isOverflowed = checkOverflow(textLineDiv.current)

            setTextOverflowed(isOverflowed)
        }

    }, [])


    const checkOverflow = (el: HTMLDivElement) => {

        let isOverflowed = el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight

        return isOverflowed
    }


    return (
        <>
            {textOverflowed

                ? <Tooltip label={children}>
                    <div ref={textLineDiv} className='truncated-text-line'>
                        {children}
                    </div>
                </Tooltip>

                : <div ref={textLineDiv} className='truncated-text-line'>
                    {children}
                </div>
            }
        </>
    )
})




const Tooltip: FC<TooltipPropsType> = ({label, children}) => {

    const [displayInfo, setInfoDisplay] = useState(false)

    const onClickHandler = () => {
		setInfoDisplay(true)
	}

	const onMouseLeaveHandler = () => {
		setInfoDisplay(false)
	}

    return (
        <div 
            className='tooltip-wrapper'
            onClick={onClickHandler}
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



type TruncatedTextLinePropsType = {
    children: string
}

type TooltipPropsType = {
    label: string
    children: React.ReactNode
}
