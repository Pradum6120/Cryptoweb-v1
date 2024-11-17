import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import Box from './box'
import { getAllAirdrops } from '../api';



function Airdrops() {
  const [airdrops, setAirdrops] = useState({

    "employees": [],
        "pagination": {
            "totalAirdrop": 0,
            "currentpage": 1,
            "totalPages": 1,
            "pageSize": 5,
        }

  });

  const fetchAirdrops = async (search='', page= 1, limit = 5 )=> {
    try {

      const {data} = await getAllAirdrops(search, page, limit);
      console.log(data.employees[0].title)
      setAirdrops(data);
      
    } catch (error) {
      
    }
       
  }

  useEffect(() => {
    fetchAirdrops()
  }, [])


  return (
    <>
    <Navbar/>
    <div className='bg-green-500 h-[100%]'> 
      <div className='flex justify-center'>
      <h1 className="text-black text-9xl mb-3">Discover Airdrops </h1>
      </div>
      <div className='flex justify-center gap-2 mt-8 '>
        <input className=' bg-transparent  placeholder-slate-950 border border-gray-900 text-zinc-950   outline-none rounded-md p-2 w-[600px]'  type="text" placeholder='Search' />
        <button className="bg-green-900 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"> Search</button>
      </div>
      <div className='flex justify-between gap-7 h-[100%] flex-wrap mt-6 p-16'>
      <Box title="allora" description="this is allora airdrops" url= "/1.jpg"/>
      <Box title="Gainet" description="this is Gainet airdrops" url= "/2.png"/>
      <Box title="Aleo" description="this is allora airdrops" url= "/3.jpg"/>
      <Box title="allora" description="this is allora airdrops" url= "/4.jpg"/>
      <Box title="allora" description="this is allora airdrops" url= "/5.png"/>

      
      </div>
     
      
    </div>
    </>
  )
}

export default Airdrops
