import React, {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from 'react'
import './SuperButton.scss'


export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        className,
        rounded = true,
        ...restProps
    }
) => {

    const finalClassName = 'super-btn'
        + (rounded ? ' rounded' : '')
        + (className ? ` ${className}` : '')


    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}



type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
& {children?: ReactNode}

type SuperButtonPropsType = DefaultButtonPropsType & {
    rounded?: boolean
}