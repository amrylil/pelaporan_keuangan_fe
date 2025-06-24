import { getTipeTransaksi } from '@/lib/api/masterdata';
import TipeClient from './_components/TipeClient';

export const metadata = {
  title: 'Master Data: Tipe Transaksi',
};

export default async function TipeTransaksiPage() {
  const initialData = await getTipeTransaksi();

  return (
    <div className='p-4 sm:p-6'>
      <h1 className='text-2xl font-bold tracking-tight mb-4'>Tipe Transaksi</h1>
      <p className='text-muted-foreground mb-6'>
        Kelola semua Tipe Transaksi yang tersedia di sistem Anda.
      </p>

      <TipeClient data={initialData} />
    </div>
  );
}
