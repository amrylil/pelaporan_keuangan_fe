import './../globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/shared/app-sidebar';
import Header from '@/components/shared/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className='w-full'>
            <Header />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
