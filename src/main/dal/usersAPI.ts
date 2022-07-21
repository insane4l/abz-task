import { apiBase } from "./apiBase"


export const usersAPI = {

    getUsers(params: GetUsersRequestParams,) {
        return apiBase.get<string>(
            'auth/register', {params}).then(res => res.data)
    },

}



// types
export type GetUsersRequestParams = {
    page: number // Page number
    offset?: number
    count?: number // Users per page (default: 5 - minimum: 1 - maximum: 100)
}

export type UserType = {

}