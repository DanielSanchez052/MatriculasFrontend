const baseURL = "http://172.16.6.11:8081/apimatriculas/";

export const fetchWithoutToken = (endpoint, data="", method='GET')=>{
    const url = `${baseURL}/${endpoint}`;

    if(method === 'GET'){
        return fetch(url);
    }else{
        return fetch(url,{
            method,
            headers:{
                'Accept':'application/json',
                'Content.type':'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}