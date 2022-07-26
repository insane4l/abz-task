import React, { ChangeEvent, FC } from 'react'
import './SuperUpload.scss'

export const SuperUpload: FC<SuperUploadPropsType> = React.memo( ({label = '', error, name, onFileUploaded, value = '', onChange, onChangeValue}) => {


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeValue && onChangeValue(e.currentTarget.value)
        
        if(e.target.files?.length) {
            onFileUploaded && onFileUploaded(e.target.files[0])
        }
    }

    // todo: depends of SuperUpload width
    const clippedValue = (value.length > 20) 
        ? `...${value.slice(value.length -20)}`
        : value

    const spanCN = clippedValue ? 'value' : 'placeholder'
    const superUploadFinalCN = 'super-upload' + (error ? ' error' : '')

    
    return (
        <label className={superUploadFinalCN}>
            <input 
                name={name}
                className='super-upload__input'
                value={value}
                onChange={onChangeHandler}
                type="file" />
            
            <div tabIndex={0} className='super-upload__btn'>Upload</div>

            <div className='super-upload__value'>
                <span className={spanCN}>
                    {clippedValue || label}
                </span>
            </div>

            {error && <span className='super-upload__error'>{error}</span>}
        </label>
    )
})


type SuperUploadPropsType = {
    label?: string
    error?: string
    name?: string
    onFileUploaded?: (value: File | undefined) => void
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeValue?: (value: string) => void
}