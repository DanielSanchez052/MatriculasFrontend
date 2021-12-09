import { fetchWithoutToken } from '../helpers/fetch.js'

export const studentCourse =  {
    add : async (data)=>{
        const res = await fetchWithoutToken('student-course/',JSON.stringify(data),'POST')
        return await res
    },
    edit : async (data)=>{
        const res = await fetchWithoutToken(`student-course/${data.number}/`,JSON.stringify(data),'PUT')
        return await res
    },
    delete : async (data)=>{
        const res = await fetchWithoutToken(`student-course/${data.number}/`,JSON.stringify(data),'DELETE')
        return await res
    },
    getAll : async ()=>{
        try {
            let res = await fetchWithoutToken('student-course/')
            return await res.json()
        } catch (error) {
            console.error(error)
        }
    },
    getById : async (id)=>{
        let res = await fetchWithoutToken(`student-course/${id}/`)
        return await res
    }
}