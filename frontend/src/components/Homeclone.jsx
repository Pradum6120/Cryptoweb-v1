import React from 'react';
import Navbar from './Navbar';
import Boxclone from './Boxclone';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../store/auth';

 

function Home() {
  const {user} = useAuth()


  return (
    <>
      <Navbar/>
    
      <div className="w-[100%] h-[100%] bg-[#718769] overflow-hidden flex flex-col justify-center items-center">
        {/* First Page: Split Screen */}
        <div className="flex w-screen justify-center p-9 mb-0 bg-[#718769] h-[100%] ">


          <div className='flex flex-col gap-11 w-1/ h-[100%] '>
          {/* first  top Left Section */}
          <div className="w-[100%] h-[590px] ">
            {/* Left content goes here */}
            <img className='h-[100%] w-[100%] ' src="/gradiant.png" alt="" />
           
          </div>
          
          {/* first  bottom left Section */}
          <div className='w-[100%] mt-16 h-[100%]  flex flex-col p-11 justify-center items-center'>
            <h1 className="text-green-800 text-8xl text-shadow-green mr-16 ">Tranding</h1>
            <h1 className="text-green-800 text-8xl text-shadow-green ml-16 ">Airdrops</h1>
           
            </div>
            </div>
           <div className='flex w-1/2 h-[900px] flex-col gap-11'>
            {/* first  top right Section */}
          
            {/* Left content goes here */}
            <div className=' h-1/3 w-[100%] flex flex-col justify-end gap-4 '>
            <h1 className='text-black text-3xl mt-36 text text-center font-extralight'>{`Hello ${user}, welcome`} </h1>
            <h1 className="text-green-800 text-shadow-green text-9xl">Airdrophub </h1>
            <h2 className='text-xl text-white'>Welcome to our blog, your go-to source for the latest in crypto airdrops!
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
        
       <div className="w-full min-h-screen flex gap-5 justify-center mt-11 bg-[#718769]">
       <Boxclone title="Allora" url = "/1.jpg" description="Tier1 airdrop" />
       <Boxclone title="Chasm" url = "/2.png" description="Tier1 airdrop" />
       <Boxclone  title="Nubit" url = "/3.jpg" description="Tier1 airdrop" />
       <Boxclone title="Gainet" url = "/4.jpg" description="Tier1 airdrop" />
        </div>
       
       
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







const [user, setUser] = useState("")
const [token, setToken] = useState(localStorage.getItem("token"));

const AuthorizationToken = `Bearer ${token}`

const userAuthentication = async ()=>{
try {
 const response = await fetch("http://localhost:8000/api/v1/user", {
     method: 'GET',
     headers:{
         Authorization: AuthorizationToken,
     }
 });

 if(response.ok) {
     const data = await response.json()
     console.log("userdata", data)
     setUser(data.user.name)
 }
 else{
     console.log("error while fetching user data")
 }
 
} catch (error) {
 console.error("error fetching user data") 
}
}










//

useEffect(() => {

const token = localStorage.getItem('token');
if (!token) {
  // Redirect user to login page if token is not present
  navigate('/login');
}
}, [navigate]);


useEffect(()=>{
userAuthentication()
},[])