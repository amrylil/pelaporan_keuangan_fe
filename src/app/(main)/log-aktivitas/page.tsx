'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

const logData = [
  {
    id: 1,
    date: '2024-06-01 10:00',
    activity: 'User login',
    user: 'admin',
  },
  {
    id: 2,
    date: '2024-06-01 10:15',
    activity: 'Created new transaction #1',
    user: 'admin',
  },
  {
    id: 3,
    date: '2024-06-01 11:00',
    activity: 'Updated transaction #2',
    user: 'user1',
  },
  {
    id: 4,
    date: '2024-06-01 12:30',
    activity: 'Deleted transaction #3',
    user: 'admin',
  },
];

export default function LogAktivitasPage() {
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    return logData.filter(
      item =>
        item.activity.toLowerCase().includes(search.toLowerCase()) ||
        item.user.toLowerCase().includes(search.toLowerCase()) ||
        item.date.includes(search)
    );
  }, [search]);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Log Aktivitas</h1>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Cari aktivitas atau user...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='w-full max-w-sm rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
        />
      </div>
      <div className='overflow-x-auto border rounded-md'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                No
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Tanggal & Waktu
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Aktivitas
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                User
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredData.map((item, index) => (
              <tr key={item.id} className='hover:bg-gray-100'>
                <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.date}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.activity}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.user}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => alert(`Detail aktivitas: ${item.activity}`)}
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
