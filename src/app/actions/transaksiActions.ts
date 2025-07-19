'use server';

import { z } from 'zod';
import { revalidateTag } from 'next/cache';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// PERBAIKAN: Menghapus 'id_user' dari skema.
// Backend akan mengambilnya dari token.
const TransaksiSchema = z.object({
  nama_transaksi: z.string().min(1, 'Nama transaksi wajib diisi.'),
  tanggal: z.coerce.date({ required_error: 'Tanggal wajib diisi.' }),
  jumlah: z.coerce
    .number({ invalid_type_error: 'Jumlah harus berupa angka.' })
    .positive('Jumlah harus lebih besar dari 0.'),
  keterangan: z.string().optional(),
  id_tipe_transaksi: z.coerce
    .number({ invalid_type_error: 'Tipe transaksi tidak valid.' })
    .min(1, 'Tipe transaksi wajib dipilih.'),
  id_kategori: z.coerce
    .number({ invalid_type_error: 'Kategori tidak valid.' })
    .min(1, 'Kategori wajib dipilih.'),
  id_jenis_pembayaran: z.coerce
    .number({ invalid_type_error: 'Jenis pembayaran tidak valid.' })
    .min(1, 'Jenis pembayaran wajib dipilih.'),
  id_status_transaksi: z.coerce
    .number({ invalid_type_error: 'Status transaksi tidak valid.' })
    .min(1, 'Status transaksi wajib dipilih.'),
  bukti_transaksi: z.instanceof(File).optional(),
});

export type TransaksiFormState = {
  message: string | null;
  errors?: Record<string, string[]>;
};

export async function createTransaksi(
  prevState: TransaksiFormState,
  formData: FormData
): Promise<TransaksiFormState> {
  // Menghapus 'id_user' dari form data sebelum validasi agar tidak menyebabkan error
  formData.delete('id_user');

  const validatedFields = TransaksiSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'Input tidak valid. Periksa kembali data yang Anda masukkan.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Mengembalikan 'id_user' yang dihapus sementara agar bisa dikirim ke backend jika diperlukan
  // Namun, karena backend mengambil dari konteks, kita tidak perlu mengirimnya.
  // Cukup kirim formData yang sudah bersih.

  try {
    const response = await fetch(`${API_BASE_URL}/transaksi`, {
      method: 'POST',
      body: formData, // formData tidak lagi berisi id_user
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Gagal membuat transaksi di backend:', errorBody);
      return { message: `Gagal di server: ${errorBody.message || 'Terjadi kesalahan.'}` };
    }

    revalidateTag('transaksi');
    return { message: 'success' };
  } catch (error) {
    console.error('Error saat fetch ke backend:', error);
    return { message: 'Gagal terhubung ke server.' };
  }
}

export async function updateTransaksi(
  id: string,
  prevState: TransaksiFormState,
  formData: FormData
): Promise<TransaksiFormState> {
  formData.delete('id_user');

  const UpdateSchema = TransaksiSchema.partial();
  const validatedFields = UpdateSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    console.error('Update Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'Input untuk update tidak valid.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/transaksi/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return { message: `Gagal mengupdate: ${errorBody.message}` };
    }

    revalidateTag('transaksi');
    return { message: 'success' };
  } catch (error) {
    return { message: 'Terjadi kesalahan saat mengupdate.' };
  }
}

export async function deleteTransaksi(id: string) {
  try {
    await fetch(`${API_BASE_URL}/transaksi/${id}`, { method: 'DELETE' });
    revalidateTag('transaksi');
  } catch (error) {
    console.error('Gagal menghapus transaksi:', error);
  }
}
