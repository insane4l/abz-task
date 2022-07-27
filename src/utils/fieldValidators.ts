export const validateField = {

    required(fieldValue: string | boolean | null | undefined, errorsObj: ErrorsObjType, valueName: string) {
        if (!fieldValue) errorsObj[valueName] = 'Required'
    },

    minLength(fieldValue: string, errorsObj: ErrorsObjType, valueName: string, minLength: number) {
        if (fieldValue.length < minLength) errorsObj[valueName] = `Minimum field length ${minLength} characters`
    },
    
    maxLength(fieldValue: string, errorsObj: ErrorsObjType, valueName: string, maxLength: number) {
        if (fieldValue.length > maxLength) errorsObj[valueName] = `Maximum field length ${maxLength} characters`
    },

    isEmail(fieldValue: string, errorsObj: ErrorsObjType, valueName: string) {
        if (!/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i.test(fieldValue)) {
            errorsObj[valueName] = 'Invalid email address'
        }
    },

    isPhone(fieldValue: string, errorsObj: ErrorsObjType, valueName: string) {
        if (!/^[\+]{0,1}380([0-9]{9})$/i.test(fieldValue)) {
            errorsObj[valueName] = 'Invalid number. Template: +38 (XXX) XXX - XX - XX'
        }
    },

}



export const validateUpload = {

    checkAvatarRequirements(file: undefined | File, setErrorsCallback: ValidateUploadCallback, valueName: string) {

        // check if file exists
        if (!file) return setErrorsCallback({[valueName]: 'Photo is required'})
        
        // check file size
        if (file.size > 5000000) return setErrorsCallback({[valueName]: 'Image size must not exceed 5MB'})

        // check file extension
        if (!/\.jpe?g$/i.test(file.name)) return setErrorsCallback({[valueName]: 'User photo should be jpg/jpeg image'})



        // check image resolution
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        let objectUrl = _URL.createObjectURL(file)

        img.onload = function () {
            // @ts-ignore
            if (this.width < 70 || this.height < 70) {
                setErrorsCallback({[valueName]: 'Image resolution must be at least 70x70px'})
            }

            _URL.revokeObjectURL(objectUrl)
        }

        img.src = objectUrl


        // cleanup error
        setErrorsCallback({[valueName]: ''})
    },

}




type ErrorsObjType = {
    [name: string]: string | boolean
}

type ValidateUploadCallback = (errorsObj: {[name: string]: string}) => void