
import React from 'react';
import "./../globals.css";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html>
    <body>
      
    <div className="min-h-screen bg-sky-100 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-sky-100 to-blue-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-white/20 rounded-full transform translate-y-1/2 scale-150 blur-xl"></div>
        <div className="absolute -right-32 top-32 w-96 h-96 bg-white/30 rounded-full blur-xl"></div>
        <div className="absolute -left-32 top-64 w-64 h-64 bg-white/20 rounded-full blur-xl"></div>
      </div>

      {/* Logo */}
      <div className="relative max-w-md w-full px-6">
        

        {/* Main content */}
        {children}
      </div>
    </div>
    </body>
   </html>
  );
}