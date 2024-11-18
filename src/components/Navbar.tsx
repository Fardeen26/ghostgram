'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { bricolage_grotesque } from '@/lib/fonts';
import Image from 'next/image';
import { useDarkMode } from '@/hooks/useDarkMode';
import { MoonIcon, SunIcon } from 'lucide-react';

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className={`p-4 md:p-6 ${bricolage_grotesque}`}>
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <a href="/" className={`text-2xl font-bold mb-4 md:mb-0 flex space-x-0 dark:space-x-[2px]`}>
          <span>
            <Image src={'/ghostgram-logo.png'} alt='logo' height={30} width={30} className='rounded-xl' />
          </span>
          <span>
            hostGram
          </span>
        </a>
        {session ? (
          <div className="flex items-center space-x-4">
            <div onClick={toggleDarkMode}>
              <div className='flex items-center'>
                <button>
                  {isDarkMode ? <MoonIcon className='w-[18px] h-[18px] max-sm:w-[14px] max-sm:h-[14px]' /> : <SunIcon className='w-5 h-5 max-sm:w-[15px] max-sm:h-[15px]' />}
                </button>
              </div>
            </div>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-white text-black rounded-full px-8 h-8" variant='outline'>
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full bg-white text-black rounded-full px-8 h-8" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;