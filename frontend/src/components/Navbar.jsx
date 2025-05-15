import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='flex justify-center lg:w-screen h-[7vh] max-h-screen bg-transparent   items-center '>
      <div className='flex text-white lg:gap-14 lg:w-[70%]  lg:text-[2.1vh]  gap-10 justify-center text-[1.5vh]'>
         <NavLink to="/" className="hover:text-blue-400 transition-colors">Home</NavLink>
        <NavLink to="/airdrops" className="hover:text-blue-400 transition-colors">Airdrops</NavLink>
        <NavLink to="/bookmarks" className="hover:text-blue-400 transition-colors">Bookmark</NavLink>
        <NavLink to="/store" className="hover:text-blue-400 transition-colors">Store</NavLink>
        <NavLink to="/admin" className="hover:text-blue-400 transition-colors">Admin</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
