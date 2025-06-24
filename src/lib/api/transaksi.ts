export interface Transaksi {
  id: number;
  tanggal: string;
  idTipeTransaksi: number;
  jumlah: number;
  keterangan: string;
  buktiTransaksi: string;
  idStatusTransaksi: number;
  komentarManajer: string;
  idKategori: number;
  idUser: number;
  idJenisPembayaran: number;
  createdAt?: string;
  updatedAt?: string;

  tipeTransaksi?: {
    id: number;
    nama: string;
  };
  statusTransaksi?: {
    id: number;
    nama: string;
  };
  kategori?: {
    id: number;
    nama: string;
  };
  user?: {
    id: number;
    nama: string;
  };
  jenisPembayaran?: {
    id: number;
    nama: string;
  };
}

const API_BASE_URL = 'http://localhost:8000/api/v1';

export async function getTransaksi(): Promise<Transaksi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/transaksi`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data  transaksi: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse.data);

    return jsonResponse.data || [];
  } catch (error) {
    console.error('Error di getTransaksi:', error);
    throw error;
  }
}
