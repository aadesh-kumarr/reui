import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
      </div>
    );
  }

  return (
    <div className={cn(inter.className)}>
      {children}
    </div>
  );
}