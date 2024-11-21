import { cn } from "@/lib/utils";
import { AnimatedList } from "./ui/animated-list";
import { bricolage_grotesque } from "@/lib/fonts";

interface Item {
    name: string;
    description: string;
    icon: string;
    color: string;
    time: string;
}


let notifications = [
    {
        name: "What skill are you most excited to master in the next year?",
        description: "GhostGram",
        time: "15m ago",

        icon: "💸",
        color: "#00C9A7",
    },
    {
        name: "What kind of positive impact do you hope to make on the world in the future?",
        description: "GhostGram",
        time: "10m ago",
        icon: "👤",
        color: "#FFB800",
    },
    {
        name: "What's a skill you're secretly proud of mastering?",
        description: "GhostGram",
        time: "5m ago",
        icon: "💬",
        color: "#FF3D71",
    },
    {
        name: "If you could instantly learn any new language, which would you choose and why?",
        description: "GhostGram",
        time: "2m ago",
        icon: "🗞️",
        color: "#1E86FF",
    },
    {
        name: "What's one small thing you do daily that brings you consistent joy?",
        description: "GhostGram",
        time: "36m ago",
        icon: "❔",
        color: "#FFFFFF",
    }
];

notifications = Array.from({ length: 10 }, () => notifications).flat();


const Notification = ({ name, description, icon, color, time }: Item) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[900px] border cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white shadow-md",
                // dark styles
                "transform-gpu border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-2xl"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className={`flex flex-col overflow-hidden ${bricolage_grotesque}`}>
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    );
};

export function AnimatedListDemo({
    className,
}: {
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg",
                className,
            )}
        >
            <AnimatedList>
                {notifications.map((item, idx) => (
                    <Notification {...item} key={idx} />
                ))}
            </AnimatedList>
        </div>
    );
}