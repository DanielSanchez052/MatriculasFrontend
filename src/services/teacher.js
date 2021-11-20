import { fetchWithoutToken } from '../helpers/fetch.js'

export const teacherService =  {
    add : async (data)=>{
        try {
            const res = await fetchWithoutToken('teacher.php',JSON.stringify(data),'POST')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            const res = await fetchWithoutToken('teacher.php',JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken('teacher.php',JSON.stringify(data),'DELETE')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            return await fetchWithoutToken('teacher.php')
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            return await fetchWithoutToken(`teacher.php?identification_number=${id}`)
        } catch (error) {
            console.error(error)
        }
    }
}