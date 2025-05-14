
const base_url ="https://cryptoweb-8nuf.onrender.com";

export const getAllAirdrops = async (search='', page='1', limit='8')=>{
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


export const getAirdropbyid = async (id)=>{
    
      const url= `${base_url}/api/v1/${id}`;
    const options ={
         method: 'GET',
         headers: {
              'Content-Type': 'application/json'
         }
    }

    try{
      const response = await fetch(url,options);
      const data = await response.json()

      return data
    }
    
     catch (error) {
            return error;
        
    }


}