import React from 'react';
import Box from './Box';

function Section({ airdrop, pagination }) {
  return (
    <>
    <div className="flex items-center mr-5 ml-5 mt-9 mb-0 gap-5 justify-center h-[100%] flex-wrap ">
      {airdrop && airdrop.length > 0 ? (
        airdrop.map((air) => (
          <Box key={air.id} airdropy={air} />
        ))
      ) : (
        <div className=' w-full flex flex-col gap-24 justify-center items-center'>
        <h1 className='text-7xl p-10'>Fetching.......</h1> 
        <p className='text-5xl text-gray-100 bg-zinc-800'>server temporary down ! please try again </p>
        </div> 
      )}
    </div>
     <div className='flex gap-5 mt-20 justify-center'>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-24 h-10 py-2 px-4 rounded-md transition-colors">Previous</button>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-11 h-10 py-2 px-4 rounded-md transition-colors">1</button>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-11 h-10 py-2 px-4 rounded-md transition-colors">2</button>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-11 h-10 py-2 px-4 rounded-md transition-colors">3</button>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-11 h-10 py-2 px-4 rounded-md transition-colors">4</button>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-11 h-10 py-2 px-4 rounded-md transition-colors">5</button>
      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-11 h-10 py-2 px-4 rounded-md transition-colors">6</button>
      
      

      <button className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-24 h-10 py-2 px-4 rounded-md transition-colors">Next</button>
     </div>
    </>
  );
}

export default Section;
