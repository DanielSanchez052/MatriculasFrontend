import { fetchWithoutToken } from './../helpers/fetch.js'

export const studentService =  {
    add : async (data)=>{
        try {
            const res = await fetchWithoutToken('student.php',JSON.stringify(data),'POST')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    edit : async (data)=>{
        try {
            const res = await fetchWithoutToken('student.php',JSON.stringify(data),'PUT')
            return true
        } catch (error) {
            console.error(error)
        }
    },
    delete : async (data)=>{
        try {
            const res = await fetchWithoutToken('student.php',JSON.stringify(data),'DELETE')
            console.log(await res.json())
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getAll : async ()=>{
        try {
            const res = await fetchWithoutToken('student.php')
            console.log( await res.json())
            return true
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        try {
            const res = await fetchWithoutToken(`student.php?identification_number=${id}`)
            console.log( await res.json())
            return true
        } catch (error) {
            console.error(error)
        }
    }
}