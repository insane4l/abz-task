import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useMemo, useState} from 'react'
import './SuperInputText.scss'


export const SuperInputText: React.FC<SuperInputTextPropsType> = React.memo( (
    {
        type, // we block type property here (we dont use this later)
        onChange, onChangeText,
        onKeyPress, onEnter,
        label = '',
        labelBG = '',
        helperText = '',
        error = '',
        className = '', inputClassName = '', spanClassName = '',

        ...restProps // all other props
    }
) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // if onChange (default input property) exist
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const finalWrapperCN = 'super-input-text__wrapper ' + (error ? 'error' : '') + ' ' + className
    const finalInputCN = 'super-input-text ' + inputClassName
    const finalSpanCN = 'helper-text ' + spanClassName
    const labelStyle = useMemo(() => ( 
        labelBG ? {backgroundColor: labelBG} : {}
    ), [labelBG])

    return (
        <div className={finalWrapperCN}>
            <label>
                {label && <span style={labelStyle} className='label-text'>{label}</span> }
                <input
                    type='text'
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputCN}

                    {...restProps} // other default input props
                />
            </label>
            <span className={finalSpanCN}>{error || helperText}</span>
        </div>
    )
})



type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    label?: string
    labelBG?: string
    helperText?: string
    error?: string
    inputClassName?: string
    spanClassName?: string
}