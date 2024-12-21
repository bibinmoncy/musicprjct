import React,{useEffect, useState} from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Music, LogOut, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const {logout, authUser} = useAuthStore();
  const location = useLocation();
  
  const [currentPath, setCurrentPath] = useState(location.pathname);
    
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <header className='fixed w-full top-0 z-50 backdrop-blur-lg 
    bg-[rgba(230,230,250,0.3)] border border-[rgba(230,230,250,0.2)] 
    shadow-lg'>
      <div className='containerm mx-auto px-4 h-16'>
        <div className='flex items-center justify-between
        h-full'>
          <div className='flex items-center gap-8'>
              <Link to = "/" className='flex items-center gap-2.5 hover:opacity-80
              transition-all'>
                <div className='w-9 h-9  rounded-lg bg-primary/10  flex items-center
                 justify-center'>
                  <Music className='w-5 h-5 text--[#7d5a4a] mt-4'/>
                 </div>
                 <h1 className='text-lg font-bold text--[#7d5a4a] mt-4'>Bazz Music</h1>
              </Link>
          </div >

          <div className="flex items-center gap-2">
          {authUser ? (
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
          text-white bg-red-600 rounded-md hover:bg-red-700 transition-all"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      ) : currentPath === "/login" ? (
        <Link
          to="/signup"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
          text-white bg-green-600 rounded-md hover:bg-green-700 transition-all"
        >
          <LogIn className="w-5 h-5" />
          Sign Up
        </Link>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
          text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
        >
          <LogIn className="w-5 h-5" />
          Login
        </Link>
      )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;