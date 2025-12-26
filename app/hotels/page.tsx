"use client";

import { HotelSearchWidget } from "@/components/hotel-search-widget";
import { HotelCard } from "@/components/hotel-card";
import { ArrowLeft, Sparkles, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SlidingNav } from "@/components/sliding-nav";

export default function HotelsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/5 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center">
                    <div className="flex-1">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent w-fit">
                            <ArrowLeft className="w-5 h-5 text-white" />
                            FlyTogether Hotels
                        </Link>
                    </div>

                    <SlidingNav />

                    <div className="flex-1" /> {/* Spacer to balance centering */}
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        src="/luxury_hotel_hero_1766750417957.png"
                        alt="Luxury Hotel"
                        className="w-full h-full object-cover"
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 0.5, -0.5, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    {/* Animated Light Blobs */}
                    <motion.div
                        className="absolute top-[20%] left-[10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{ duration: 12, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px]"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 15, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Find your perfect <br /> <span className="text-indigo-400">stay.</span>
                        </h1>
                        <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
                            From luxury resorts to boutique urban hotels. Discover handpicked stays with exclusive FlyTogether perks.
                        </p>
                    </motion.div>

                    <HotelSearchWidget />
                </div>
            </section>

            {/* AI Recommendation Banner */}
            <section className="py-12 bg-indigo-600/10 border-y border-indigo-500/20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">AI-Based Recommendations</h3>
                                <p className="text-gray-400 text-sm">Based on your recent search for Tokyo, we've found 3 premium stays you'll love.</p>
                            </div>
                        </div>
                        <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-indigo-400 hover:text-white transition-all whitespace-nowrap">
                            View Recommendations
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Featured Stays</h2>
                        <p className="text-gray-400">Handpicked luxury properties for an unforgettable experience.</p>
                    </div>
                    <button className="text-indigo-400 font-bold hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <HotelCard
                        name="Aman Tokyo"
                        location="Otemachi, Tokyo"
                        rating={4.9}
                        price="85,000"
                        imageUrl="https://images.unsplash.com/photo-1578683062331-1e9a31a98299?q=80&w=1000&auto=format&fit=crop"
                        amenities={["Wifi", "Coffee", "AC", "TV"]}
                        delay={0.1}
                    />
                    <HotelCard
                        name="Ritz-Carlton Maldives"
                        location="Fari Islands, Maldives"
                        rating={5.0}
                        price="1,20,000"
                        imageUrl="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1000&auto=format&fit=crop"
                        amenities={["Wifi", "Coffee", "AC", "TV"]}
                        delay={0.2}
                    />
                    <HotelCard
                        name="The Savoy"
                        location="London, UK"
                        rating={4.8}
                        price="65,000"
                        imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
                        amenities={["Wifi", "AC", "TV"]}
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Trust Features */}
            <section className="py-24 bg-white/5 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                <ShieldCheck className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Secure Booking</h3>
                            <p className="text-gray-400">2FA protection for every transaction and encrypted card storage.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                                <Zap className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Instant Confirmation</h3>
                            <p className="text-gray-400">Get your voucher and receipt immediately after payment.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Price Drop Alerts</h3>
                            <p className="text-gray-400">Save the hotel and we'll notify you if the price drops.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
                <p>© 2024 FlyTogether. All rights reserved.</p>
            </footer>
        </div>
    );
}
