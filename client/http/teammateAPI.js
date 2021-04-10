import { $host, $authHost } from './index'

export const createTeammate = async (teammate) => {
    const {data} = await $authHost.post('/api/teammate', teammate)
    return data
}

export const updateTeammate = async (teammate) => {
    const {data} = await $authHost.put('/api/teammate', teammate)
    return data
}

export const fetchTeammates = async () => {
    const {data} = await $host.get('/api/teammate')
    return data
}

export const fetchTeammate = async (id) => {
    const response = await $host.get(`/api/teammate/${id}`, {responseType: 'json'})
    return response
}

export const deleteTeammate = async (id) => {
    const response = await $authHost.delete(`/api/teammate/${id}`)
    return response
}