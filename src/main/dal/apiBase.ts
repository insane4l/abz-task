import axios from 'axios'

export const apiBase = axios.create({
    baseURL: 'https://frontend-test-assignment-api.abz.agency',
    withCredentials: true,
})