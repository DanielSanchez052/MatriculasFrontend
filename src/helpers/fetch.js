import { storage } from '../services/storage.js'

const baseURL = "https://apimatriculas.herokuapp.com";

export const fetchWithoutToken = async (endpoint, data="", method='GET')=>{
    const url = `${baseURL}/${endpoint}`
    if(method === 'GET'){
        const response = await fetch(url)
        return response
    }else{
        return await fetch(url,{
            method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: data
        })
    }
}

export const fetchWithToken = async ( endpoint, data, method = 'GET' ) => {
    const url = `${baseURL}/${endpoint}`
    const token = storage.get('access') || '';
    console.log(await token)

    if ( method === 'GET' ){
        return fetch( url,{
            method,
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });
    } else {
        return fetch( url , {
            method,
            headers: {
                'Content-type': 'application/json',
                //'token': token
                'Authorization':`Bearer ${ token }`
            },
            body: JSON.stringify( data )
        });
    }
}