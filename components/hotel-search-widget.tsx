"use client";

import { Search, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function HotelSearchWidget() {
    const [city, setCity] = useState("");
    const [dates, setDates] = useState("");
    const [guests, setGuests] = useState("2 Guests, 1 Room");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-[32px] shadow-2xl"
        >
            <div className="flex flex-col md:flex-row items-center gap-2">
                {/* Destination */}
                <div className="flex-1 w-full relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-400 transition-colors">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Where are you going?"
                        className="w-full bg-white/5 border border-transparent rounded-[24px] py-6 pl-16 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/10 focus:border-indigo-500/50 transition-all font-medium"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                {/* Dates */}
                <div className="flex-1 w-full relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-400 transition-colors">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Check-in & Out"
                        className="w-full bg-white/5 border border-transparent rounded-[24px] py-6 pl-16 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/10 focus:border-indigo-500/50 transition-all font-medium"
                        value={dates}
                        readOnly
                    />
                </div>

                {/* Guests */}
                <div className="flex-1 w-full relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-400 transition-colors">
                        <Users className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Guests & Rooms"
                        className="w-full bg-white/5 border border-transparent rounded-[24px] py-6 pl-16 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/10 focus:border-indigo-500/50 transition-all font-medium"
                        value={guests}
                        readOnly
                    />
                </div>

                {/* Search Button */}
                <button className="w-full md:w-auto bg-white text-black h-full py-6 px-10 rounded-[24px] font-bold hover:bg-indigo-400 hover:text-white transition-all flex items-center justify-center gap-2 group transform active:scale-95">
                    Search <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}
