import { fetchWithoutToken } from '../helpers/fetch.js'

export const studentCourse =  {
    add : async (data)=>{
        try {
            const res = await fetchWithoutToken('student-course/',JSON.stringify(data),'POST')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            const res = await fetchWithoutToken(`student-course/${data.number}/`,JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken(`student-course/${data.number}/`,JSON.stringify(data),'DELETE')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            return await fetchWithoutToken('student-course/')
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            return await fetchWithoutToken(`student-course/${id}/`)
        } catch (error) {
            console.error(error)
        }
    }
}