'use client';

import { Button } from '@/components/ui/button';

export default function LaporanPage() {
  return (
    <div className='p-6 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Laporan</h1>
      <div className='flex justify-center gap-4'>
        <Button variant='outline' onClick={() => alert('Export to PDF clicked')}>
          Export to PDF
        </Button>
        <Button variant='outline' onClick={() => alert('Export to Excel clicked')}>
          Export to Excel
        </Button>
      </div>
    </div>
  );
}
