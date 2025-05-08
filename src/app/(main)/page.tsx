import Header from '@/components/shared/header';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  Bell,
  FileText,
  Mail,
  Plus,
  Search,
  Users,
  DollarSign,
  TrendingUp,
  CreditCard,
  Briefcase,
} from 'lucide-react';

export default function Home() {
  return (
    <div>
      <div className='flex-1 overflow-auto'>
        {/* Header */}

        {/* Welcome Banner */}
        <div className='m-4 p-6 rounded-lg bg-blue-50 flex flex-col md:flex-row justify-between items-center'>
          <div className='md:w-2/3'>
            <h1 className='text-2xl font-semibold mb-2'>Selamat Datang, Alex!</h1>
            <p className='text-slate-600 text-sm'>
              Manajer Keuangan dengan 10 tahun pengalaman dalam pelaporan dan analisis keuangan.
              Bertanggung jawab untuk perencanaan anggaran, perkiraan keuangan, dan manajemen
              pengeluaran. Dikenal karena efisiensi proses keuangan dan peningkatan kualitas
              pelaporan.
            </p>

            <div className='flex mt-4 space-x-6'>
              <div className='flex items-center'>
                <div className='bg-green-100 p-2 rounded-full'>
                  <DollarSign className='h-5 w-5 text-green-500' />
                </div>
                <div className='ml-3'>
                  <p className='text-2xl font-semibold'>10</p>
                  <p className='text-xs text-slate-500'>Laporan Dibuat</p>
                </div>
              </div>

              <div className='flex items-center'>
                <div className='bg-blue-100 p-2 rounded-full'>
                  <Briefcase className='h-5 w-5 text-blue-500' />
                </div>
                <div className='ml-3'>
                  <p className='text-2xl font-semibold'>4</p>
                  <p className='text-xs text-slate-500'>Departemen</p>
                </div>
              </div>
            </div>
          </div>

          <div className='md:w-1/3 flex justify-center mt-4 md:mt-0'>
            <img
              src='https://img.freepik.com/free-photo/business-graphics-presentation-illustration_23-2151876392.jpg?t=st=1746555381~exp=1746558981~hmac=a61a687f49c9cc559c1e64e6de86e29a5b7d766ddeb2282720333e25462beab1&w=1380'
              alt='Ilustrasi Keuangan'
              className='h-32'
            />
          </div>
        </div>

        {/* Financial Analytics */}
        <div className='m-4'>
          <h2 className='text-xl font-semibold mb-4'>Analisis Keuangan</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <div className='bg-white rounded-lg border border-slate-200 p-4 flex items-center'>
              <div className='bg-green-100 p-3 rounded-lg'>
                <DollarSign className='h-6 w-6 text-green-500' />
              </div>
              <div className='ml-4'>
                <p className='text-sm text-slate-500'>Pendapatan Bulanan</p>
                <p className='text-xl font-semibold'>Rp 125.000.000</p>
              </div>
            </div>

            <div className='bg-white rounded-lg border border-slate-200 p-4 flex items-center'>
              <div className='bg-red-100 p-3 rounded-lg'>
                <CreditCard className='h-6 w-6 text-red-500' />
              </div>
              <div className='ml-4'>
                <p className='text-sm text-slate-500'>Pengeluaran Bulanan</p>
                <p className='text-xl font-semibold'>Rp 82.500.000</p>
              </div>
            </div>

            <div className='bg-white rounded-lg border border-slate-200 p-4 flex items-center'>
              <div className='bg-blue-100 p-3 rounded-lg'>
                <TrendingUp className='h-6 w-6 text-blue-500' />
              </div>
              <div className='ml-4'>
                <p className='text-sm text-slate-500'>Laba Bersih</p>
                <p className='text-xl font-semibold'>Rp 42.500.000</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Revenue Chart */}
            <div className='bg-white rounded-lg border border-slate-200 p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='font-medium'>Tren Pendapatan</h3>
                <Tabs defaultValue='month'>
                  <TabsList>
                    <TabsTrigger value='week'>Minggu</TabsTrigger>
                    <TabsTrigger value='month'>Bulan</TabsTrigger>
                    <TabsTrigger value='year'>Tahun</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className='h-48 flex items-center justify-center'>
                {/* This would be a chart in a real implementation */}
                <div className='w-full h-full relative'>
                  <div className='absolute bottom-0 left-0 w-full h-1/2 flex items-end'>
                    <div className='flex-1 h-8 bg-blue-100'></div>
                    <div className='flex-1 h-12 bg-blue-100'></div>
                    <div className='flex-1 h-20 bg-blue-100'></div>
                    <div className='flex-1 h-28 bg-blue-100'></div>
                    <div className='flex-1 h-36 bg-blue-100'></div>
                    <div className='flex-1 h-16 bg-blue-100'></div>
                  </div>
                  <div className='absolute top-1/4 left-0 right-0 h-1 border-b border-dashed border-blue-500'></div>
                  <div className='absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 pt-2'>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>Mei</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expense Distribution */}
            <div className='bg-white rounded-lg border border-slate-200 p-6'>
              <h3 className='font-medium mb-6'>Distribusi Pengeluaran</h3>

              <div className='flex justify-center mb-4'>
                <div className='relative w-32 h-32'>
                  <div className='w-full h-full rounded-full border-8 border-blue-100'></div>
                  <div className='absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500 border-t-transparent border-r-transparent border-b-transparent transform -rotate-45'></div>
                  <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                    <div className='text-center'>
                      <p className='text-2xl font-bold'>68%</p>
                      <p className='text-xs text-slate-500'>Penggunaan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center'>
                  <span className='h-3 w-3 rounded-full bg-blue-100 mr-2'></span>
                  <span className='text-sm text-slate-600'>Biaya Operasional</span>
                </div>

                <div className='flex items-center'>
                  <span className='h-3 w-3 rounded-full bg-blue-600 mr-2'></span>
                  <span className='text-sm text-slate-600'>Pengeluaran Modal</span>
                </div>

                <div className='flex items-center'>
                  <span className='h-3 w-3 rounded-full bg-green-500 mr-2'></span>
                  <span className='text-sm text-slate-600'>Biaya Personel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Reports & Budget Utilization */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 m-4'>
          {/* Pending Reports */}
          <div className='bg-white rounded-lg border border-slate-200 p-4'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-medium'>Laporan Tertunda</h3>
              <Button variant='link' className='text-xs text-blue-600'>
                Lihat Semua
              </Button>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50'>
                <Avatar className='h-10 w-10 bg-orange-100'>
                  <FileText className='h-5 w-5 text-orange-500' />
                </Avatar>
                <div className='ml-3 flex-1'>
                  <p className='text-sm font-medium'>Ringkasan Keuangan Q2</p>
                  <p className='text-xs text-slate-500'>Tenggat 15 Mei 2025 | Prioritas Tinggi</p>
                </div>
              </div>

              <div className='flex items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50'>
                <Avatar className='h-10 w-10 bg-blue-100'>
                  <FileText className='h-5 w-5 text-blue-500' />
                </Avatar>
                <div className='ml-3 flex-1'>
                  <p className='text-sm font-medium'>Analisis Anggaran Departemen</p>
                  <p className='text-xs text-slate-500'>Tenggat 20 Mei 2025 | Prioritas Menengah</p>
                </div>
              </div>

              <div className='flex items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50'>
                <Avatar className='h-10 w-10 bg-green-100'>
                  <FileText className='h-5 w-5 text-green-500' />
                </Avatar>
                <div className='ml-3 flex-1'>
                  <p className='text-sm font-medium'>Persiapan Audit Tahunan</p>
                  <p className='text-xs text-slate-500'>Tenggat 1 Juni 2025 | Prioritas Menengah</p>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Utilization */}
          <div className='bg-white rounded-lg border border-slate-200 p-4'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-medium'>Penggunaan Anggaran</h3>
              <div className='flex items-center'>
                <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
                <span className='text-lg font-semibold'>67,5%</span>
              </div>
            </div>

            <div className='space-y-3'>
              <div className='flex items-center'>
                <div className='w-20 text-sm text-slate-600'>Marketing</div>
                <div className='flex-1 mx-2'>
                  <Progress value={83} className='h-2' />
                </div>
                <div className='w-12 text-right text-sm text-slate-600'>83%</div>
              </div>

              <div className='flex items-center'>
                <div className='w-20 text-sm text-slate-600'>Dept. IT</div>
                <div className='flex-1 mx-2'>
                  <Progress value={64} className='h-2' />
                </div>
                <div className='w-12 text-right text-sm text-slate-600'>64%</div>
              </div>

              <div className='flex items-center'>
                <div className='w-20 text-sm text-slate-600'>Operasional</div>
                <div className='flex-1 mx-2'>
                  <Progress value={72} className='h-2' />
                </div>
                <div className='w-12 text-right text-sm text-slate-600'>72%</div>
              </div>

              <div className='flex items-center'>
                <div className='w-20 text-sm text-slate-600'>SDM</div>
                <div className='flex-1 mx-2'>
                  <Progress value={55} className='h-2' />
                </div>
                <div className='w-12 text-right text-sm text-slate-600'>55%</div>
              </div>

              <div className='flex items-center'>
                <div className='w-20 text-sm text-slate-600'>R&D</div>
                <div className='flex-1 mx-2'>
                  <Progress value={36} className='h-2' />
                </div>
                <div className='w-12 text-right text-sm text-slate-600'>36%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
