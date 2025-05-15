import React, { useState } from 'react'
import { CiBookmark } from "react-icons/ci";
import { BiSolidLike } from "react-icons/bi";
import { SlLike } from "react-icons/sl";
import { IoBookmark } from "react-icons/io5";


function Boxclone(props) {
  const [liked, setLiked] = useState(true)
  const [pinned, setPinned] = useState(true)
  return (
    
    <div className="lg:gap-3  lg:p-4 lg:h-[330px] lg:w-[330px] h-[200px] w-[250px]  text-[#FFFFFF] rounded-2xl flex flex-col justify-center items-center shadow-2xl bg-[url('/theme2.png')]">

      <div className="border border-slate-950  lg:h-[120px] lg:w-[120px] h-[45px] w-[45px] rounded-full">
        <img className="lg:w-[100%] lg:h-[100%] rounded-full" src={props.url} alt="" />
      </div>
      <div className='flex flex-col justify-between gap-2 items-center'>
      <h1 className="lg:text-2xl mt-2 text-yellow-100 font-semibold">{props.title}</h1>
      <p className="font-thin lg:text-[18px]">{props.description}</p>
      </div>
     
      <div className='flex gap-10 items-center  '>

        {liked ? <span className= "text-3xl text-green-400">
       <BiSolidLike />
       </span> : <span className= "lg:text-3xl"> <SlLike /></span> }
        
       
       
      
      
      <h1 className='text-xs' >200</h1>

      {pinned ? <span className= "text-3xl text-green-400">
        <IoBookmark />
       </span> : <span className= "lg:text-3xl"> <CiBookmark/> </span> }
      </div>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black lg:h-[30px] lg:w-[100px] w-[90px] h-[20px] flex justify-center items-center rounded-2xl p-1  border border-green-900 bg-transparent">  View</button>
    </div>
   
  )
}

export default Boxclone
