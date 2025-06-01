'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
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

export default function DetailTransaksiPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const transaksi = transaksiData.find(t => t.id === id);

  if (!transaksi) {
    return (
      <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Detail Transaksi</h1>
        <p>Transaksi tidak ditemukan.</p>
        <Button onClick={() => router.push('/transaksi')} className='mt-4'>
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className='p-6 w-full mx-auto bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Detail Transaksi</h1>
      <div className='space-y-6'>
        <div>
          <h2 className='font-semibold text-gray-700'>Tanggal:</h2>
          <p>{transaksi.date}</p>
        </div>
        <div>
          <h2 className='font-semibold text-gray-700'>Deskripsi:</h2>
          <p>{transaksi.description}</p>
        </div>
        <div>
          <h2 className='font-semibold text-gray-700'>Jumlah:</h2>
          <p className={transaksi.amount < 0 ? 'text-red-600' : 'text-green-600'}>
            {formatRupiah(transaksi.amount)}
          </p>
        </div>
        <div>
          <h2 className='font-semibold text-gray-700'>Tipe:</h2>
          <p>{transaksi.type}</p>
        </div>
        <div>
          <h2 className='font-semibold text-gray-700'>Status:</h2>
          <Badge variant={transaksi.status === 'Selesai' ? 'default' : 'destructive'}>
            {transaksi.status}
          </Badge>
        </div>
      </div>
      <Button onClick={() => router.push('/transaksi')} className='mt-6'>
        Kembali
      </Button>
    </div>
  );
}
