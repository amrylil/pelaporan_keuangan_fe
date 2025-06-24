'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { deleteTransaksi } from '@/app/actions/transaksiActions';
import { Transaksi } from '@/lib/api/transaksi';
import TransaksiFormModal from './TransaksiFormModal';
import {
  JenisPembayaran,
  KategoriTransaksi,
  StatusTransaksi,
  TipeTransaksi,
} from '@/lib/api/masterdata';

interface TransaksiProps {
  data: Transaksi[];
  statusList: StatusTransaksi[];
  tipeList: TipeTransaksi[];
  kategoriList: KategoriTransaksi[];
  jenisPembayaranList: JenisPembayaran[];
}

export default function TransaksiClient({
  data,
  statusList,
  tipeList,
  kategoriList,
  jenisPembayaranList,
}: TransaksiProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Transaksi | null>(null);
  const [modalKey, setModalKey] = useState(Date.now());

  const handleAddNew = () => {
    setEditingData(null);
    setIsModalOpen(true);
    setModalKey(Date.now());
  };

  const handleEdit = (transaksi: Transaksi) => {
    setEditingData(transaksi);
    setIsModalOpen(true);
    setModalKey(Date.now());
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      await deleteTransaksi(id);
      router.refresh();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-lg font-semibold'>Daftar Transaksi</h2>
        <button
          onClick={handleAddNew}
          className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
        >
          <PlusCircle className='w-4 h-4 mr-2' />
          Tambah Transaksi
        </button>
      </div>

      {isModalOpen && (
        <TransaksiFormModal
          key={modalKey}
          isOpen={isModalOpen}
          onClose={closeModal}
          initialData={editingData}
          statusList={statusList}
          tipeList={tipeList}
          kategoriList={kategoriList}
          jenisPembayaranList={jenisPembayaranList}
        />
      )}

      <div className='overflow-x-auto rounded-lg border bg-white shadow-sm'>
        <table className='w-full text-sm text-left text-gray-700'>
          <thead className='bg-gray-100 text-gray-600 uppercase'>
            <tr>
              <th className='px-4 py-3'>Tanggal</th>
              <th className='px-4 py-3'>Jumlah</th>
              <th className='px-4 py-3'>Kategori</th>
              <th className='px-4 py-3'>Tipe</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3 text-right'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map(item => (
                <tr key={item.id} className='border-t hover:bg-gray-50'>
                  <td className='px-4 py-3'>{item.tanggal}</td>
                  <td className='px-4 py-3'>Rp {item.jumlah.toLocaleString()}</td>
                  <td className='px-4 py-3'>{item.kategori?.nama || '-'}</td>
                  <td className='px-4 py-3'>{item.tipeTransaksi?.nama || '-'}</td>
                  <td className='px-4 py-3'>{item.statusTransaksi?.nama || '-'}</td>
                  <td className='px-4 py-3 text-right'>
                    <div className='flex justify-end gap-2'>
                      <button
                        onClick={() => handleEdit(item)}
                        className='p-2 rounded hover:bg-yellow-100 text-yellow-600'
                        title='Edit'
                      >
                        <Edit className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => handleDelete(String(item.id))}
                        className='p-2 rounded hover:bg-red-100 text-red-600'
                        title='Hapus'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='px-4 py-6 text-center text-gray-500'>
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
