import React from 'react'
import { Link } from 'react-router-dom';

function Bigboxtwo({airdrop}) {
  const air = airdrop.data;
  return (
   
      <div className='h-[100%] w-screen flex justify-center items-center mb-28'>
      <div className='boder border-black shadow-2xl bg-white flex flex-col justify-center gap-11 items-center w-[90%] h-[80%] rounded-2xl'>

       <div className='border border-black h-[90%] w-[80%] p-2 mt-16 rounded-md'>
   <h1 className='text-2xl'>{air.content1}</h1>

    
    <Link to={air.url1}><h1 className='text-2xl mt-7 text-slate-600 font-extrabold'>{air.url1}</h1></Link>

    
       </div>

        <div className='border border-black h-[50%] w-[80%] rounded-md mb-16'>
          <img className='rounded-md h-[100%] w-[100%]' src={air.blogimage1} alt="" />
        </div>
      </div>

      
    </div>
   
  )
}

export default Bigboxtwo
