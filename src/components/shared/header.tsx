'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Gunakan ini untuk redirect
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Bell, ChevronDown, Search, BarChart3, User, LogOut, Settings } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';

// Definisikan interface untuk payload token
interface JwtPayload {
  user_id: string;
  exp: number;
}

const Header = () => {
  const [userName, setUserName] = useState('Memuat...');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref untuk dropdown

  // Fungsi untuk handle logout
  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    router.push('/login'); // Arahkan ke halaman login
  };

  // Effect untuk mengambil data pengguna
  useEffect(() => {
    const fetchUserData = async (token: string, userId: string) => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Gagal mengambil data pengguna');
        const result = await response.json();
        setUserName(result.data?.name || 'Pengguna');
      } catch (error) {
        console.error('Error saat mengambil detail pengguna:', error);
        setUserName('Gagal Memuat');
      }
    };

    const token = Cookies.get('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if (decodedToken.user_id) {
          fetchUserData(token, decodedToken.user_id);
        }
      } catch (error) {
        console.error('Token tidak valid:', error);
        setUserName('Sesi Invalid');
      }
    } else {
      setUserName('Tamu');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='bg-white border-b border-slate-200 shadow-sm w-full sticky top-0 z-20'>
      <div className='flex items-center justify-between px-6 py-3'>
        <div className='flex items-center space-x-4'>
          <SidebarTrigger className='text-slate-600 hover:text-blue-600' />
          <div className='flex items-center'>
            <BarChart3 className='h-5 w-5 text-blue-600 mr-2' />
            <span className='font-semibold text-lg text-slate-800'>Administrator</span>
          </div>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='relative'>
            <Search className='absolute left-3 top-2.5 h-4 w-4 text-slate-400' />
            <Input
              type='search'
              placeholder='Cari laporan atau transaksi...'
              className='pl-9 w-72 bg-slate-50 border-slate-200 rounded-full text-sm focus:border-blue-400 focus:ring-blue-200'
            />
          </div>
          <div className='relative'>
            <Button variant='ghost' size='icon' className='hover:bg-blue-50'>
              <Bell className='h-5 w-5 text-slate-600' />
              <span className='absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center'>
                3
              </span>
            </Button>
          </div>

          {/* User Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <Button
              variant='ghost'
              className='flex items-center ml-1 text-slate-700 hover:bg-slate-100 px-2 py-1.5 rounded-lg'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className='bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-2'>
                <User className='h-4 w-4' />
              </div>
              <span className='text-sm font-medium'>{userName}</span>
              <ChevronDown
                className={`h-4 w-4 ml-1 opacity-70 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-30'>
                <a
                  href='/profile'
                  className='flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100'
                >
                  <Settings className='h-4 w-4 mr-2' />
                  Profil & Pengaturan
                </a>
                <button
                  onClick={handleLogout}
                  className='flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                >
                  <LogOut className='h-4 w-4 mr-2' />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
