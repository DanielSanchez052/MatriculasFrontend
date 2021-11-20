import { fetchWithoutToken } from '../helpers/fetch.js'

export const courseService =  {
    add : async (data)=>{
        try {
            const res = await fetchWithoutToken('course.php',JSON.stringify(data),'POST')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            const res = await fetchWithoutToken('course.php',JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken('course.php',JSON.stringify(data),'DELETE')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            const res = await fetchWithoutToken('course.php')
            console.log( await res.json())
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            const res = await fetchWithoutToken(`course.php?id_course=${id}`)
            console.log( await res.json())
            return true
        } catch (error) {
            console.error(error)
        }
    }
}