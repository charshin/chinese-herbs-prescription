'use client';

import Link from 'next/link';
import Image from 'next/image';

import logo from '@/core/assets/img/logo.png';
import { ColorModeSwitcher } from '@/core/utils/colorMode';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="h-8 w-8">
            <Image src={logo} alt="Logo" />
          </div>
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white max-sm:hidden">
            Chinese Herbs Prescription
          </span>
        </Link>
        <div className="text-gray-500 dark:text-gray-400">
          <ColorModeSwitcher />
        </div>
      </div>
    </header>
  );
}
