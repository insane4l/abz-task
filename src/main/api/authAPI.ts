import { AxiosResponse } from "axios";
import { apiBase } from "./apiBase"


export const authAPI = {

    getPositions() {
        return apiBase.get<GetPositionsResponseType>('/positions').then(res => res.data)
    },

    register(payload: FormData, token: string) {
        return apiBase.post<RegisterResponseType>('/users', payload,
            {headers: {'Token': token}}).then(res => res.data)
    },

    getToken() {
        return apiBase.get<{success: boolean, token: string}>('/token').then(res => res.data)
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

export type RegisterRequestPayloadType = {
    name: string // should be 2-60 characters
    email: string // must be a valid email according to RFC2822
    phone: string // should start with code of Ukraine +380
    position_id: string // user position id (integer - string)
    photo: File // - user photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB.
}

type RegisterResponseType = {
    success: boolean
    message: string
    user_id?: number
    fails?: RegisterFailsType // validation errors
}

export type RegisterFailsType = {
    name?: Array<string>
    email?: Array<string>
    phone?: Array<string>
    position_id?: Array<string>
    photo?: Array<string>
}