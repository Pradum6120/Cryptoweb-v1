import React from 'react'
import { SlLike } from "react-icons/sl";
import { IoBookmark } from "react-icons/io5";
import { useAuth } from '../store/auth';

function Boxpinned({posts}) {

  const { AuthorizationToken } = useAuth()

  

    const handleUnpinned = async (id)=> {
        try{
             const response = await fetch(`https://cryptoweb-8nuf.onrender.com/api/v1/unpinned/${id}`, {
              method: "GET",
              headers: {
                Authorization: AuthorizationToken
              }
             })

             if(response.ok){
               const data = await response.json()
             }
        }
        catch{
           console.error(error)
        }
    }
    
  return (
    <div className="gap-3 p-4 h-[330px] w-[330px]  text-[#FFFFFF] rounded-2xl flex flex-col justify-center items-center shadow-2xl bg-[url('/theme2.png')]">

      <div className="border border-slate-950 h-[120px] w-[120px] rounded-full">
        <img className="w-[100%] h-[100%] rounded-full" src={posts.airdrop.profileimage} alt="" />
      </div>
      <div className='flex flex-col justify-between gap-2 items-center'>
      <h1 className="text-2xl text-green-900 font-semibold">{posts.airdrop.title}</h1>
      <p className="font-thin text-[18px]">{posts.airdrop.description}</p>
      </div>
     
      <div className='flex gap-10 items-center  '>

      <span className= "text-3xl"> <SlLike /></span> 
        
       
       
      
      
      <h1 className='' >liked by {posts.airdrop.likedCount} User </h1>

       <span className= "text-3xl text-green-400">
        <IoBookmark onClick={()=> handleUnpinned(posts.airdrop._id)}/>
       </span>
      </div>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black h-[30px] w-[100px] rounded-2xl border border-green-900 bg-transparent">Tutorial</button>
    </div>
   
  )
}
  
export default Boxpinned
