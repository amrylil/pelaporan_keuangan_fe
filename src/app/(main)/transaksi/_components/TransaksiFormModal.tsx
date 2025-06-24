'use client';

import { createTransaksi, updateTransaksi } from '@/app/actions/transaksiActions';
import {
  JenisPembayaran,
  KategoriTransaksi,
  StatusTransaksi,
  TipeTransaksi,
} from '@/lib/api/masterdata';
import { Transaksi } from '@/lib/api/transaksi';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

interface TransaksiFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Transaksi | null;
  statusList: StatusTransaksi[] | null;
  tipeList: TipeTransaksi[] | null;
  kategoriList: KategoriTransaksi[] | null;
  jenisPembayaranList: JenisPembayaran[] | null;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50'
    >
      {pending ? 'Menyimpan...' : isEditing ? 'Update' : 'Simpan'}
    </button>
  );
}

export default function TransaksiFormModal({
  isOpen,
  onClose,
  initialData,
  statusList,
  jenisPembayaranList,
  kategoriList,
  tipeList,
}: TransaksiFormModalProps) {
  const [state, formAction] = useActionState(
    initialData ? updateTransaksi.bind(null, String(initialData.id)) : createTransaksi,
    { message: null, errors: {} }
  );

  useEffect(() => {
    if (state?.message === 'success') {
      onClose();
    }
  }, [state, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    >
      <div className='bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='p-4 border-b'>
          <h3 className='text-lg font-semibold'>
            {initialData ? 'Edit Transaksi' : 'Tambah Transaksi'}
          </h3>
        </div>

        {/* Form */}
        <form action={formAction}>
          <div className='p-4 space-y-3'>
            <div>
              <label className='block text-sm font-medium mb-1'>Tanggal</label>
              <input
                type='date'
                name='tanggal'
                defaultValue={initialData?.tanggal || ''}
                required
                className='w-full border rounded px-3 py-2 text-sm'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Jumlah</label>
              <input
                type='number'
                name='jumlah'
                defaultValue={initialData?.jumlah || ''}
                required
                className='w-full border rounded px-3 py-2 text-sm'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Kategori</label>
              <select
                name='idKategori'
                defaultValue={initialData?.idKategori ?? ''}
                className='w-full border rounded px-3 py-2 text-sm'
              >
                <option value=''>Pilih Kategori</option>
                {kategoriList?.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Tipe Transaksi</label>
              <select
                name='idTipeTransaksi'
                defaultValue={initialData?.idTipeTransaksi ?? ''}
                className='w-full border rounded px-3 py-2 text-sm'
              >
                <option value=''>Pilih Tipe</option>
                {tipeList?.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Status</label>
              <select
                name='idStatusTransaksi'
                defaultValue={initialData?.idStatusTransaksi ?? ''}
                className='w-full border rounded px-3 py-2 text-sm'
              >
                <option value=''>Pilih Status</option>
                {statusList?.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Jenis Pembayaran</label>
              <select
                name='idJenisPembayaran'
                defaultValue={initialData?.idJenisPembayaran ?? ''}
                className='w-full border rounded px-3 py-2 text-sm'
              >
                <option value=''>Pilih Jenis Pembayaran</option>
                {jenisPembayaranList?.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>ID User</label>
              <input
                type='text'
                name='idUser'
                defaultValue={initialData?.idUser || ''}
                required
                className='w-full border rounded px-3 py-2 text-sm'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Keterangan</label>
              <textarea
                name='keterangan'
                defaultValue={initialData?.keterangan || ''}
                className='w-full border rounded px-3 py-2 text-sm h-20 resize-none'
                placeholder='Masukkan keterangan...'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Komentar Manajer</label>
              <textarea
                name='komentarManajer'
                defaultValue={initialData?.komentarManajer || ''}
                className='w-full border rounded px-3 py-2 text-sm h-20 resize-none'
                placeholder='Komentar manajer...'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Bukti Transaksi</label>
              <input
                type='text'
                name='buktiTransaksi'
                defaultValue={initialData?.buktiTransaksi || ''}
                className='w-full border rounded px-3 py-2 text-sm'
                placeholder='Path atau nama file...'
              />
            </div>

            {state?.message && state.message !== 'success' && (
              <div className='text-red-600 text-sm bg-red-50 p-2 rounded'>{state.message}</div>
            )}
          </div>

          {/* Footer */}
          <div className='p-4 border-t flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border rounded text-sm hover:bg-gray-50'
            >
              Batal
            </button>
            <SubmitButton isEditing={!!initialData} />
          </div>
        </form>
      </div>
    </div>
  );
}
