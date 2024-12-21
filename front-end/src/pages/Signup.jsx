import React, { useState } from 'react';
import { Music, User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format');
    if (!formData.password.trim()) return toast.error('Password is required');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div
      className="min-h-screen grid lg:grid-cols-2"
      style={{
        background: `linear-gradient(to bottom right, #f7e7ce, #fff8e7)`,
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-[rgba(255,255,255,0.5)] backdrop-blur-lg rounded-xl p-6 shadow-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[rgba(125,90,74,0.2)] flex items-center justify-center">
                <Music className="w-6 h-6 text-[#7d5a4a]" />
              </div>
              <h1 className="text-3xl font-bold text-[#7d5a4a]">Create Account</h1>
              <p className="text-[#a99281]">Get started with your free account</p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#7d5a4a]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a99281]" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(255,255,255,0.2)] text-[#7d5a4a] border-none placeholder-[#a99281] focus:ring-2 focus:ring-[#d7bba6] focus:outline-none"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#7d5a4a]">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a99281]" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(255,255,255,0.2)] text-[#7d5a4a] border-none placeholder-[#a99281] focus:ring-2 focus:ring-[#d7bba6] focus:outline-none"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#7d5a4a]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a99281]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-2 rounded-lg bg-[rgba(255,255,255,0.2)] text-[#7d5a4a] border-none placeholder-[#a99281] focus:ring-2 focus:ring-[#d7bba6] focus:outline-none"
                    placeholder="......"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a99281] hover:text-[#7d5a4a]"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#7d5a4a] hover:bg-[#614737] text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d7bba6] transition duration-150"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing Up...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-[#a99281]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#7d5a4a] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="hidden lg:flex flex-col justify-center items-center text-center px-6 sm:px-12">
        <h2 className="text-4xl font-bold text-[#7d5a4a] mb-6">Unleash the power of music with Bazz Music</h2>
        <p className="text-lg text-[#a99281] mb-8">
        – Where every beat brings you closer to the sound of your soul!
        </p>
        <p className="text-sm text-[#a99281]">
          Start exploring and immerse yourself in a world of music, entertainment, and more.
        </p>
      </div>
    </div>
  );
};

export default Signup;
