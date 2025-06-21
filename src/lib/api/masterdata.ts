export interface KategoriTransaksi {
  id: number;
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
