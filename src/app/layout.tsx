import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import CustomHtml from '@/core/components/CustomHtml';
import InitFlowbite from '@/core/lib/flowbite';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chinese Herb Prescription',
  description: 'Prescribe treatment with chinese herbs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomHtml>
      <body className={`${inter.className} antialiased dark:bg-gray-900`}>
        <InitFlowbite>{children}</InitFlowbite>
      </body>
    </CustomHtml>
  );
}
