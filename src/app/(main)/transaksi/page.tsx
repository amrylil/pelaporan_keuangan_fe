'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const transaksiData = [
  {
    id: 1,
    date: '2024-06-01',
    description: 'Penjualan Produk A',
    amount: 1500000,
    type: 'Pendapatan',
    status: 'Selesai',
  },
  {
    id: 2,
    date: '2024-06-02',
    description: 'Pembelian Bahan Baku',
    amount: -500000,
    type: 'Pengeluaran',
    status: 'Selesai',
  },
  {
    id: 3,
    date: '2024-06-03',
    description: 'Pembayaran Gaji Karyawan',
    amount: -2000000,
    type: 'Pengeluaran',
    status: 'Pending',
  },
  {
    id: 4,
    date: '2024-06-04',
    description: 'Pendapatan Jasa Konsultasi',
    amount: 3000000,
    type: 'Pendapatan',
    status: 'Selesai',
  },
];

function formatRupiah(amount: number) {
  const sign = amount < 0 ? '-' : '';
  const rupiah = Math.abs(amount).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return sign + rupiah;
}

export default function TransaksiPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);

  const filteredData = useMemo(() => {
    return transaksiData.filter(item => {
      const matchesSearch =
        item.description.toLowerCase().includes(search.toLowerCase()) || item.date.includes(search);
      const matchesStatus = filterStatus ? item.status === filterStatus : true;
      const matchesType = filterType ? item.type === filterType : true;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, filterStatus, filterType]);

  return (
    <div className='p-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
        <h1 className='text-2xl font-bold'>Laporan Transaksi</h1>
        <Button onClick={() => router.push('/transaksi/create')}>Buat Transaksi Baru</Button>
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-4'>
        <Input
          placeholder='Cari berdasarkan tanggal atau deskripsi...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='max-w-sm'
        />
        <select
          value={filterStatus || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterStatus(e.target.value || undefined)
          }
          className='w-40 rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
        >
          <option value=''>Semua Status</option>
          <option value='Selesai'>Selesai</option>
          <option value='Pending'>Pending</option>
        </select>
        <select
          value={filterType || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterType(e.target.value || undefined)
          }
          className='w-40 rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
        >
          <option value=''>Semua Tipe</option>
          <option value='Pendapatan'>Pendapatan</option>
          <option value='Pengeluaran'>Pengeluaran</option>
        </select>
      </div>

      <div className='overflow-x-auto border rounded-md'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                No
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Tanggal
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Deskripsi
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Jumlah
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Tipe
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredData.map((item, index) => (
              <tr
                key={item.id}
                className='hover:bg-gray-100 cursor-pointer'
                onClick={() => router.push(`/transaksi/detail/${item.id}`)}
              >
                <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.date}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.description}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-right ${
                    item.amount < 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {formatRupiah(item.amount)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.type}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Badge variant={item.status === 'Selesai' ? 'success' : 'warning'}>
                    {item.status}
                  </Badge>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={e => {
                      e.stopPropagation();
                      router.push(`/transaksi/update/${item.id}`);
                    }}
                  >
                    Edit
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
