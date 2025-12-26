"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface DestinationCardProps {
    city: string;
    country: string;
    price: string;
    imageUrl: string;
    delay: number;
}

export function DestinationCard({ city, country, price, imageUrl, delay }: DestinationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative h-[500px] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl"
        >
            <div className="absolute inset-0">
                <img
                    src={imageUrl}
                    alt={city}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-white/80 text-sm font-medium mb-1 uppercase tracking-wider">{country}</p>
                        <h3 className="text-3xl font-bold text-white">{city}</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                        <span className="font-bold flex items-center gap-1">
                            {price} <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
