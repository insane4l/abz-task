import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { validateField, validateUpload } from '../../../../../../utils/fieldValidators'
import { useAppDispatch, useAppSelector } from '../../../../../bll/store'
import { SuperButton } from '../../../../common/SuperButton/SuperButton'
import { SuperInputText } from '../../../../common/SuperInputText/SuperInputText'
import { SuperRadio } from '../../../../common/SuperRadio/SuperRadio'
import { SuperUpload } from '../../../../common/SuperUpload/SuperUpload'
import './RegistrationForm.scss'
import { authActions, requestPositionsTC, requestRegistrationTC } from '../../../../../bll/reducers/authReducer'
import { Preloader } from '../../../../common/Preloader/Preloader'
import { RegisterFailsType } from '../../../../../api/authAPI'
import { authSelectors } from '../../../../../bll/selectors/selectors'


export const RegistrationForm = React.memo( () => {

    const dispatch = useAppDispatch()
    const isPositionsLoading = useAppSelector(authSelectors.getIsPositionsLoading)
    const isRegistrationLoading = useAppSelector(authSelectors.getIsRegistrationLoading)
    const responseError = useAppSelector(authSelectors.getErrorMessage)
    const responseFails = useAppSelector(authSelectors.getFails)
    const positions = useAppSelector(authSelectors.getPositions)

    const [imageFile, setImageFile] = useState<File>()


    const responseFailsKeys = Object.keys(responseFails) as Array<keyof RegisterFailsType>
    let mappedResponseFails

    if (responseFailsKeys.length) {

        mappedResponseFails = responseFailsKeys.map(key => {
            let messages = responseFails[key]

            return messages?.length 
                ? <div key={key} className='registration-form__error'>*{messages[0]}</div>
                : undefined
        })
    }


    useEffect(() => {
        dispatch( requestPositionsTC() )
    }, [dispatch])

    
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            position_id: '',
            photo: '' as string | undefined,
        },

        initialStatus: {
            photoError: 'Photo is required'
        },

        validate: (values) => {
            const errors: {email?: string} = {}

            // cleanup after onsubmit & error from server, 
            dispatch( authActions.setErrorMessage('') )

            validateField.required(values.name, errors, 'name')
            validateField.minLength(values.name, errors, 'name', 2)
            validateField.maxLength(values.name, errors, 'name', 60)

            validateField.required(values.email, errors, 'email')
            validateField.minLength(values.email, errors, 'email', 2)
            validateField.maxLength(values.email, errors, 'email', 100)
            validateField.isEmail(values.email, errors, 'email')

            validateField.required(values.phone, errors, 'phone')
            validateField.isPhone(values.phone, errors, 'phone')

            validateField.required(values.position_id, errors, 'position_id')

            return errors
        },

        onSubmit: (values) => {

            if (!formik.status?.photoError && imageFile) {
                
                let formData = new FormData()
                formData.append('position_id', values.position_id)
                formData.append('name', values.name)
                formData.append('email', values.email)
                formData.append('phone', values.phone)
                formData.append('photo', imageFile)

                dispatch( requestRegistrationTC(formData) )
            }
        },
    })



    const validateUploadFile = (file: undefined | File) => {

        formik.setTouched({...formik.touched, photo: true})

        function setUploadFieldErrorStatus(errorsObj: {[name: string]: string}) {
            formik.setStatus({...formik.status, ...errorsObj})
        }

        validateUpload.checkAvatarRequirements(file, setUploadFieldErrorStatus, 'photoError')

        setImageFile(file)
    }


    const nameError = (formik.errors.name && formik.touched.name) ? formik.errors.name : ''
    const emailError = (formik.errors.email && formik.touched.email) ? formik.errors.email : ''
    const phoneError = (formik.errors.phone && formik.touched.phone) ? formik.errors.phone : ''
    const positionError = (formik.errors.position_id && formik.touched.position_id) ? formik.errors.position_id : ''
    
    const photoError = (formik.status.photoError && formik.touched.photo) ? formik.status.photoError : ''

    // DISABLED BUTTON VARIANTS:
    // const submitBtnDisabled = !formik.dirty || !formik.isValid || formik.status?.photoError
    // const submitBtnDisabled = !formik.dirty
    const submitBtnDisabled = !formik.values.email || !formik.values.name || !formik.values.phone || !formik.isValid

    return (
        <form className='registration-form' onSubmit={formik.handleSubmit}>

            <SuperInputText
                className='name-field'
                placeholder='Your name'
                error={nameError}
                {...formik.getFieldProps('name')} />

            <SuperInputText
                className='email-field'
                placeholder='Email'
                error={emailError}
                {...formik.getFieldProps('email')} />

            <SuperInputText
                className='phone-field'
                placeholder='Phone'
                helperText='+38 (XXX) XXX - XX - XX'
                error={phoneError}
                {...formik.getFieldProps('phone')} />


            <div className='registration-position'>
                <div className='position-list__title'>Select your position</div>

                <div className='position-list'>

                    {isPositionsLoading 
                        ? <Preloader />
                        : <SuperRadio 
                            options={positions}
                            {...formik.getFieldProps('position_id')}/>
                    }

                    {positionError
                        && <div className='registration-form__error'>{positionError}</div>
                    }
                </div>
            </div>

            <div className='upload-input'>
                <SuperUpload 
                    label='Upload your photo'
                    error={photoError}
                    onFileUploaded={validateUploadFile}
                    {...formik.getFieldProps('photo')}/>
            </div>

            {responseError 
                && <div className='registration-form__error'>{responseError}</div>
            }

            {mappedResponseFails}
            
            {isRegistrationLoading
                ? <div className='submit-preloader-wrapper'><Preloader /></div>
                : <SuperButton 
                    disabled={submitBtnDisabled}
                    type='submit'
                    className='registration-form__btn'>

                    Sign up
                </SuperButton>
            }

        </form>
    )
})