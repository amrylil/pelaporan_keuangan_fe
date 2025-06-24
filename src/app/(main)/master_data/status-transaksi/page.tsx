import { getStatusTransaksi } from '@/lib/api/masterdata';
import TipeClient from './_components/StatusTransaksiClient';

export const metadata = {
  title: 'Master Data: Status Transaksi',
};

export default async function StatusTransaksiPage() {
  const initialData = await getStatusTransaksi();

  return (
    <div className='p-4 sm:p-6'>
      <h1 className='text-2xl font-bold tracking-tight mb-4'>Status Transaksi</h1>
      <p className='text-muted-foreground mb-6'>
        Kelola semua Status Transaksi yang tersedia di sistem Anda.
      </p>

      <TipeClient data={initialData} />
    </div>
  );
}
