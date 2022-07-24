import { apiBase } from "./apiBase"


export const usersAPI = {

    getUsers(params: GetUsersRequestParamsType) {
        return apiBase.get<GetUsersResponseType>(
            '/users', {params}).then(res => res.data)
    },

}




// types
export type GetUsersRequestParamsType = {
    page?: number // Page number (default: 1)
    offset?: number
    count?: number // Users per page (default: 5 - minimum: 1 - maximum: 100)
}

type GetUsersResponseType = {
    success: boolean
    page?: number
    total_pages?: number
    total_users?: number
    count?: number
    links?: GetUsersLinksType
    users?: Array<UserType>
    message?: string // error message
    fails?: GetUsersFailsType // validation errors
    
}

type GetUsersLinksType = {
    next_url: string | null
    prev_url: string | null
}

type GetUsersFailsType = {
    count: Array<string>
    page: Array<string>
}

export type UserType = {
    id: string
    name: string
    email: string
    phone: string
    position: string
    position_id: string
    registration_timestamp: number
    photo: string
}
