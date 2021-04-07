import { $host, $authHost } from './index'

export const login = async (username, password) => {
    const response = await $host.post('/auth/login', {username, password})
    return response
}