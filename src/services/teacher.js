import { fetchWithoutToken } from '../helpers/fetch.js'

export const teacherService =  {
    add : async (data)=>{
        try {

            const res = await fetchWithoutToken('teacher/',JSON.stringify(data),'POST')
            console.log(data)
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            const res = await fetchWithoutToken(`teacher/${data.number}/`,JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken(`teacher/${data.number}/`,JSON.stringify(data),'DELETE')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            return await fetchWithoutToken('teacher/')
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            return await fetchWithoutToken(`teacher/${id}/`)
        } catch (error) {
            console.error(error)
        }
    }
}