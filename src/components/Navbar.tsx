'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { bricolage_grotesque } from '@/lib/fonts';
import Image from 'next/image';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className={`p-4 md:p-6 shadow-md text-white ${bricolage_grotesque}`}>
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <a href="/" className={`text-2xl font-bold mb-4 md:mb-0 flex space-x-[2px]`}>
          <span>
            <Image src={'/ghostgram-logo.png'} alt='logo' height={30} width={30} className='rounded-xl' />
          </span>
          <span>
            hostGram
          </span>
        </a>
        {session ? (
          <>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-white text-black rounded-full px-8 h-8" variant='outline'>
              Logout
            </Button>
          </>
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