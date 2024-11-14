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
    <nav className="p-4 md:p-6 shadow-md text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="/" className={`text-2xl font-bold mb-4 md:mb-0 flex space-x-[2px] ${bricolage_grotesque}`}>
          <span>
            <Image src={'/ghostgram-logo.png'} alt='logo' height={30} width={30} className='rounded-xl' />
          </span>
          <span>
            hostGram
          </span>
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user.username || user.email}
            </span>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full px-7 h-9 bg-white text-black rounded-full" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;