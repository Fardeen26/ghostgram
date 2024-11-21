'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { bricolage_grotesque } from '@/lib/fonts';
import Image from 'next/image';
import { useDarkMode } from '@/hooks/useDarkMode';
import { MoonIcon, SunIcon } from 'lucide-react';

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { data: session } = useSession();

  return (
    <nav className={`p-4 md:p-6 ${bricolage_grotesque}`}>
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <a href="/" className={`text-2xl max-sm:text-xl font-bold max-sm:mb-0 mb-4 md:mb-0 flex space-x-0 dark:space-x-[2px]`}>
          <span>
            <Image src={'/ghostgram-logo.png'} alt='logo' height={30} width={30} className='rounded-xl max-sm:h-7 max-sm:w-7' />
          </span>
          <span>
            hostGram
          </span>
        </a>


        <div className="flex items-center space-x-4">
          <div onClick={toggleDarkMode}>
            <div className='flex items-center'>
              <button>
                {isDarkMode ? <MoonIcon className='w-[18px] h-[18px] max-sm:w-[14px] max-sm:h-[14px]' /> : <SunIcon className='w-5 h-5 max-sm:w-[15px] max-sm:h-[15px]' />}
              </button>
            </div>
          </div>
          {session ? (

            <Button onClick={() => signOut()} className="w-full md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8" variant='outline'>
              Logout
            </Button>

          ) : (
            <Link href="/sign-in">
              <Button className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8" variant={'outline'}>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;