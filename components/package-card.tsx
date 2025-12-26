"use client";

import { Plane, Building, Clock, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PackageCardProps {
    title: string;
    location: string;
    duration: string;
    price: string;
    originalPrice: string;
    imageUrl: string;
    includes: string[];
    delay?: number;
}

export function PackageCard({ title, location, duration, price, originalPrice, imageUrl, includes, delay = 0 }: PackageCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="group relative bg-[#121212] border border-white/10 rounded-[32px] overflow-hidden hover:border-indigo-500/50 transition-all duration-500 shadow-xl"
        >
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Best Value Combo
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-xs font-bold text-white">{duration}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-7">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{title}</h3>
                        <p className="text-gray-400 text-sm">{location}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full">
                        <Plane className="w-3 h-3 text-indigo-400" />
                        Flight Included
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full">
                        <Building className="w-3 h-3 text-indigo-400" />
                        Luxury Stay
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    {includes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            {item}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                        <div className="text-gray-500 text-xs line-through mb-1">₹{originalPrice}</div>
                        <div className="text-2xl font-black text-white">₹{price}</div>
                        <div className="text-indigo-400 text-[10px] font-bold">PER PERSON</div>
                    </div>
                    <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-indigo-400 hover:text-white transition-all flex items-center gap-2 group transform active:scale-95">
                        View Deal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
