import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import Navbar from '@/components/auth/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <Navbar/>
      <main className={cn(inter.className, 'flex-1')}>{children}</main>
    </div>
  );
}
