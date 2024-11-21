import React, { useState } from 'react'
import { CiBookmark } from "react-icons/ci";
import { BiSolidLike } from "react-icons/bi";
import { SlLike } from "react-icons/sl";
import { IoBookmark } from "react-icons/io5";


function Boxclone(props) {
  const [liked, setLiked] = useState(true)
  const [pinned, setPinned] = useState(true)
  return (
    
    <div className="gap-3 p-4 h-[330px] w-[330px]  text-[#FFFFFF] rounded-2xl flex flex-col justify-center items-center shadow-2xl bg-[url('/theme2.png')]">

      <div className="border border-slate-950 h-[120px] w-[120px] rounded-full">
        <img className="w-[100%] h-[100%] rounded-full" src={props.url} alt="" />
      </div>
      <div className='flex flex-col justify-between gap-2 items-center'>
      <h1 className="text-2xl text-green-900 font-semibold">{props.title}</h1>
      <p className="font-thin text-[18px]">{props.description}</p>
      </div>
     
      <div className='flex gap-10 items-center  '>

        {liked ? <span className= "text-3xl text-green-400">
       <BiSolidLike />
       </span> : <span className= "text-3xl"> <SlLike /></span> }
        
       
       
      
      
      <h1 className='' >liked by 200</h1>

      {pinned ? <span className= "text-3xl text-green-400">
        <IoBookmark />
       </span> : <span className= "text-3xl"> <CiBookmark/> </span> }
      </div>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black h-[30px] w-[100px] rounded-2xl border border-green-900 bg-transparent">Tutorial</button>
    </div>
   
  )
}

export default Boxclone
