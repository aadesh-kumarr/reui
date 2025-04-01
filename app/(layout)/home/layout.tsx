import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import Link from 'next/link';
import { auth } from '@/auth';
import { Card, CardContent } from '@/components/ui/card';
import { SessionProvider } from 'next-auth/react'; 


const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider> 
      {!session ? (
        <div className="flex flex-col min-h-screen mx-auto items-center justify-center py-5">
          <Card>
            <CardContent>
              <main className="flex flex-1 flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                  Unauthorized Access
                </h1>
                <p className="text-lg mb-4">
                  You must be signed in to access this page.
                </p>
                <Link href={'/'} className="text-blue-500 underline">
                  Go to Sign-in Page
                </Link>
              </main>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen mx-auto">

          <main className={cn(inter.className, 'flex-1')}>{children}</main>

        </div>
      )}
    </SessionProvider>
  );
}
