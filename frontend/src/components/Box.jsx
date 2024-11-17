import React from 'react';
import { SlLike } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";

function Box({ airdropy }) {
  return (
    <div className="gap-3 p-4 h-[330px] w-[330px] mt-6 rounded-2xl flex flex-col bg-no-repeat bg-cover justify-center items-center bg-[url('/theme2.png')]">
      <div className="border border-slate-950 h-[120px] w-[120px] rounded-full">
        <img className="w-[100%] h-[100%] rounded-full" src={airdropy.profileimage} alt="" />
      </div>
      <div className='flex flex-col justify-between gap-2 items-center'>
      <h1 className="text-2xl text-green-900 font-semibold">{airdropy.title}</h1>
      <p className="font-thin text-[18px]">{airdropy.description}</p>
      </div>
     
      <div className='flex gap-10 items-center'> 
      <SlLike className='text-2xl' />
      <h1 className='' >liked by 200</h1>
      <CiBookmark className='text-2xl ' />
      </div>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black h-[30px] w-[100px] rounded-2xl">Tutorial</button>
    </div>
  );
}

export default Box;
