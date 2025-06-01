'use client';

import { useState } from 'react';
import {
  BarChart3,
  Database,
  CreditCard,
  FileText,
  Users,
  Activity,
  Bell,
  Settings,
  LogOut,
  Wallet,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMasterDataCollapsed, setIsMasterDataCollapsed] = useState(false);

  return (
    <Sidebar collapsible='icon' className='border-r border-slate-200'>
      {/* Logo dan Nama Aplikasi */}
      <div className='flex items-center justify-start py-6 px-4'>
        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-md'>
          <Wallet className='h-7 w-7 text-white' />
        </div>
        <span className='ml-3 text-2xl font-bold text-slate-800'>FinTrack</span>
      </div>

      <SidebarContent className='mt-4'>
        {/* Main Menu Items */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className='w-full py-3 px-4 justify-start bg-slate-100 text-indigo-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium text-base'
                >
                  <a href='/'>
                    <BarChart3 className='h-6 w-6 md:mr-3' />
                    <span className='hidden md:block'>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className='w-full py-3 px-4 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium text-base'
                >
                  <a href='/transaksi'>
                    <CreditCard className='h-6 w-6 md:mr-3' />
                    <span className='hidden md:block'>Transaksi</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className='w-full py-3 px-4 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium text-base'
                >
                  <a href='/laporan'>
                    <FileText className='h-6 w-6 md:mr-3' />
                    <span className='hidden md:block'>Laporan</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className='w-full py-3 px-4 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium text-base'
                >
                  <a href='/log-aktivitas'>
                    <Activity className='h-6 w-6 md:mr-3' />
                    <span className='hidden md:block'>Log Aktivitas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className='w-full py-3 px-4 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium text-base'
                >
                  <a href='/notifikasi'>
                    <Bell className='h-6 w-6 md:mr-3' />
                    <span className='hidden md:block'>Notifikasi</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Master Data Group - Collapsible */}
        <SidebarGroup className=''>
          <div
            className='flex items-center justify-between px-4 py-2 cursor-pointer'
            onClick={() => setIsMasterDataCollapsed(!isMasterDataCollapsed)}
          >
            <SidebarGroupLabel className='text-base font-medium text-slate-700 flex items-center'>
              <Database className='h-5 w-5 mr-2' />
              <span>Master Data</span>
            </SidebarGroupLabel>
            {isMasterDataCollapsed ? (
              <ChevronRight className='h-5 w-5 text-slate-500' />
            ) : (
              <ChevronDown className='h-5 w-5 text-slate-500' />
            )}
          </div>

          {!isMasterDataCollapsed && (
            <SidebarGroupContent className='pl-4'>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className='w-full py-3 px-4 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium'
                  >
                    <a href='/master/kategori'>
                      <Database className='h-5 w-5 md:mr-3' />
                      <span className='hidden md:block'>Kategori Transaksi</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className='w-full py-3 px-4 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium'
                  >
                    <a href='/master/jenis-pembayaran'>
                      <Database className='h-5 w-5 md:mr-3' />
                      <span className='hidden md:block'>Jenis Pembayaran</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className='w-full py-3 px-4 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium'
                  >
                    <a href='/master/tipe-transaksi'>
                      <Database className='h-5 w-5 md:mr-3' />
                      <span className='hidden md:block'>Tipe Transaksi</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className='w-full py-3 px-4 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium'
                  >
                    <a href='/master/status-transaksi'>
                      <Database className='h-5 w-5 md:mr-3' />
                      <span className='hidden md:block'>Status Transaksi</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className='w-full py-3 px-4 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium'
                  >
                    <a href='/manajemen-user'>
                      <Users className='h-5 w-5 md:mr-3' />
                      <span className='hidden md:block'>User & Role</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='mt-auto p-4 border-t border-slate-200'>
        {/* <SidebarMenuButton
          asChild
          className='w-full py-3 px-4 mb-2 justify-start text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg font-medium'
        >
          <a href='/settings'>
            <Settings className='h-6 w-6 md:mr-3' />
            <span className='hidden md:block'>Settings</span>
          </a>
        </SidebarMenuButton> */}

        <SidebarMenuButton
          asChild
          className='w-full py-3 px-4 justify-start text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium'
        >
          <a href='/logout'>
            <LogOut className='h-6 w-6 md:mr-3' />
            <span className='hidden md:block'>Logout</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
