import { fetchWithoutToken } from '../helpers/fetch.js'

export const courseService =  {
    add : async (data)=>{
        const res = await fetchWithoutToken('course/',JSON.stringify(data),'POST')
        return await res
    },
    edit : async (data)=>{
        const res = await fetchWithoutToken(`course/${data.number}/`,JSON.stringify(data),'PUT')
        return await res
    },
    delete : async (data)=>{
        const res = await fetchWithoutToken(`course/${data.number}/`,JSON.stringify(data),'DELETE')
        return await res
    },
    getAll : async ()=>{
        try {
            const res = await fetchWithoutToken('course/')
            return await res.json()
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        const res = await fetchWithoutToken(`course/${id}/`)
        return await res
    }
}