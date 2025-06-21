'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { JenisPembayaran } from '@/lib/api/masterdata';
import { deleteJenisPembayaran } from '@/app/actions/masterdataActions';
import JenisPembayaranFormModal from './JenisPembayaranModal';

interface JenisPembayaranClientProps {
  data: JenisPembayaran[];
}

export default function JenisPembayaranClient({ data }: JenisPembayaranClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<JenisPembayaran | null>(null);
  const [modalKey, setModalKey] = useState(Date.now());

  const handleAddNew = () => {
    setEditingData(null);
    setIsModalOpen(true);
    setModalKey(Date.now());
  };

  const handleEdit = (jenisPembayaran: JenisPembayaran) => {
    console.log('Tombol Edit Ditekan. Data yang akan diedit:', jenisPembayaran);
    console.log('ID yang akan dikirim untuk UPDATE:', jenisPembayaran.id);

    setEditingData(jenisPembayaran);
    setIsModalOpen(true);
    setModalKey(Date.now());
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini? Aksi ini tidak dapat dibatalkan.')) {
      await deleteJenisPembayaran(id);
      router.refresh();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleAddNew}
        className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-600/90 h-10 px-4 py-2 mb-6'
      >
        <PlusCircle className='mr-2 h-4 w-4' />
        Tambah Jenis Pembayaran
      </button>

      {isModalOpen && (
        <JenisPembayaranFormModal
          key={modalKey}
          isOpen={isModalOpen}
          onClose={closeModal}
          initialData={editingData}
        />
      )}

      <div className='rounded-lg border shadow-sm'>
        <table className='w-full caption-bottom text-sm'>
          <thead className='[&_tr]:border-b'>
            <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Nama
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Deskripsi
              </th>
              <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className='[&_tr:last-child]:border-0'>
            {data && data.length > 0 ? (
              data.map(item => (
                <tr key={item.id} className='border-b transition-colors hover:bg-muted/50'>
                  <td className='p-4 align-middle font-medium'>{item.name}</td>
                  <td className='p-4 align-middle text-muted-foreground'>{item.deskripsi}</td>
                  <td className='p-4 align-middle text-right'>
                    <div className='flex justify-end gap-2'>
                      <button
                        onClick={() => handleEdit(item)}
                        className='p-2 hover:text-yellow-600'
                        title='Edit'
                      >
                        <Edit className='h-4 w-4' />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className='p-2 hover:text-red-600'
                        title='Hapus'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className='p-4 text-center text-muted-foreground'>
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
