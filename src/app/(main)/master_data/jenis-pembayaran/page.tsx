import { getJenisPembayaran, getKategoriTransaksi } from '@/lib/api/masterdata';
import JenisPembayaranClient from './_components/JenisPembayaranClient';

export const metadata = {
  title: 'Master Data: Kategori Transaksi',
};

export default async function JenisPembayaranPage() {
  const initialData = await getJenisPembayaran();

  return (
    <div className='p-4 sm:p-6'>
      <h1 className='text-2xl font-bold tracking-tight mb-4'>Jenis Pembayaran</h1>
      <p className='text-muted-foreground mb-6'>
        Kelola semua jenis pembayaran yang tersedia di sistem Anda.
      </p>

      <JenisPembayaranClient data={initialData} />
    </div>
  );
}
