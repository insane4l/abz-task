import React, { ChangeEvent, FC, useState } from 'react'
import './SuperUpload.scss'

export const SuperUpload: FC<SuperUploadPropsType> = React.memo( ({label = '', error, name, onFileUploaded, value = '', onChange, onChangeValue}) => {

    const [fileName, setFileName] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeValue && onChangeValue(e.currentTarget.value)
        
        if(e.target.files?.length) {
            onFileUploaded && onFileUploaded(e.target.files[0])

            setFileName(e.target.files[0].name)
        }
    }

    // todo: depends of SuperUpload width
    const clippedFileName = (fileName.length > 20) 
        ? `...${fileName.slice(fileName.length -20)}`
        : fileName

    const spanCN = clippedFileName ? 'value' : 'placeholder'
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
                    {clippedFileName || label}
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