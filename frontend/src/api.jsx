
const base_url ="http://localhost:8000";

export const getAllAirdrops = async (search='', page='1', limit='5')=>{
    let url = `${base_url}/api/v1/?search=${search}&page=${page}&limit=${limit}`;
    try {
        const options = {
            method:'GET',
            'Content-Type' : 'application/json'
       }
         const result = await fetch(url,options);
         const data = await result.json();
         return data

    } catch (error) {
            return error;
        
    }


}