'use server';

import { TransaksiSchema } from '@/lib/schemas/TransaksiSchema';
import { revalidateTag } from 'next/cache';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export type TransaksiFormState = {
  message: string | null;
  errors?: Record<string, string[]>;
};

export async function createTransaksi(
  prevState: TransaksiFormState,
  formData: FormData
): Promise<TransaksiFormState> {
  const validatedFields = TransaksiSchema.safeParse({
    tanggal: formData.get('tanggal'),
    idTipeTransaksi: formData.get('idTipeTransaksi'),
    jumlah: formData.get('jumlah'),
    keterangan: formData.get('keterangan'),
    buktiTransaksi: formData.get('buktiTransaksi'),
    idStatusTransaksi: formData.get('idStatusTransaksi'),
    komentarManajer: formData.get('komentarManajer'),
    idKategori: formData.get('idKategori'),
    idUser: formData.get('idUser'),
    idJenisPembayaran: formData.get('idJenisPembayaran'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Input tidak valid.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await fetch(`${API_BASE_URL}/transaksi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    revalidateTag('transaksi/create');
    return { message: 'success' };
  } catch (error) {
    console.error('Gagal membuat transaksi:', error);
    return { message: 'Terjadi kesalahan di server.' };
  }
}

export async function updateTransaksi(
  id: string,
  prevState: TransaksiFormState,
  formData: FormData
): Promise<TransaksiFormState> {
  const validatedFields = TransaksiSchema.safeParse({
    tanggal: formData.get('tanggal'),
    idTipeTransaksi: formData.get('idTipeTransaksi'),
    jumlah: formData.get('jumlah'),
    keterangan: formData.get('keterangan'),
    buktiTransaksi: formData.get('buktiTransaksi'),
    idStatusTransaksi: formData.get('idStatusTransaksi'),
    komentarManajer: formData.get('komentarManajer'),
    idKategori: formData.get('idKategori'),
    idUser: formData.get('idUser'),
    idJenisPembayaran: formData.get('idJenisPembayaran'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Input tidak valid.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await fetch(`${API_BASE_URL}/transaksi/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    revalidateTag('transaksi/update');
    return { message: 'success' };
  } catch (error) {
    console.error('Gagal update transaksi:', error);
    return { message: 'Terjadi kesalahan saat mengupdate.' };
  }
}

export async function deleteTransaksi(id: string) {
  try {
    await fetch(`${API_BASE_URL}/transaksi/${id}`, {
      method: 'DELETE',
    });
    revalidateTag('transaksi');
  } catch (error) {
    console.error('Gagal menghapus transaksi:', error);
  }
}
