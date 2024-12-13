'use client';

import { bricolage_grotesque, inter } from "@/lib/fonts";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { AnimatedListDemo } from "@/components/AnimateListComponent";
import { useSession } from 'next-auth/react';
import MarqueeComponent from "@/components/MarqueeComponent";


export default function Home() {
  const { status } = useSession()
  const isUserLoggedIn = status === 'authenticated';

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center h-[60vh] max-sm:h-[42vh]">
        <section className="text-center flex flex-col items-center justify-end">
          <h1 className={`text-3xl md:text-7xl font-bold ${bricolage_grotesque}`}>
            Dive into the World of
            <br />
            Anonymous Messages
          </h1>
          <p className={`mt-5 text-lg max-sm:text-xs text-gray-500 dark:text-gray-300 text-center tracking-normal leading-6 ${inter}`}>
            GhostGram - Where your identity remains a secret.
          </p>

          <Link href={`${isUserLoggedIn ? '/dashboard' : '/sign-in'}`} className="mt-8">
            <RainbowButton className="space-x-3">
              <span>Get Started</span>
              <span><RiArrowRightSLine /></span>
            </RainbowButton>
          </Link>
        </section>
      </main>

      <div>
        <MarqueeComponent />
      </div>

      <div className="space-y-4 mt-32 max-sm:mt-20 pb-10 max-sm:pb-20">
        <h2 className={`text-center text-2xl md:text-5xl font-bold ${bricolage_grotesque}`}>Receive Instant Messages</h2>
        <AnimatedListDemo />
      </div>
    </>
  );
}