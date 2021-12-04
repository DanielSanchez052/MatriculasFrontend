import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch.js'

export const authService =  {

    login: async (email, password) => {
        try {
            const res = await fetchWithoutToken('auth/login/',JSON.stringify({email:email, password:password}),'POST')
            return await res
        } catch (error) {
            console.error(error)
        }
    },
    logout: async () => {
        try {
            const res = await fetchWithToken('auth/logout/',JSON.stringify({}),'POST')
            return await res
        } catch (error) {
            console.error(error)
        }
    }

}