import React from 'react'
import Boxclone from '../components/Boxclone';

function Home() {
  return (
  <div className="w-screen lg:w-screen h-100% lg:bg-cover flex flex-col justify-center items-center ">
      <div className='section1 w-[95%] h-[100%] '>
         <div className="w-full h-[30vh] mt-6  flex justify-center items-baseline relative bg-cover bg-center bg-black bg-opacity-5 bg-[url('/gradiant.png')]">
           <div className='w-[100%] p-8 flex flex-col gap-1 '>
             <h1 className='text-white lg:text-3xl lg:mt-36 font-extralight text-left ml-1 mt-4'>hello , pradum kumar </h1>
            <h1 className="text-white text-shadow-green text-5xl lg:text-9xl font-mono text-left mt-4">Airdrophub </h1>
            <h2 className='lg:text-xl text-base text-[#FFFD37] text-left backdrop-blur-none'>Welcome to our blog, your go-to source for the latest in crypto airdrops!Welcome to our blog, your go-to source for the latest in crypto airdrops!
            </h2>
           </div>
         </div>


         <div className="w-full h-[34vh] mt-6 flex ">
          <div className='flex flex-col w-[50%] justify-center items-center '>
            <h1 className="text-[#FFFD37] text-4xl lg:text-8xl font-mono mr-16 ">Tranding</h1>
            <h1 className="text-[#FFFD37] text-4xl lg:text-8xl font-mono  ml-16 ">Airdrops</h1>
            
          </div>
          <div className='flex flex-col w-[50%] justify-center items-center mt-5'>
               <img className='h-[70%] w-[82%] ' src="/AIRDROP.png" alt="" />
            </div>
          
         </div>
      </div>

      <div className=' w-[95%] flex justify-center items-center gap-8 flex-wrap p-5'>
       <Boxclone title="Allora" url = "/1.jpg" description="Tier1 airdrop" />
       <Boxclone title="Chasm" url = "/2.png" description="Tier1 airdrop" />
       <Boxclone  title="Nubit" url = "/3.jpg" description="Tier1 airdrop" />
       <Boxclone title="Gainet" url = "/4.jpg" description="Tier1 airdrop" />
      </div>
    </div>
  )
}

export default Home
