import React from 'react';
import Navbar from './Navbar';


function Home() {
  return (
    <>
      <Navbar/>
      <div className="min-w-[100vh] h-[100%] bg-gradient-to-r  bg-[#718769] overflow-hidden flex justify-center flex-col items-center">
        {/* First Page: Split Screen */}
        <div className="flex w-screen bg-[#718769] h-[600px]">
          {/* Left Section */}
          <div className="w-[70%] min-h-screen flex justify-center items-center">
            {/* Left content goes here */}
            <div className='w-[150%]'>
            <img className='h-full w-full' src="/gradiant.png" alt="" />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[50%] min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-green-800 text-shadow-green text-9xl mr-40 mb-3 ">Airdrophub </h1>
            <h2 className='mb-32 text-xl'>Welcome to our blog, your go-to source for the latest in crypto airdrops!</h2>
          </div>
        </div>
         <hr />
         
        {/* Second Page: Pink Background */}

        <div className="w-[100%] h-[60%]  bg-[#718769]  ">
          <div className="w-[100%] h-[50%] flex justify-center items-center"> 
            <div className='w-1/2 flex h-[100%] flex-col justify-center items-center'>
            <h1 className="text-green-800 text-8xl text-shadow-green mr-11">Tranding</h1>
            <h1 className="text-green-800 text-8xl text-shadow-green ml-28 ">Airdrop</h1>
            </div>
        
        
             <div className='w-1/2 h-[500px] border border-slate-900 '>
                <div className='h-[100%] w-[100%]'>
                <img  className='h-[700px] w-[100%] mb-16' src="/AIRDROP.png" alt="" />
                </div>
                
             </div>
          </div>
        </div>
<hr />
<div className="w-full min-h-screen  bg-[#718769]">
          <div className="p-8 flex "> 
            
          </div>
        </div>
       {/* for box*/}

      
       
       
        {/* Footer Section */}
        <div className="w-full bg-zinc-800 min-h-[100px]">
          <div className="p-8 flex justify-center items-center">
            <h1 className="text-lg text-white">Developed by Pradum Kumar @2024</h1>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Home;
