'use client';

import { useActionState, useEffect } from 'react';
// [PERBAIKAN] Impor 'useActionState' dari 'react-dom'
import { useFormStatus } from 'react-dom';
import { TipeTransaksi } from '@/lib/api/masterdata';
import { createTipeTransaksi, updateTipeTransaksi } from '@/app/actions/masterdataActions';

interface TipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TipeTransaksi | null;
}

// Komponen Tombol Submit (Tidak ada perubahan)
function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-600/90 h-10 px-4 py-2'
    >
      {pending ? 'Menyimpan...' : isEditing ? 'Update Data' : 'Simpan Data'}
    </button>
  );
}

export default function TipeFormModal({ isOpen, onClose, initialData }: TipeFormModalProps) {
  // [PERBAIKAN] Gunakan 'useActionState'
  const [state, formAction] = useActionState(
    initialData ? updateTipeTransaksi.bind(null, initialData.id) : createTipeTransaksi,
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
      className='fixed inset-0 z-50 flex items-start justify-center bg-black  pt-16'
    >
      <div className='relative w-full max-w-lg rounded-lg border bg-background shadow-lg'>
        <div className='flex flex-col space-y-1.5 p-6'>
          <h3 className='font-semibold tracking-tight text-2xl'>
            {initialData ? 'Edit Tipe' : 'Tambah Tipe Baru'}
          </h3>
          <p className='text-sm text-muted-foreground'>
            Isi detail di bawah ini. Klik simpan jika sudah selesai.
          </p>
        </div>

        <form action={formAction}>
          <div className='p-6 pt-0 space-y-4'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium mb-1'>
                Nama Tipe
              </label>
              <input
                id='name'
                name='name'
                defaultValue={initialData?.name}
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                required
              />
              {state?.errors?.name && (
                <p className='text-sm font-medium text-red-500 mt-1'>{state.errors.name[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor='deskripsi' className='block text-sm font-medium mb-1'>
                Deskripsi (Opsional)
              </label>
              <textarea
                id='deskripsi'
                name='deskripsi'
                defaultValue={initialData?.deskripsi || ''}
                className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
              />
            </div>
            {state?.message && state.message !== 'success' && (
              <p className='text-sm font-medium text-red-500'>{state.message}</p>
            )}
          </div>

          <div className='flex items-center justify-end gap-2 p-6 pt-0'>
            <button
              type='button'
              onClick={onClose}
              className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 border'
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
