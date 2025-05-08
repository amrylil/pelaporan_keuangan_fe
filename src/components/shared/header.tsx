import {
  Bell,
  ChevronDown,
  Search,
  BarChart3,
  Calendar,
  HelpCircle,
  User,
  Plus,
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className='bg-white border-b border-slate-200 shadow-sm w-full sticky top-0 z-10'>
      <div className='flex flex-col w-full'>
        {/* Top bar with company branding and user controls */}
        <div className='flex items-center justify-between px-6 py-3 border-b border-slate-100'>
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
                <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'></span>
              </Button>
            </div>
            y{' '}
            <div className='flex items-center ml-2'>
              <div className='bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center'>
                <User className='h-4 w-4' />
              </div>
              <Button variant='ghost' className='flex items-center ml-1 text-slate-700'>
                <span className='text-sm font-medium'>Admin</span>
                <ChevronDown className='h-4 w-4 ml-1 opacity-70' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
