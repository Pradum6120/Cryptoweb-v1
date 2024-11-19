import React from 'react'
import { Link , NavLink} from 'react-router-dom'
import { useState } from 'react';



function Navbar() {

  const [isAuthenticated, setIsAuthenticated] = useState();


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(true);
    setUserName('');
    navigate('/login'); // Redirect to login page after logout
  };  


  return (
    
    <nav className="bg-trasparent flex items-center justify-center w-[100%] h-[80px] gap-2 ">
      
      <div className='ml-96 flex gap-6 w-[20%%]   justify-center'></div>
      
      <div className="flex justify-center text-white items-center gap-24 w-[60%] font-mono h-[100%]">
        <NavLink to="/" className="hover:text-blue-400 transition-colors">Home</NavLink>
        <NavLink to='/airdrops' className="hover:text-blue-400 transition-colors">Airdrops</NavLink>
        <NavLink to='/bookmarks' className="hover:text-blue-400 transition-colors">Bookmark</NavLink>
        <NavLink to='/admin' className="hover:text-blue-400 transition-colors">Admin</NavLink>
      
        
      </div>
     

      <div className='flex gap-9 w-[40%]  justify-center p-3'>
        { isAuthenticated ? <button onClick={handleLogout}
          className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600  py-2 px-4 rounded-md transition-colors"
        >
          Logout
        </button>
        : <NavLink to="/signup"
        className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] p-8  opacity-80 text-black hover:bg-green-600  text-center w-24 h-10 py-2 px-4 rounded-md transition-colors"
      >
        Sign Up
      </NavLink> 
        }

<NavLink to="/login"
        className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-24 h-10 py-2 px-4 rounded-md transition-colors"
      >
        Login
      </NavLink> 
 
      </div>
    
  </nav> 
 
       
          
  )
}

export default Navbar
