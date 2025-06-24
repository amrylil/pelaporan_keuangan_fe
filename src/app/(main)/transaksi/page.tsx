import { getTransaksi } from '@/lib/api/transaksi'; // ganti sesuai path filemu
import TransaksiClient from './_components/TransaksiClients';
import {
  getJenisPembayaran,
  getKategoriTransaksi,
  getStatusTransaksi,
  getTipeTransaksi,
} from '@/lib/api/masterdata';

export const metadata = {
  title: 'Master Data: Transaksi',
};

export default async function TransaksiPage() {
  const [transaksi, statusList, tipeList, kategoriList, jenisPembayaranList] = await Promise.all([
    getTransaksi(),
    getStatusTransaksi(),
    getTipeTransaksi(),
    getKategoriTransaksi(),
    getJenisPembayaran(),
  ]);
  const initialData = await getTransaksi();

  return (
    <div className='p-4 sm:p-6'>
      <h1 className='text-2xl font-bold tracking-tight mb-4'>Transaksi</h1>
      <p className='text-muted-foreground mb-6'>
        Kelola semua data transaksi keuangan yang masuk ke sistem.
      </p>

      <TransaksiClient
        data={initialData}
        statusList={statusList}
        tipeList={tipeList}
        kategoriList={kategoriList}
        jenisPembayaranList={jenisPembayaranList}
      />
    </div>
  );
}
