"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import Marquee from "./ui/marquee";

const reviews = [
    {
        name: "Anonymous",
        username: "@fardeen14693425",
        body: "What’s one thing you wish people understood about you but rarely do?",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Anonymous",
        username: "@anonymous_user1",
        body: "If you could change one decision you made in the past year, what would it be and why?",
        img: "https://avatar.vercel.sh/user1",
    },
    {
        name: "Anonymous",
        username: "@anon_quest2",
        body: "What’s something you’re passionate about but haven’t had the chance to pursue yet?",
        img: "https://avatar.vercel.sh/user2",
    },
    {
        name: "Anonymous",
        username: "@hidden_wanderer",
        body: "What advice would you give to someone going through a rough time, based on your own experiences?",
        img: "https://avatar.vercel.sh/user3",
    },
    {
        name: "Anonymous",
        username: "@mystery_mind",
        body: "If you could instantly master any skill, what would it be and how would you use it?",
        img: "https://avatar.vercel.sh/user4",
    },
    {
        name: "Anonymous",
        username: "@secret_inquirer",
        body: "What’s one thing you wish people understood about you but rarely do?",
        img: "https://avatar.vercel.sh/user5",
    }
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image src={img} alt="logo" width={35} height={35} className="rounded-full" />
                <div className="flex flex-col">
                    <figcaption className="text-sm max-sm:text-xs font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm max-sm:text-xs">{body}</blockquote>
        </figure>
    );
};


export default function MarqueeComponent() {
    return (
        <div className="relative flex h-[400px] max-sm:h-[270px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border-none bg-background">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 dark:w-1/4 w-[12%] bg-gradient-to-r from-white dark:from-black"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 dark:w-1/4 w-[12%] bg-gradient-to-l from-white  dark:from-black"></div>
        </div>
    );
}