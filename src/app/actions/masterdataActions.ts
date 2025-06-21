'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';

// [PERBAIKAN 1] Port API diubah ke 8080
const API_BASE_URL = 'http://localhost:8000/api/v1';

export type MasterDataFormState = {
  message: string | null;
  errors?: {
    name?: string[];
    deskripsi?: string[];
  };
};

const MasterDataSchema = z.object({
  name: z.string().min(3, { message: 'Nama minimal 3 karakter' }),
  deskripsi: z.string().optional(),
});

// ===========================================
// ACTIONS UNTUK KATEGORI
// ===========================================

export async function createKategori(
  prevState: MasterDataFormState,
  formData: FormData
): Promise<MasterDataFormState> {
  const validatedFields = MasterDataSchema.safeParse({
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

    revalidateTag('kategori'); // Gunakan revalidateTag agar lebih kuat
    return { message: 'success' };
  } catch (error) {
    return { message: 'Terjadi kesalahan di server.' };
  }
}

export async function updateKategori(
  id: string, // [PERBAIKAN 2] ID HARUS STRING
  prevState: MasterDataFormState,
  formData: FormData
): Promise<MasterDataFormState> {
  const validatedFields = MasterDataSchema.safeParse({
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

    revalidateTag('kategori');
    return { message: 'success' };
  } catch (error) {
    return { message: 'Terjadi kesalahan saat mengupdate.' };
  }
}

export async function deleteKategori(id: string) {
  // [PERBAIKAN 2] ID HARUS STRING
  try {
    await fetch(`${API_BASE_URL}/master-data/kategori/${id}`, {
      method: 'DELETE',
    });
    revalidateTag('kategori');
  } catch (error) {
    console.error('Gagal menghapus data kategori:', error);
  }
}

// ===========================================
// ACTIONS UNTUK JENIS PEMBAYARAN
// ===========================================

export async function createJenisPembayaran(
  prevState: MasterDataFormState,
  formData: FormData
): Promise<MasterDataFormState> {
  const validatedFields = MasterDataSchema.safeParse({
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
    await fetch(`${API_BASE_URL}/master-data/jenis-pembayaran`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    revalidateTag('jenis-pembayaran');
    return { message: 'success' };
  } catch (error) {
    return { message: 'Terjadi kesalahan di server.' };
  }
}

export async function updateJenisPembayaran(
  id: string, // [PERBAIKAN 2] ID HARUS STRING
  prevState: MasterDataFormState,
  formData: FormData
): Promise<MasterDataFormState> {
  const validatedFields = MasterDataSchema.safeParse({
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
    await fetch(`${API_BASE_URL}/master-data/jenis-pembayaran/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    revalidateTag('jenis-pembayaran');
    return { message: 'success' };
  } catch (error) {
    return { message: 'Terjadi kesalahan saat mengupdate.' };
  }
}

export async function deleteJenisPembayaran(id: string) {
  // [PERBAIKAN 2] ID HARUS STRING
  try {
    await fetch(`${API_BASE_URL}/master-data/jenis-pembayaran/${id}`, {
      method: 'DELETE',
    });
    revalidateTag('jenis-pembayaran');
  } catch (error) {
    console.error('Gagal menghapus data jenis pembayaran:', error);
  }
}
