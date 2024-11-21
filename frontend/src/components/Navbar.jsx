import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth'; // Assuming this is your custom auth hook

function Navbar() {
  const { token } = useAuth();  // Get the token from the context
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track authentication state
  const navigate = useNavigate();  // For navigation after logout

  // Effect to check if the user is authenticated on mount
  useEffect(() => {
    // Check if a valid token exists in localStorage
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, [token]);  // This will re-run whenever the token changes (if you update it)

  // Handle logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);  // Update the auth state to false
    
    // Optionally, clear any other user-specific data here (e.g., username)
    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <nav className="bg-transparent flex items-center justify-center w-[100%] h-[80px] gap-2">
      <div className="ml-96 flex gap-6 w-[20%] justify-center"></div>

      <div className="flex justify-center text-white items-center gap-24 w-[60%] font-mono h-[100%]">
        <NavLink to="/" className="hover:text-blue-400 transition-colors">Home</NavLink>
        <NavLink to="/airdrops" className="hover:text-blue-400 transition-colors">Airdrops</NavLink>
        <NavLink to="/bookmarks" className="hover:text-blue-400 transition-colors">Bookmark</NavLink>
        <NavLink to="/admin" className="hover:text-blue-400 transition-colors">Admin</NavLink>
      </div>

      <div className="flex gap-9 w-[40%] justify-center p-3">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 ml-48 py-2 px-4 rounded-md transition-colors"
          >
            Logout
          </button>
        ) : (
          <div className="gap-7 flex">
            <NavLink
              to="/signup"
              className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] p-8 opacity-80 text-black hover:bg-green-600 text-center w-24 h-10 py-2 px-4 rounded-md transition-colors"
            >
              Sign Up
            </NavLink>

            <NavLink
              to="/login"
              className="bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black hover:bg-green-600 text-center w-24 h-10 py-2 px-4 rounded-md transition-colors"
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
