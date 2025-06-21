export interface KategoriTransaksi {
  id: string;
  name: string;
  deskripsi: string | null;
  createdAt?: string;
}

export interface JenisPembayaran {
  id: string;
  name: string;
  deskripsi: string | null;
  createdAt?: string;
}

const API_BASE_URL = 'http://localhost:8000/api/v1';
export async function getKategoriTransaksi(): Promise<KategoriTransaksi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/master-data/kategori`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse.data);
    return jsonResponse.data || [];
  } catch (error) {
    console.error('Error di getKategoriTransaksi:', error);
    throw error;
  }
}

export async function getJenisPembayaran(): Promise<JenisPembayaran[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/master-data/jenis-pembayaran`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data jenis pembayaran: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse.data);

    return jsonResponse.data || [];
  } catch (error) {
    console.error('Error di getJenisPembayaran:', error);
    throw error;
  }
}
