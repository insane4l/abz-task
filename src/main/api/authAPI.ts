import { apiBase } from "./apiBase"


export const authAPI = {

    getPositions() {
        return apiBase.get<GetPositionsResponseType>('/positions').then(res => res.data)
    },

    register(payload: RegisterRequestPayloadType) {
        return apiBase.post<RegisterResponseType>('/users', payload).then(res => res.data)
    },

}




// types
export type GetPositionsResponseType = {
    success: boolean
    positions?: Array<PositionType>
    message?: string
}

export type PositionType = {
    id: number
    name: string
}

type RegisterRequestPayloadType = {
    name: string // - user name, should be 2-60 characters
    email: string // - user email, must be a valid email according to RFC2822
    phone: string // user phone number, should start with code of Ukraine +380
    position_id: number // user position id. You can get list of all positions with their IDs using the API method GET api/v1/positions
    photo: File // - user photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB.
}

type RegisterResponseType = {
    success: boolean
    message: string
    user_id?: number
    fails?: RegisterFailsType // validation errors
}

type RegisterFailsType = {
    name?: Array<string>
    email?: Array<string>
    phone?: Array<string>
    position_id?: Array<string>
    photo?: Array<string>
}