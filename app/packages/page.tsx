"use client";

import { PackageCard } from "@/components/package-card";
import { ArrowLeft, MapPin, Search as SearchIcon, Compass, Sparkles, Gift } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { SlidingNav } from "@/components/sliding-nav";

export default function PackagesPage() {
    const [search, setSearch] = useState("");

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/5 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center">
                    <div className="flex-1">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent w-fit">
                            <ArrowLeft className="w-5 h-5 text-white" />
                            FlyTogether Packages
                        </Link>
                    </div>

                    <SlidingNav />

                    <div className="flex-1" /> {/* Spacer to balance centering */}
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        src="/holiday_package_hero_1766750910277.png"
                        alt="Holiday Packages"
                        className="w-full h-full object-cover"
                        animate={{
                            scale: [1.1, 1.2, 1.1],
                            y: [-20, 20, -20]
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    {/* Floating Orbs */}
                    <motion.div
                        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px]"
                        animate={{
                            x: [-50, 50, -50],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-xs font-bold mb-6 border border-indigo-500/30">
                            <Sparkles className="w-3 h-3" />
                            EXCLUSIVE COMBO DEALS SAVING UP TO 30%
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">
                            Unforgettable <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Escapes.</span>
                        </h1>
                    </motion.div>

                    {/* Simple Search */}
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-400 transition-colors">
                            <SearchIcon className="w-6 h-6" />
                        </div>
                        <input
                            type="text"
                            placeholder="Discover your next adventure (e.g. Maldives, Bali, Iceland)..."
                            className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] py-7 pl-16 pr-6 text-white text-lg placeholder:text-gray-500 focus:outline-none focus:bg-white/20 focus:border-indigo-500/50 transition-all shadow-2xl"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Featured Packages Grid */}
            <section className="py-24 container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2">
                            <Compass className="w-5 h-5" />
                            HANDPICKED FOR YOU
                        </div>
                        <h2 className="text-4xl font-bold">Curated Holiday Bundles</h2>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium">Beaches</button>
                        <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium">Mountains</button>
                        <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium">City Breaks</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <PackageCard
                        title="Maldives Overwater Paradise"
                        location="Malé, Maldives"
                        duration="5 Nights / 6 Days"
                        price="1,85,000"
                        originalPrice="2,40,000"
                        imageUrl="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop"
                        includes={["Return Flights Inclusion", "Luxury Overwater Villa", "All-Inclusive Dining", "Seaplane Transfers"]}
                        delay={0.1}
                    />
                    <PackageCard
                        title="Swiss Alps Adventure"
                        location="Zermatt, Switzerland"
                        duration="7 Nights / 8 Days"
                        price="2,10,000"
                        originalPrice="2,95,000"
                        imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop"
                        includes={["Premium Flight Tickets", "5-Star Ski Resort", "Glacier Express Pass", "Daily Mountain Breakfast"]}
                        delay={0.2}
                    />
                    <PackageCard
                        title="Bali Jungle & Beach"
                        location="Ubud & Seminyak, Bali"
                        duration="6 Nights / 7 Days"
                        price="95,000"
                        originalPrice="1,30,000"
                        imageUrl="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop"
                        includes={["Full Flight Coverage", "Private Infinity Pool Villa", "Cultural Ubud Tour", "Beach Club Access"]}
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Promo Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 border border-white/10 rounded-[48px] p-12 md:p-20 text-center backdrop-blur-xl">
                        <Gift className="w-16 h-16 text-indigo-400 mx-auto mb-8" />
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Create Your Own Custom Package.</h2>
                        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                            Mix and match any flight and hotel to unlock automatic discounts. The smarter you book, the more you save.
                        </p>
                        <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-indigo-400 hover:text-white transition-all transform hover:scale-105">
                            Start Building Now
                        </button>
                    </div>
                </div>
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[150px] rounded-full z-0" />
            </section>

            <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
                <p>© 2024 FlyTogether. All rights reserved.</p>
            </footer>
        </div>
    );
}
