import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Discover from './pages/Discover';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { axiosIntance } from './lib/axios';
import { useAuthStore } from './store/useAuthStore';
import {Loader} from 'lucide-react';
import {Toaster} from 'react-hot-toast';
const App = () => {
  const {authUser , checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser)return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size=10 animate-spin'/>
    </div>
  )

  return (
    <div>
      <Navbar/>
    <Routes>
        <Route path="/" element = {authUser ? <Discover/> : <Navigate to= '/login'/>} />
        <Route path="/signup" element = {!authUser ? <Signup/> : <Navigate to= '/'/>} />
        <Route path="/login" element = {!authUser ? <Login/> : <Navigate to= '/'/>} />  
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App
