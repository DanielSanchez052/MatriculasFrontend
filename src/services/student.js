import { fetchWithoutToken } from './../helpers/fetch.js'

export const studentService =  {
    add : async (data)=>{
        try {
            data["person_type"]="S"
            const res = await fetchWithoutToken(`person/`,JSON.stringify(data),'POST')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            data["person_type"]="S"
            const res = await fetchWithoutToken(`person/${data.identification_number}/`,JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken(`person/${data.identification_number}/`,JSON.stringify(data),'DELETE')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            const res =  await fetchWithoutToken(`person/`)
            return res
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            const res = await fetchWithoutToken(`person/${id}/`)
            return await res
        } catch (error) {
            console.error(error)
        }
    }
}