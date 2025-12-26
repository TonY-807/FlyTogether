"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Flights", href: "/" },
    { label: "Hotels", href: "/hotels" },
    { label: "Packages", href: "/packages" },
];

export function SlidingNav() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-full relative">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                            isActive ? "text-black" : "text-white/60 hover:text-white"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeNav"
                                className="absolute inset-0 bg-white rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                style={{ zIndex: -1 }}
                            />
                        )}
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
