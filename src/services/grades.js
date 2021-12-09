import { fetchWithoutToken } from '../helpers/fetch.js'

export const gradesService =  {
    add : async (data)=>{
        const res = await fetchWithoutToken('grades/',JSON.stringify(data),'POST')
        return await res
    },
    edit : async (data)=>{
        const res = await fetchWithoutToken(`grades/${data.number}/`,JSON.stringify(data),'PUT')
        return await res
    },
    delete : async (data)=>{
        const res = await fetchWithoutToken(`grades/${data.number}/`,JSON.stringify(data),'DELETE')
        return await res
    },
    getAll : async ()=>{
        try {
            let res = await fetchWithoutToken('grades/')
            return await res.json()
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        const res = await fetchWithoutToken(`grades/${id}/`)
        return await res
    }
}