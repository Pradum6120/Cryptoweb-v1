import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { handleError , handleSuccess} from '../components/Utils'
import { ToastContainer } from 'react-toastify'

function SingnUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userData = {
    name,
    email,
    password

  }
   
  const navigate = useNavigate();
  
    

    const handleSubmitSignupForm = async (e)=>{
        e.preventDefault()
        console.log("working")
        if(!name || !email || !password){
          return handleError("some field are blank")
  
        }
        try {
          const url = "http://localhost:8000/api/v1/signup"
          const response = await fetch(url, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)

          })
          const result = await response.json();
          console.log(result)

          const {success, message}= result;
          if(success){
            setTimeout(()=>{
               navigate('/login')
            },1000)
          }

          console.log(response)
        } catch (error) {
          handleError(err);
          
        }

     }

  
 




  return (
    <>
  
    <div className='w-full h-screen  flex justify-center align-center' >
       
    <form onSubmit={handleSubmitSignupForm} className="flex gap-8 flex-col shadow-2xl w-[500px] h-[500px] justify-center items-center mt-11 mb-11 rounded-3xl bg-[url('/theme2.png')] bg-cover">
       <h1 className='text-4xl font-semibold'>Signup</h1>
      <input value={name}  onChange={(e)=> setName(e.target.value)} className='outline-none border-2 border-slate-600 rounded-2xl p-2 w-96'  type="text" placeholder='Enter Name' />
      <input value={email}   onChange={(e)=> setEmail(e.target.value)} className='outline-none border-2 border-slate-600 rounded-2xl p-2 w-96'  type="email" placeholder='Enter Email' />
      <input value={password} onChange={(e)=> setPassword(e.target.value)}  className='outline-none border-2 border-slate-600 rounded-2xl p-2 w-96'  type="password" placeholder='Enter Password' />
      <button className='bg-gradient-to-r from-[#FFFD37] to-[#00FF40] w-20 h-9  rounded-lg' type='submit'>Signup</button>
       <h1>Already Account ? <span><Link to="/login" className='text-yellow-300 font-semibold'>Login</Link></span></h1>
     </form>
     
    </div>
    </>
  )
}

export default SingnUp
