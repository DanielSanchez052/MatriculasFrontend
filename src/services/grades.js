import { fetchWithoutToken } from '../helpers/fetch.js'

export const gradesService =  {
    add : async (data)=>{
        try {
            const res = await fetchWithoutToken('grades/',JSON.stringify(data),'POST')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            const res = await fetchWithoutToken(`grades/${data.identification_number}`,JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken(`grades/${data.identification_number}`,JSON.stringify(data),'DELETE')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            return await fetchWithoutToken('grades/')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            return await fetchWithoutToken(`grades/${id}/`)
            return true
        } catch (error) {
            console.error(error)
        }
    }
}