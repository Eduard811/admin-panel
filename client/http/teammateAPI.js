import { $host, $authHost } from './index'

export const createTeammate = async (teammate) => {
    const {data} = await $authHost.post('/api/teammate', teammate)
    return data
}

export const fetchTeammates = async () => {
    const {data} = await $host.get('/api/teammate')
    return data
}