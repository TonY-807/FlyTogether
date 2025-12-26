"use client";

import { Star, MapPin, Wifi, Coffee, Wind, Tv } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HotelCardProps {
    name: string;
    location: string;
    rating: number;
    price: string;
    imageUrl: string;
    amenities: string[];
    delay?: number;
}

const amenityIcons: Record<string, any> = {
    Wifi: <Wifi className="w-3 h-3" />,
    Coffee: <Coffee className="w-3 h-3" />,
    AC: <Wind className="w-3 h-3" />,
    TV: <Tv className="w-3 h-3" />,
};

export function HotelCard({ name, location, rating, price, imageUrl, amenities, delay = 0 }: HotelCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="group relative bg-[#121212] border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-white">{rating}</span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{name}</h3>
                </div>

                <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                    <MapPin className="w-3 h-3" />
                    <span>{location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md text-[10px] text-gray-400">
                            {amenityIcons[amenity]}
                            {amenity}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-2xl font-bold text-white">₹{price}</span>
                        <span className="text-gray-500 text-xs"> / night</span>
                    </div>
                    <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-400 hover:text-white transition-all transform active:scale-95">
                        Book Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
