import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Music, Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Both email and password are required!");
      return;
    }
    setError(null);
    login(formData);
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center'
      style={{
        background: `linear-gradient(to bottom right, #fff8e7, #f7e7ce), radial-gradient(circle at top left, rgba(255, 255, 255, 0.2), transparent)`,
        backgroundBlendMode: 'overlay, normal',
      }}
    >
      <div className='w-full max-w-md p-8 bg-[rgba(255,255,255,0.6)] backdrop-blur-md rounded-2xl shadow-lg'>
        {/* Logo Section */}
        <div className='text-center mb-6'>
          <div className='flex items-center justify-center w-16 h-16 rounded-full bg-[#f7e7ce] mx-auto'>
            <Music className='w-8 h-8 text-[#e4c89f]' />
          </div>
          <h1 className='text-3xl font-bold text-[#7d5a4a] mt-4'>Welcome Back!</h1>
          <p className='text-[#a98e7a]'>Sign in to continue your journey</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-[#e4b7a0] text-white text-sm font-medium p-3 rounded-lg mb-4'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            {/* Email Input */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-[#7d5a4a]'>
                Email Address
              </label>
              <div className='relative mt-1'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a98e7a]' />
                <input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='block w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.8)] text-[#7d5a4a] border-none rounded-lg focus:ring-2 focus:ring-[#e4c89f] sm:text-sm placeholder-[#c8a891]'
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-[#7d5a4a]'>
                Password
              </label>
              <div className='relative mt-1'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a98e7a]' />
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className='block w-full pl-10 pr-12 py-2 bg-[rgba(255,255,255,0.8)] text-[#7d5a4a] border-none rounded-lg focus:ring-2 focus:ring-[#e4c89f] sm:text-sm placeholder-[#c8a891]'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a98e7a] hover:text-[#e4c89f]'
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full py-2 px-4 bg-[#e4c89f] hover:bg-[#d3ae8c] text-[#7d5a4a] font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4b7a0] focus:ring-offset-2 transition duration-150 ease-in-out'
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <div className='flex items-center justify-center space-x-2'>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    <span>Logging In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className='mt-6 text-center'>
          <p className='text-[#a98e7a]'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-[#e4c89f] hover:text-[#d3ae8c]'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
