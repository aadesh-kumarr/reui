import { ReactNode, Suspense } from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/utils';
import { DirectionProvider } from '@/providers/direction-provider';
import { QueryProvider } from '@/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
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