const baseURL = "http://172.16.6.11:8081/apimatriculas";

export const fetchWithoutToken = async (endpoint, data="", method='GET')=>{
    const url = `${baseURL}/${endpoint}`
    if(method === 'GET'){
        const response = await fetch(url)
        return await response.json();
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
