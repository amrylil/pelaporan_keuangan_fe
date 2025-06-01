'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

export default function UpdateTransaksiPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const transaksi = transaksiData.find(t => t.id === id);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Pendapatan');
  const [status, setStatus] = useState('Selesai');

  useEffect(() => {
    if (transaksi) {
      setDate(transaksi.date);
      setDescription(transaksi.description);
      setAmount(transaksi.amount.toString());
      setType(transaksi.type);
      setStatus(transaksi.status);
    }
  }, [transaksi]);

  if (!transaksi) {
    return (
      <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Update Transaksi</h1>
        <p>Transaksi tidak ditemukan.</p>
        <Button onClick={() => router.push('/transaksi')} className='mt-4'>
          Kembali
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send updated data to backend or state management
    alert(
      `Transaksi diperbarui:\nTanggal: ${date}\nDeskripsi: ${description}\nJumlah: ${amount}\nTipe: ${type}\nStatus: ${status}`
    );
    router.push('/transaksi');
  };

  return (
    <div className='p-6 w-full mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Update Transaksi</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='date' className='block mb-1 font-medium text-sm text-gray-700'>
            Tanggal
          </label>
          <Input
            id='date'
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='description' className='block mb-1 font-medium text-sm text-gray-700'>
            Deskripsi
          </label>
          <Input
            id='description'
            type='text'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Deskripsi transaksi'
            required
          />
        </div>
        <div>
          <label htmlFor='amount' className='block mb-1 font-medium text-sm text-gray-700'>
            Jumlah
          </label>
          <Input
            id='amount'
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder='Jumlah transaksi'
            required
          />
        </div>
        <div>
          <label htmlFor='type' className='block mb-1 font-medium text-sm text-gray-700'>
            Tipe
          </label>
          <select
            id='type'
            value={type}
            onChange={e => setType(e.target.value)}
            className='w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          >
            <option value='Pendapatan'>Pendapatan</option>
            <option value='Pengeluaran'>Pengeluaran</option>
          </select>
        </div>
        <div>
          <label htmlFor='status' className='block mb-1 font-medium text-sm text-gray-700'>
            Status
          </label>
          <select
            id='status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            className='w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          >
            <option value='Selesai'>Selesai</option>
            <option value='Pending'>Pending</option>
          </select>
        </div>
        <div className='flex justify-between'>
          <Button type='submit'>Simpan</Button>
          <Button variant='outline' onClick={() => router.push('/transaksi')}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
