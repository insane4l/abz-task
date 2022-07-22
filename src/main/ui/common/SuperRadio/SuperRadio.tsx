import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import './SuperRadio.scss'


export const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption, labelClassName = '',
        ...restProps
    }
) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeOption && onChangeOption(e.currentTarget.value)
    }


    const mappedOptions = options ? options.map((o, i) => {

        const disabledLabelClass = o.disabled ? 'super-radio_disabled' : ''
        const selectedLabelClass = value === o.value ? 'active' : ''
        const finalLabelCN = `super-radio ${selectedLabelClass} ${disabledLabelClass} ${labelClassName}`
        
        return (
            <label key={name + '-' + i} className={finalLabelCN}>
                <input
                    type={'radio'}
                    name={name}
                    value={o.value}
                    checked={value === o.value}
                    disabled={o.disabled}
                    onChange={onChangeCallback}
                    {...restProps}
                />
                {o.label}
            </label>
        )
    }) : [] // if options did not come from the server

    return (
        <>
            {mappedOptions}
        </>
    )
}



type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type OptionType = {
    label: string
    value: string
    disabled: boolean
}

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: OptionType[]
    labelClassName?: string
    onChangeOption?: (value: string) => void
}