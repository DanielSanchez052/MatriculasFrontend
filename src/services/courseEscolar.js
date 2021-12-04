import { fetchWithoutToken } from '../helpers/fetch.js'

export const courseEscolarService =  {
    add : async (data)=>{
        try {
            const res = await fetchWithoutToken('course-escolar/',JSON.stringify(data),'POST')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            const res = await fetchWithoutToken(`course-escolar/${data.number}/`,JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken(`course-escolar/${data.number}/`,JSON.stringify(data),'DELETE')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            return await fetchWithoutToken('course-escolar/')
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            return await fetchWithoutToken(`course-escolar/${id}/`)
        } catch (error) {
            console.error(error)
        }
    }
}