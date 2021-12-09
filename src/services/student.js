import { fetchWithoutToken } from './../helpers/fetch.js'

export const studentService =  {
    add : async (data)=>{
        try {
            const res = await fetchWithoutToken(`person/`,JSON.stringify(data),'POST')
            return await res
        } catch (error) {
            return false
        }
    },
    edit : async (data)=>{
            const res = await fetchWithoutToken(`person/${data.identification_number}/`,JSON.stringify(data),'PUT')
            return await res
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken(`person/${data.identification_number}/`,JSON.stringify(data),'DELETE')
            return await res
        } catch (error) {
            return false
        }
    },
    getAll : async (type=NaN)=>{
        try {
            if(type != NaN && ( type == 'S' || type == 'T' )){
                const res =  await fetchWithoutToken(`person/${type}/`)
                return await res.json()
            }
            const res =  await fetchWithoutToken(`person/`)
            return await res.json()
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        const res = await fetchWithoutToken(`person/${id}/`)
        return await res
    }
}