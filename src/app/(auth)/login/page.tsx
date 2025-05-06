"use client";

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Masuk dengan:', email, password);
  };

  return (
    <div className="flex items-center justify-center  min-h-screen  ">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-4 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13 12H3" />
            </svg>
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold text-gray-900 mb-2">Masuk ke Akun</h1>
        <p className="text-center text-gray-600 mb-8">
          Buat dokumen baru untuk menghubungkan kata, data,<br />dan tim Anda. Gratis.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="bg-gray-50 rounded-xl flex items-center px-4 py-3 border border-gray-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-3">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="Email Anda"
                className="bg-transparent w-full outline-none text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="bg-gray-50 rounded-xl flex items-center px-4 py-3 border border-gray-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-3">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kata Sandi"
                className="bg-transparent w-full outline-none text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <button type="button" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Lupa kata sandi?
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-3.5 font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
          >
            Mulai Sekarang
          </button>
        </form>

        {/* Social login */}
        <div className="mt-8">
          <div className="relative flex items-center justify-center text-gray-500 text-sm mb-6">
            <div className="border-t border-gray-200 absolute w-full"></div>
            <span className="bg-white px-4 relative">Atau masuk dengan</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button className="flex justify-center bg-white rounded-xl p-3 shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 transition-all">
              <FcGoogle size={24} />
            </button>
            <button className="flex justify-center bg-white rounded-xl p-3 shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 transition-all">
              <FaFacebook size={24} className="text-blue-600" />
            </button>
            <button className="flex justify-center bg-white rounded-xl p-3 shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 transition-all">
              <FaApple size={24} className="text-gray-800" />
            </button>
          </div>
        </div>

        {/* Register link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Belum punya akun?{" "}
            <a href="/register" className="text-indigo-600 font-semibold hover:text-indigo-800">
              Daftar Sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}