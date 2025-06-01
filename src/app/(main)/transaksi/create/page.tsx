'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CreateTransaksiPage() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Pendapatan');
  const [status, setStatus] = useState('Selesai');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send data to backend or state management
    alert(
      `Transaksi dibuat:\nTanggal: ${date}\nDeskripsi: ${description}\nJumlah: ${amount}\nTipe: ${type}\nStatus: ${status}`
    );
    router.push('/transaksi');
  };

  return (
    <div className='p-6 w-full mx-auto bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6 '>Buat Transaksi Baru</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
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
