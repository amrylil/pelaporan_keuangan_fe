'use client';

import { createTransaksi, updateTransaksi } from '@/app/actions/transaksiActions';
import {
  JenisPembayaran,
  KategoriTransaksi,
  StatusTransaksi,
  TipeTransaksi,
} from '@/lib/api/masterdata';
import { Transaksi } from '@/lib/api/transaksi';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  user_id?: number;
}

function getUserIdFromToken(): number | null {
  // Fungsi ini hanya akan berjalan di client-side, jadi aman.
  const token = Cookies.get('access_token');
  if (!token) {
    console.error('CLIENT LOG: Cookie access_token tidak ditemukan.');
    return null;
  }
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.user_id || null;
  } catch (error) {
    console.error('CLIENT LOG: Token tidak valid atau kedaluwarsa:', error);
    return null;
  }
}

interface TransaksiFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: any | null;
  statusList: StatusTransaksi[] | null;
  tipeList: TipeTransaksi[] | null;
  kategoriList: KategoriTransaksi[] | null;
  jenisPembayaranList: JenisPembayaran[] | null;
}

function SubmitButton({
  isEditing,
  isUserIdMissing,
}: {
  isEditing: boolean;
  isUserIdMissing: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending || isUserIdMissing}
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

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Hanya dijalankan sekali di client setelah komponen terpasang
    setUserId(getUserIdFromToken());
  }, []);

  useEffect(() => {
    if (state?.message === 'success') {
      onClose();
    }
  }, [state, onClose]);

  if (!isOpen) return null;

  const isUserIdMissing = !userId;

  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    >
      <div className='bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto'>
        <div className='p-4 border-b'>
          <h3 className='text-lg font-semibold'>
            {initialData ? 'Edit Transaksi' : 'Tambah Transaksi'}
          </h3>
        </div>

        <form action={formAction} key={initialData?.id || 'new'}>
          <input type='hidden' name='id_user' value={userId || ''} />
          {!initialData && <input type='hidden' name='id_status_transaksi' defaultValue='1' />}

          <div className='p-4 space-y-3'>
            {isUserIdMissing && (
              <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md font-medium'>
                Sesi pengguna tidak ditemukan. Silakan login kembali untuk melanjutkan.
              </div>
            )}

            {/* Nama Transaksi */}
            <div>
              <label className='block text-sm font-medium mb-1'>Nama Transaksi</label>
              <input
                type='text'
                name='nama_transaksi'
                defaultValue={initialData?.nama_transaksi || ''}
                required
                className='w-full border rounded px-3 py-2 text-sm'
                placeholder='Contoh: Pembelian ATK'
              />
              {state.errors?.nama_transaksi && (
                <p className='text-xs text-red-500 mt-1'>{state.errors.nama_transaksi[0]}</p>
              )}
            </div>

            {/* Tanggal */}
            <div>
              <label className='block text-sm font-medium mb-1'>Tanggal</label>
              <input
                type='date'
                name='tanggal'
                defaultValue={initialData?.tanggal?.split('T')[0] || ''}
                required
                className='w-full border rounded px-3 py-2 text-sm'
              />
              {state.errors?.tanggal && (
                <p className='text-xs text-red-500 mt-1'>{state.errors.tanggal[0]}</p>
              )}
            </div>

            {/* Jumlah */}
            <div>
              <label className='block text-sm font-medium mb-1'>Jumlah</label>
              <input
                type='number'
                name='jumlah'
                defaultValue={initialData?.jumlah || ''}
                required
                className='w-full border rounded px-3 py-2 text-sm'
              />
              {state.errors?.jumlah && (
                <p className='text-xs text-red-500 mt-1'>{state.errors.jumlah[0]}</p>
              )}
            </div>

            {/* Kategori */}
            <div>
              <label className='block text-sm font-medium mb-1'>Kategori</label>
              <select
                name='id_kategori'
                defaultValue={initialData?.id_kategori?.toString() ?? ''}
                required
                className='w-full border rounded px-3 py-2 text-sm'
              >
                <option value=''>Pilih Kategori</option>
                {kategoriList?.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {state.errors?.id_kategori && (
                <p className='text-xs text-red-500 mt-1'>{state.errors.id_kategori[0]}</p>
              )}
            </div>

            {/* Tipe Transaksi */}
            <div>
              <label className='block text-sm font-medium mb-1'>Tipe Transaksi</label>
              <select
                name='id_tipe_transaksi'
                defaultValue={initialData?.id_tipe_transaksi?.toString() ?? ''}
                required
                className='w-full border rounded px-3 py-2 text-sm'
              >
                <option value=''>Pilih Tipe</option>
                {tipeList?.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {state.errors?.id_tipe_transaksi && (
                <p className='text-xs text-red-500 mt-1'>{state.errors.id_tipe_transaksi[0]}</p>
              )}
            </div>

            {/* Status (Hanya ditampilkan saat edit) */}
            {initialData && (
              <div>
                <label className='block text-sm font-medium mb-1'>Status</label>
                <select
                  name='id_status_transaksi'
                  defaultValue={initialData?.id_status_transaksi?.toString() ?? ''}
                  required
                  className='w-full border rounded px-3 py-2 text-sm'
                >
                  <option value=''>Pilih Status</option>
                  {statusList?.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {state.errors?.id_status_transaksi && (
                  <p className='text-xs text-red-500 mt-1'>{state.errors.id_status_transaksi[0]}</p>
                )}
              </div>
            )}

            {/* Jenis Pembayaran */}
            <div>
              <label className='block text-sm font-medium mb-1'>Jenis Pembayaran</label>
              <select
                name='id_jenis_pembayaran'
                defaultValue={initialData?.id_jenis_pembayaran?.toString() ?? ''}
                required
                className='w-full border rounded px-3 py-2 text-sm'
              >
                <option value=''>Pilih Jenis Pembayaran</option>
                {jenisPembayaranList?.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {state.errors?.id_jenis_pembayaran && (
                <p className='text-xs text-red-500 mt-1'>{state.errors.id_jenis_pembayaran[0]}</p>
              )}
            </div>

            {/* Keterangan */}
            <div>
              <label className='block text-sm font-medium mb-1'>Keterangan</label>
              <textarea
                name='keterangan'
                defaultValue={initialData?.keterangan || ''}
                className='w-full border rounded px-3 py-2 text-sm h-20 resize-none'
                placeholder='Masukkan keterangan tambahan (opsional)...'
              />
            </div>

            {/* Komentar Manajer (Hanya ditampilkan saat edit) */}
            {initialData && (
              <div>
                <label className='block text-sm font-medium mb-1'>Komentar Manajer</label>
                <textarea
                  name='komentar_manajer'
                  defaultValue={initialData?.komentar_manajer || ''}
                  className='w-full border rounded px-3 py-2 text-sm h-20 resize-none'
                  placeholder='Komentar manajer...'
                />
              </div>
            )}

            {/* Bukti Transaksi */}
            <div>
              <label className='block text-sm font-medium mb-1'>Bukti Transaksi (Opsional)</label>
              <input
                type='file'
                name='bukti_transaksi'
                className='w-full border rounded px-3 py-2 text-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              />
              {initialData?.bukti_transaksi && (
                <p className='text-xs text-gray-500 mt-1'>
                  File saat ini:{' '}
                  <a
                    href={initialData.bukti_transaksi}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    Lihat Bukti
                  </a>
                  . Unggah file baru untuk mengganti.
                </p>
              )}
              {state.errors?.bukti_transaksi && (
                <p className='text-xs text-red-500 mt-1'>{state.errors.bukti_transaksi[0]}</p>
              )}
            </div>

            {/* Pesan Error Global */}
            {state?.message && state.message !== 'success' && (
              <div className='text-red-600 text-sm bg-red-50 p-2 rounded'>{state.message}</div>
            )}
          </div>

          <div className='p-4 border-t flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border rounded text-sm hover:bg-gray-50'
            >
              Batal
            </button>
            <SubmitButton isEditing={!!initialData} isUserIdMissing={isUserIdMissing} />
          </div>
        </form>
      </div>
    </div>
  );
}
