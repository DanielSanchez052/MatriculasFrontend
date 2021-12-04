import { fetchWithoutToken } from '../helpers/fetch.js'

export const courseService =  {
    add : async (data)=>{
        try {
            const res = await fetchWithoutToken('course/',JSON.stringify(data),'POST')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            const res = await fetchWithoutToken(`course/${data.number}/`,JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken(`course/${data.number}/`,JSON.stringify(data),'DELETE')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            const res = await fetchWithoutToken('course/')
            return res
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            const res = await fetchWithoutToken(`course/${id}/`)
            return res
        } catch (error) {
            console.error(error)
        }
    }
}