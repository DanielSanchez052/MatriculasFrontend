import { fetchWithoutToken } from '../helpers/fetch.js'

export const courseEscolarService =  {
    add : async (data)=>{
            const res = await fetchWithoutToken('course-escolar/',JSON.stringify(data),'POST')
            return await res
    },
    edit : async (data)=>{
            const res = await fetchWithoutToken(`course-escolar/${data.number}/`,JSON.stringify(data),'PUT')
            return await res
    },
    delete : async (data)=>{
            const res = await fetchWithoutToken(`course-escolar/${data.number}/`,JSON.stringify(data),'DELETE')
            return await res
    },
    getAll : async ()=>{
        try {
            let res = await fetchWithoutToken('course-escolar/')
            return await res.json()
        } catch (error) {
            console.error(error)
        } 
    },
    getById : async (id)=>{
        let res = await fetchWithoutToken(`course-escolar/${id}/`)
        return await res
    }
}