import React, { useEffect } from 'react'
import { useState } from 'react';
import Section from './Section';
import { getAllAirdrops } from '../api';





function Airdrops() {
  const [airdrops, setAirdrops] = useState({

    "Allairdrops": [],
        "pagination": {
            "totalAirdrop": 0,
            "currentpage": 1,
            "totalPages": 1,
            "pageSize": 5,
        }

  });

  const fetchAirdrops = async (search='', page = 1, limit = 8 )=> {
    try {

      const {data} = await getAllAirdrops(search, page, limit);
      //console.log(data.airdrops[0].title)
      console.log("getting all data - data ", data)
      setAirdrops(data);
      
    } catch (error) {
      console.error('Error fetching airdrops:', error);
    }
       
  }

  

  useEffect(() => {
    fetchAirdrops()
  }, []);

  const yo = airdrops.employees
   
   
  console.log("getting final airdrops", yo )
  return (
    <>
  
    <div className=' h-[100%] text-white mb-96'> 
      <div className='flex justify-center'>
      <h1 className="text-shadow-green  text-9xl mb-3">Discover Airdrops </h1>
      </div>
      <div className='flex justify-center gap-2 mt-8 '>
        <input className=' bg-transparent focus:text-[#FFFD37]  placeholder-white border border-[#FFFD37] text-zinc-950   outline-none rounded-md p-2 w-[600px]'  type="text" placeholder='Search' />
        <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] hover:bg-green-600 text-black py-2 px-4 rounded-md transition-colors"> Search</button>
      </div>
      

        <Section airdrop = {airdrops.employees}  pagination ={ airdrops.pagination } /> 
      
      
    </div>
    </>
  )
}

export default Airdrops
