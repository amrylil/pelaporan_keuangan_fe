'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const API_BASE_URL = 'http://localhost:8000/api/v1'; // <-- GANTI DENGAN URL API ANDA

/**
 * [BARU] Definisikan tipe untuk state form kita.
 * Ini akan digunakan di semua action dan komponen terkait.
 */
export type KategoriFormState = {
  message: string | null;
  errors?: {
    name?: string[];
    deskripsi?: string[];
  };
};

// Skema validasi menggunakan Zod
const KategoriSchema = z.object({
  name: z.string().min(3, { message: 'Name kategori minimal 3 karakter' }),
  deskripsi: z.string().optional(),
});

/**
 * ACTION: Membuat Kategori Transaksi baru.
 * [DIUBAH]: prevState sekarang menggunakan tipe KategoriFormState.
 */
export async function createKategori(
  prevState: KategoriFormState,
  formData: FormData
): Promise<KategoriFormState> {
  const validatedFields = KategoriSchema.safeParse({
    name: formData.get('name'),
    deskripsi: formData.get('deskripsi'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Input tidak valid.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/master-data/kategori`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) throw new Error('Gagal membuat data baru.');

    revalidatePath('/master-data/kategori');
    return { message: 'success' };
  } catch (error) {
    return { message: 'Terjadi kesalahan di server.' };
  }
}

/**
 * ACTION: Mengupdate Kategori Transaksi yang sudah ada.
 * [DIUBAH]: prevState sekarang menggunakan tipe KategoriFormState.
 */
export async function updateKategori(
  id: number,
  prevState: KategoriFormState,
  formData: FormData
): Promise<KategoriFormState> {
  // <-- Tambahkan return type untuk kejelasan
  const validatedFields = KategoriSchema.safeParse({
    name: formData.get('name'),
    deskripsi: formData.get('deskripsi'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Input tidak valid.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await fetch(`${API_BASE_URL}/master-data/kategori/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    revalidatePath('/master-data/kategori');
    return { message: 'success' };
  } catch (error) {
    return { message: 'Terjadi kesalahan saat mengupdate.' };
  }
}

/**
 * ACTION: Menghapus Kategori Transaksi.
 * (Tidak ada perubahan di sini, karena tidak menggunakan useFormState)
 */
export async function deleteKategori(id: number) {
  try {
    await fetch(`${API_BASE_URL}/master-data/kategori/${id}`, {
      method: 'DELETE',
    });

    revalidatePath('/master-data/kategori');
  } catch (error) {
    console.error('Gagal menghapus data:', error);
  }
}
