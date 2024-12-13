import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from 'sonner'
import DarkModeProvider from '@/context/DarkModeContext';

export const metadata: Metadata = {
  title: 'GhostGram',
  description: 'Real Message from real people.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
      <AuthProvider>
        <DarkModeProvider>
          <body className='bg-white text-black dark:bg-black dark:text-white'>
            {children}
            <Toaster />
          </body>
        </DarkModeProvider>
      </AuthProvider>
    </html>
  );
}
