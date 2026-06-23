import { api } from './axios.service'

export default function userService(email: string) {
    console.log(email)
    const payload = {
        email
    }
}

export function loginService(email: any, password: any) {
    console.log(email, password)
    const payload = {
        email,
        password
    }
    return api.post(`/user/login`, payload)
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch(e => {
            console.log('Error en login:', e)
            throw e
        })
}


export function ProfileService(email: any) {
    console.log(email)
    const payload = {
        email,
        
    }
    return api.post(`/user/profile`, payload)
        .then((response) => {
            console.log(response)
            return response.data
        })
        .catch(e => {
            console.log('Error en login:', e)
            throw e
        })
}