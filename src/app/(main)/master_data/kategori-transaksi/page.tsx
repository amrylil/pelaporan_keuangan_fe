import { getKategoriTransaksi } from '@/lib/api/masterdata';
import KategoriClient from './_components/KategoriClient';

export const metadata = {
  title: 'Master Data: Kategori Transaksi',
};

export default async function KategoriTransaksiPage() {
  // Fetch data di server saat halaman dirender
  const initialData = await getKategoriTransaksi();

  return (
    <div className='p-4 sm:p-6'>
      <h1 className='text-2xl font-bold tracking-tight mb-4'>Kategori Transaksi</h1>
      <p className='text-muted-foreground mb-6'>
        Kelola semua kategori transaksi yang tersedia di sistem Anda.
      </p>

      <KategoriClient data={initialData} />
    </div>
  );
}
