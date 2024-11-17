import React from 'react'

function pageonehome() {
  return (
       
      <div className="flex w-[100%] h-[50%]">
          {/* Left Section */}
          <div className="w-[70%]   min-h-screen flex justify-center items-center">
            {/* Left content goes here */}
            <div className='w-[150%]'>
            <img className='h-full w-full' src="/gradiant.png" alt="" />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[50%] h-[100%] min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-black text-9xl mr-40 mb-3 ">Airdrophub </h1>
            <h2 className='mb-32 text-xl'>Welcome to our blog, your go-to source for the latest in crypto airdrops!</h2>
          </div>
        </div>
  )
}

export default pageonehome
