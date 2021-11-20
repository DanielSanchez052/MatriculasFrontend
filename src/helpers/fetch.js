const baseURL = "http://192.168.1.13:80/apimatriculas";

export const fetchWithoutToken = async (endpoint, data="", method='GET')=>{
    const url = `${baseURL}/${endpoint}`
    if(method === 'GET'){
        return await fetch(url)
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
