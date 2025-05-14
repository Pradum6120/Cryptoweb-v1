import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Bigbox({airdrop}) {
    const air = airdrop.data

  return (
    <div className='h-[500px] w-[100%] flex justify-center items-center'>
      <div className=' shadow-2xl bg-[url("/bg_eco.jpg")] bg-cover bg-center  flex gap-24  justify-between items-center w-[90%] h-[400px] rounded-2xl'>
        <div className='border ml-16 border-black w-48 h-48 rounded-full'>
          <img  className = 'border border-[#718769] shadow-inner w-48 h-48 rounded-full' src={air.profileimage} alt="" />
        </div>
        <div className=' w-[700px] h-[100%] gap-5  flex justify-center items-center p-8 flex-col  text-zinc-800'>
        <h1 className='text-7xl  text-green-800'>{air.title}</h1>
        <p className='w-[100%] pl-9 text-xl'>{air.description}</p>
       
        </div>
        <div className=' w-[200px] flex justify-center p-4 h-[100%] gap-11 text-4xl'>
          <Link to={air.twitterlink}><FaTwitter /></Link>
          <Link to={air.discordlink}><BsDiscord /></Link>
        </div>
        
      </div>

      
    </div>
  )
}

export default Bigbox
