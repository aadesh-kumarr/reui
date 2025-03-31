import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
const inter = Inter({ subsets: ['latin'] });
 
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="h-full">
      <body
        className={cn('flex h-full text-base antialiased', inter.className)}
        style={{ overflow: 'visible !important', marginRight: '0 !important' }}
      >
        {children}
      </body>
    </html>
  );
}