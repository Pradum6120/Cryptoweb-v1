import React from 'react';
import { SlLike } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import { BiSolidLike } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../store/auth';

function Box({ airdropy }) {
  const { AuthorizationToken } = useAuth()

  const [pinned, setPinned] = useState(false)
  const [liked, setLiked] = useState(false)


  const HandelBookmark = async (id) => {
    console.log(id)

    try{
      const response  = await fetch(`http://localhost:8000/api/v1/pinned/${id}`,{
        method: "GET",
        headers: {
          Authorization: AuthorizationToken
        }

      })
       if(response.ok){
        const result =  await response.json()
        console.log(result)
        

       }
    }
     catch{
      console.error(error)
     }
  };

  const HandleLike = async (id) => {

    try{
      const response  = await fetch(`http://localhost:8000/api/v1/liked/${id}`,{
        method: "GET",
        headers: {
          Authorization: AuthorizationToken
        }

      })
       if(response.ok){
        const result =  await response.json()
        console.log(result)
        setLiked((prev) => !prev);
        console.log("like = ",liked)

       }
    }
     catch{
      console.error(error)
     }
    

  };


  return (
    <div className="gap-3 p-4 h-[350px] w-[330px] mt-6 rounded-2xl flex flex-col bg-no-repeat bg-cover justify-between items-center bg-[url('/theme2.png')] shadow-2xl">
      {/* Profile Image */}
      <div className="flex justify-center items-center border border-slate-950 h-[120px] w-[120px] rounded-full">
        <img className="w-[100%] h-[100%] rounded-full" src={airdropy.profileimage} alt="Profile" />
      </div>

      {/* Content Section */}
      <div className='flex flex-col justify-center items-center gap-2 flex-grow'>
        <h1 className="text-2xl text-yellow-400">{airdropy.title}</h1>
        <p className="font-thin text-[18px] text-center">{airdropy.description}</p>
        <div className='flex items-center gap-3'>
        {liked ? <span className= "text-3xl text-green-400">
       <BiSolidLike  onClick={() => HandleLike(airdropy._id)} />
       </span> : <span className= "text-3xl"> <SlLike  onClick={() => HandleLike(airdropy._id)}  /></span> }
          <h1 className="text-lg">liked by {airdropy.likedCount}  Users</h1>
          <CiBookmark className='text-2xl cursor-pointer' onClick={() => HandelBookmark(airdropy._id)} />
        </div>
      </div>

      {/* Fixed-size Button at the Bottom */}
      <Link to={`/airdrops/${airdropy._id}`} className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black h-[30px] w-[100px] rounded-2xl text-center flex justify-center items-center mt-auto">
        Tutorial
      </Link>
    </div>
  );
}

export default Box;
