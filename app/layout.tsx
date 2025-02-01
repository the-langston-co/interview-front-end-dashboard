import './globals.css';

import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className="flex min-h-screen w-full flex-col">
          {children}
          <Toaster richColors />
        </body>
      </SessionProvider>
      <Analytics />
    </html>
  );
}
