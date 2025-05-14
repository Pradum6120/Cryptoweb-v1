import React, { useEffect } from 'react'
import { useState } from 'react';
import Section from './Section';
import {post } from '../store/UserSlice';
import { useDispatch} from 'react-redux';
import { getAllAirdrops } from '../api';
import { setAllposts } from '../store/UserSlice';


 


function Airdrops() {

  const dispatch = useDispatch();
 

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
      setAirdrops(data);
      
    } catch (error) {
      console.error('Error fetching airdrops:', error);
    }
       
  }


  useEffect(() => {
    fetchAirdrops()
  }, []);

   
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
      

        <Section airdrop = {airdrops.employees}  pagination ={ airdrops.pagination}   fetchAirdrops = {fetchAirdrops} /> 
      
      
    </div>
    </>
  )
}

export default Airdrops
