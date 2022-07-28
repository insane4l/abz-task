import React, { createRef, FC, useEffect, useState } from 'react'
import './TruncatedTextLine.scss'

// todo: need code refactoring (remove ts-ignore also)

/** One line of text. 
 * If the text does not fit, it will be clickable with tooltip  */
export const TruncatedTextLine: FC<TruncatedTextLinePropsType> = React.memo( ({children, linkTo}) => {

    const textLineElementRef = createRef<HTMLSpanElement | HTMLAnchorElement>()
    const [textOverflowed, setTextOverflowed] = useState(false)

    useEffect(() => {
        if (textLineElementRef.current) {

            const isOverflowed = checkOverflow(textLineElementRef.current)

            setTextOverflowed(isOverflowed)
        }

    }, [textLineElementRef])


    const checkOverflow = (el: HTMLSpanElement | HTMLAnchorElement) => {

        let isOverflowed = el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight

        return isOverflowed
    }

    const textLineElement = linkTo 
        //@ts-ignore
        ? <a ref={textLineElementRef} href={linkTo} className='truncated-text-line'>
            {children}
        </a>
        //@ts-ignore
        : <span ref={textLineElementRef} className='truncated-text-line'>
            {children}
        </span>


    return (
        <>
            {textOverflowed

                ? <Tooltip label={children}>
                    {textLineElement}
                </Tooltip>

                : textLineElement
            }
        </>
    )
})




const Tooltip: FC<TooltipPropsType> = ({label, children}) => {

    const [displayInfo, setInfoDisplay] = useState(false)

    const onMouseEnterHandler = () => {
		setInfoDisplay(true)
	}

	const onMouseLeaveHandler = () => {
		setInfoDisplay(false)
	}

    return (
        <div 
            className='tooltip-wrapper'
            onMouseEnter={onMouseEnterHandler}
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
    linkTo?: string
}

type TooltipPropsType = {
    label: string
    children: React.ReactNode
}
