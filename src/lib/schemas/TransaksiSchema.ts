import { z } from 'zod';

export const TransaksiSchema = z.object({
  tanggal: z.string(),
  jumlah: z.number(),
  idKategori: z.number(),
  idTipeTransaksi: z.number(),
  idStatusTransaksi: z.number(),
  idUser: z.number(),
  idJenisPembayaran: z.number(),
  keterangan: z.string().optional(),
  komentarManajer: z.string().optional(),
  buktiTransaksi: z.string().optional(),
});
