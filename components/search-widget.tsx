"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Calendar, Users, MapPin, ArrowRightLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type TripType = "one-way" | "round-trip" | "multi-city";

export function SearchWidget() {
    const [tripType, setTripType] = useState<TripType>("one-way");
    const [passengers, setPassengers] = useState(1);
    const [seatClass, setSeatClass] = useState("Economy");

    return (
        <div className="w-full max-w-6xl mx-auto px-4 z-20 relative">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
                {/* Header Tabs */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="bg-black/20 p-1 rounded-full flex gap-1 backdrop-blur-sm">
                        {(["one-way", "round-trip", "multi-city"] as TripType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setTripType(type)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                                    tripType === type ? "text-white" : "text-white/60 hover:text-white"
                                )}
                            >
                                {tripType === type && (
                                    <motion.div
                                        layoutId="tripTypeTab"
                                        className="absolute inset-0 bg-primary rounded-full shadow-lg"
                                        style={{ zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="capitalize">{type.replace("-", " ")}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-white/80 hover:text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10 transition-colors">
                                <Users className="w-4 h-4" />
                                <span>{passengers} Traveler{passengers > 1 ? 's' : ''}</span>
                            </button>
                            {/* Dropdown placeholder */}
                        </div>
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-white/80 hover:text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10 transition-colors">
                                <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">C</div>
                                <span>{seatClass}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                    {/* From - To Group */}
                    <div className="md:col-span-5 grid grid-cols-[1fr,auto,1fr] gap-2 items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl relative">
                        <div className="relative group flex-1 pl-4 pr-2 py-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                            <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-wider">From</label>
                            <div className="text-lg font-bold text-white leading-tight">New Delhi</div>
                            <div className="text-xs text-white/40 truncate">DEL, Indira Gandhi International Airport</div>
                        </div>

                        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-transform hover:rotate-180">
                            <ArrowRightLeft className="w-4 h-4" />
                        </button>

                        <div className="relative group flex-1 pl-4 pr-2 py-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                            <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-wider">To</label>
                            <div className="text-lg font-bold text-white leading-tight">London</div>
                            <div className="text-xs text-white/40 truncate">LHR, Heathrow Airport</div>
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="md:col-span-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl flex items-center">
                        <div className={cn("flex-1 pl-4 pr-2 py-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border-r border-white/5", tripType === 'one-way' && "border-none")}>
                            <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-wider flex items-center gap-1">
                                Departure <Calendar className="w-3 h-3 text-primary" />
                            </label>
                            <div className="text-lg font-bold text-white leading-tight">24 Oct' 24</div>
                            <div className="text-xs text-white/40">Thursday</div>
                        </div>

                        {tripType === "round-trip" && (
                            <div className="flex-1 pl-4 pr-2 py-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                                <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-wider flex items-center gap-1">
                                    Return <Calendar className="w-3 h-3 text-primary" />
                                </label>
                                <div className="text-lg font-bold text-white leading-tight">30 Oct' 24</div>
                                <div className="text-xs text-white/40">Wednesday</div>
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <div className="md:col-span-3">
                        <button
                            onClick={() => window.location.href = '/search?from=DEL&to=LHR&date=2024-10-24'}
                            className="w-full h-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white rounded-2xl font-bold text-xl shadow-lg shadow-indigo-500/30 flex flex-col items-center justify-center gap-1 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="flex items-center gap-2">Search Flights <Search className="w-5 h-5" /></span>
                            <span className="text-xs font-normal opacity-80">Find best prices</span>
                        </button>
                    </div>
                </div>

                {/* Footer / Smart Tags */}
                <div className="flex flex-wrap gap-3 items-center text-sm text-white/70">
                    <span className="font-semibold text-white/90">Smart Search:</span>
                    {["Cheapest weekend", "Direct flights only", "Business Class Deals", "Visa-free destinations"].map((tag) => (
                        <button key={tag} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors text-xs">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
