import React from 'react';
import { SlLike } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import { Link } from 'react-router-dom';


function Box({ airdropy }) {
  const HandelBookmark = (id)=>{
     console.log("Bookmark", id)

  }

  const HandleLike = async (id)=>{
    console.log("like", id)

  }

  return (
    <div className="gap-3 p-4 h-[330px] w-[330px] mt-6 rounded-2xl flex flex-col bg-no-repeat bg-cover justify-center items-center bg-[url('/theme2.png')] shadow-2xl ">
      <div className="border border-slate-950 h-[120px] w-[120px] rounded-full">
        <img className="w-[100%] h-[100%] rounded-full" src={airdropy.profileimage} alt="" />
      </div>
      <div className='flex flex-col justify-between gap-2 items-center'>
      <h1 className="text-2xl  text-yellow-400">{airdropy.title}</h1>
      <p className="font-thin text-[18px]">{airdropy.description}</p>
      </div>
     
      <div className='flex gap-10 items-center'> 
      <SlLike className='text-2xl' onClick= {()=> HandleLike(airdropy._id)} />
      <h1 className='' >liked by {airdropy.likedCount}</h1>
      <CiBookmark className='text-2xl '  onClick={() => HandelBookmark(airdropy._id)} />
      </div>
      <Link  to={`/airdrops/${airdropy._id}`} className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black h-[30px] w-[100px] rounded-2xl text-center"> Tutorial
      </Link>
      
    </div>
  );
}

export default Box;
