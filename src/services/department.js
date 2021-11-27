import { fetchWithoutToken } from '../helpers/fetch.js'

export const departmentService =  {
    add : async (data)=>{
        try {
            const res = await fetchWithoutToken('department/',JSON.stringify(data),'POST')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            const res = await fetchWithoutToken(`department/${data.identification_number}`,JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken(`department/${data.identification_number}`,JSON.stringify(data),'DELETE')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            return await fetchWithoutToken('department/')
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            return await fetchWithoutToken(`department/${id}/`)
        } catch (error) {
            console.error(error)
        }
    }
}