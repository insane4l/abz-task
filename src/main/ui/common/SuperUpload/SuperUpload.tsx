import React, { ChangeEvent, FC, useState } from 'react'
import './SuperUpload.scss'

export const SuperUpload: FC<SuperUploadPropsType> = React.memo( ({label = '', error, name, setUploadedFile}) => {

    const [inputValue, setInputValue] = useState('')
    

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setInputValue(e.currentTarget.value)
        
        if(e.target.files?.length) {
            setUploadedFile && setUploadedFile(e.target.files[0])
        }
    }

    // todo: depends of SuperUpload width
    const clippedValue = (inputValue.length > 20) 
        ? `...${inputValue.slice(inputValue.length -20)}`
        : inputValue

    const spanCN = clippedValue ? 'value' : 'placeholder'
    const superUploadFinalCN = 'super-upload' + (error ? ' error' : '')

    
    return (
        <label className={superUploadFinalCN}>
            <input 
                name={name}
                className='super-upload__input'
                value={inputValue}
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
    setUploadedFile?: (value: File | undefined) => void
}