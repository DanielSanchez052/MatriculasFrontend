import { fetchWithoutToken } from '../helpers/fetch.js'

export const teacherService =  {
    add : async (data)=>{
        const res = await fetchWithoutToken('teacher/',JSON.stringify(data),'POST')
        return await res
    },
    edit : async (data)=>{
        const res = await fetchWithoutToken(`teacher/${data.number}/`,JSON.stringify(data),'PUT')
        return await res
    },
    delete : async (data)=>{
        const res = await fetchWithoutToken(`teacher/${data.number}/`,JSON.stringify(data),'DELETE')
        return await res
    },
    getAll : async ()=>{
        try {
            let res = await fetchWithoutToken('teacher/')
            return await res.json()
        } catch (error) { 
            console.error(error)
        }
    },
    getById : async (id)=>{
        const res = await fetchWithoutToken(`teacher/${id}/`)
        return await res
    }
}