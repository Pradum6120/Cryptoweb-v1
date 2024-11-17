import React from 'react';
import Boxclone from './Boxclone';
import { useAuth } from '../store/auth';

 

function Home() {
  const {user, token} = useAuth()

  
  return (
    <>
   
    
      <div className="w-[100%] h-[100%]  overflow-hidden flex flex-col justify-center items-center">
        {/* First Page: Split Screen */}
        <div className="flex w-screen  justify-center p-9 mb-0 h-full">



          <div className='flex flex-col gap-11 w-1/ h-[100%] '>
          {/* first  top Left Section */}
          <div className="w-[100%] h-[590px] ">
            {/* Left content goes here */}
            <img className='h-[100%] w-[100%] ' src="/gradiant.png" alt="" />
           
          </div>
          
          {/* first  bottom left Section */}
          <div className='w-[100%] mt-16 h-[100%]  flex flex-col p-11 justify-center items-center'>
            <h1 className="text-[#FFFD37] text-8xl font-mono mr-16 ">Tranding</h1>
            <h1 className="text-[#FFFD37] text-8xl font-mono  ml-16 ">Airdrops</h1>
           
            </div>
            </div>
           <div className='flex w-1/2 h-[900px] flex-col gap-11'>
            {/* first  top right Section */}
          
            {/* Left content goes here */}
            <div className=' h-1/3 w-[100%] flex flex-col justify-end gap-4 '>
            <h1 className='text-white text-3xl mt-36  text-center font-extralight'>{`Hello ${user}, welcome`} </h1>
            <h1 className="text-white text-shadow-green text-9xl font-mono">Airdrophub </h1>
            <h2 className='text-xl text-[#FFFD37]'>Welcome to our blog, your go-to source for the latest in crypto airdrops!
            Welcome to our blog, your go-to source for the latest in crypto airdrops!
            </h2>
           
            </div>




            
         

          {/* first  bottom right Section */}
          <div className='w-[100%] h-[60%] mt-40'>
            <img className='h-[100%] w-[80%]  mr-20' src="/AIRDROP.png" alt="" />
            </div>
            </div>
        </div>
         
         <hr />
        
       <div className="w-full min-h-screen flex gap-5  justify-center mt-11 ">
       <Boxclone title="Allora" url = "/1.jpg" description="Tier1 airdrop" />
       <Boxclone title="Chasm" url = "/2.png" description="Tier1 airdrop" />
       <Boxclone  title="Nubit" url = "/3.jpg" description="Tier1 airdrop" />
       <Boxclone title="Gainet" url = "/4.jpg" description="Tier1 airdrop" />
        </div>
       
       
        {/* Footer Section */}
       
        
      </div>
    </>
  );
}

export default Home;