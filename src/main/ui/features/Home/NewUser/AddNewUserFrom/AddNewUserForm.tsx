import React from 'react'
import { SuperButton } from '../../../../common/SuperButton/SuperButton'
import { SuperInputText } from '../../../../common/SuperInputText/SuperInputText'
import { SuperRadio } from '../../../../common/SuperRadio/SuperRadio'
import { SuperUpload } from '../../../../common/SuperUpload/SuperUpload'
import './AddNewUserForm.scss'


export const AddNewUserForm = () => {


    return (
        <form className='add-new-user-form'>
            <SuperInputText name='name' className='name-field' placeholder='Your name'/>
            <SuperInputText name='email' className='email-field' placeholder='Email'/>
            <SuperInputText name='phone' className='phone-field' placeholder='Phone' helperText='+38 (XXX) XXX - XX - XX'/>

            <div className='new-user-position'>
                <div className='position-list__title'>Select your position</div>

                <div className='position-list'>
                    <SuperRadio name='position' options={[]} value={'stub'} onChangeOption={() => {}} />
                </div>
            </div>

            <div className='upload-input'>
                <SuperUpload name='photo' label='Upload your photo'/>
            </div>
            
            <SuperButton className='add-new-user-form__btn'>Sign up</SuperButton>
        </form>
    )
}
