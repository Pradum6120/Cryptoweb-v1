import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { PiUserSwitch } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
<MdPostAdd />




function Sidenav() {
  return (
    <>
    <div className='flex w-[100%] h-screen '>
      <div className='font-mono font-bold gap-12 w-[20%] flex flex-col m-7 rounded-xl bg-[url("/theme2.png")] bg-no-repeat bg-cover h-[90%] shadow-2xl'>
        <div className='h-[10%] w-[100%] flex flex-col justify-center text-white items-center mt-14 gap-1 '>
        <AiOutlineHome className='text-3xl ' />

        <NavLink to="/" className="hover:text-blue-400 transition-colors text-pretty font-semiboldtext-lg"> HOME</NavLink>
        </div>


        <div className='h-[10%] w-[100%] text-white flex flex-col justify-center items-center gap-1 '>
        <PiUserSwitch className='text-3xl ' />

        <NavLink to="/admin/users" className="hover:text-blue-400 transition-colors text-pretty font-semibold text-lg"> USERS</NavLink>
        </div>
     
     <div className='h-[10%] w-[100%] text-white flex flex-col justify-center items-center gap-1' >
     <MdPostAdd className='text-3xl' />
     <NavLink to='/admin/airdrops' className="hover:text-blue-400 transition-colors text-lg font-semibold">Airdrops</NavLink>
     </div>
       
        <div className='h-[10%] w-[100%] text-white flex flex-col justify-center items-center gap-1'>
        <BsDatabaseAdd className='text-3xl' />
        <NavLink to='/admin/addpost' className="hover:text-blue-400 transition-colors text-lg font-semibold">Add Post</NavLink>
        </div>
        <div className='flex justify-center text-white items-center gap-1 mt-5 '>
          <h1 className='text-xl  '>Logout</h1>
          <RiLogoutBoxLine className='text-3xl' />
        </div>
        </div>
        <div className="w-[80%] h-[90%] m-7 rounded-md flex shadow-2xl bg-[url('/theme2.png')] bg-cover">

        <Outlet /> 
        </div>
    </div>
    
    </>
  )
}

export default Sidenav
