import React from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../store/auth';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { settoken } from '../store/UserSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

const {storetokenInLocalStorage} = useAuth()
const dispatch = useDispatch()

  const userLoginDetail = {
    email,
    password
  }

    const handleSubmitLoginForm = async (e)=>{
        e.preventDefault()
     try{
      const url = "http://localhost:8080/api/v1/login";
      const response = await fetch(url, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLoginDetail)

      });
      const data = await response.json();
      if(response.ok){
        if(data.success){
           storetokenInLocalStorage(data.jwt)
           toast.success('Login Successful!');
           dispatch(settoken(data.jwt))
          navigate('/');
        }
        else{
          setErrorMessage(data.message || 'login failed')

        }

  }
}
catch(error){
  console.error('Error logging in:', error);
  setErrorMessage('Network error. Please try again.');
}

     }

  return (
    <>

    <div className='w-full h-screen flex justify-center align-center ' >
       
    <form onSubmit={handleSubmitLoginForm} className="flex gap-8 flex-col shadow-2xl w-[500px] h-[500px] justify-center items-center mt-11 mb-11 rounded-3xl bg-[url('/theme2.png')] bg-cover ">
       <h1 className='text-4xl font-semibold'>Login</h1>
      <input value={email} onChange={(e)=> setEmail(e.target.value)} className='outline-none border-2 border-slate-600 rounded-2xl p-2 w-96'  type="email" placeholder='Enter Email' />
      <input value={password} onChange={(e)=> setPassword(e.target.value)}    className='outline-none border-2 border-slate-600 rounded-2xl p-2 w-96'  type="password" placeholder='Enter Password' />
      <button className='bg-gradient-to-r from-[#FFFD37] to-[#00FF40]  w-20 h-9  rounded-lg' type='submit'> Login </button>
      {errorMessage && <div className="text-red-700 mt-2">{errorMessage}</div>} {/* Display error message */}
       <h1>Don't have An account ?  <span><Link to="/signup" className='text-red-700'>Signup</Link></span></h1>
     </form>
     
    </div>
    </>
  )
}

export default Login
