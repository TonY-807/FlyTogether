"use client";

import { motion } from "framer-motion";
import { Plane, Clock, ArrowRight } from "lucide-react";

interface FlightCardProps {
    airline: string;
    airlineCode: string;
    flightNumber: string;
    departureTime: string;
    departureCity: string;
    arrivalTime: string;
    arrivalCity: string;
    duration: string;
    price: string;
    stops: string;
    color: string;
    imageUrl?: string;
    isGrid?: boolean;
}

export function FlightCard({
    airline,
    airlineCode,
    flightNumber,
    departureTime,
    departureCity,
    arrivalTime,
    arrivalCity,
    duration,
    price,
    stops,
    color,
    imageUrl,
    isGrid = false
}: FlightCardProps) {
    if (isGrid) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-lg flex flex-col h-full">
                <div className="relative h-40">
                    <img
                        src={imageUrl || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"}
                        alt={arrivalCity}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="font-bold text-xl">{arrivalCity}</div>
                        <div className="text-xs opacity-80">{airline}</div>
                    </div>
                    <div className={`absolute top-4 right-4 w-10 h-10 ${color} rounded-full flex items-center justify-center font-bold text-xs shadow-lg`}>
                        {airlineCode}
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-center">
                            <div className="font-bold text-lg">{departureTime}</div>
                            <div className="text-xs text-gray-500">{departureCity}</div>
                        </div>
                        <div className="flex-1 px-4 flex flex-col items-center">
                            <div className="text-xs text-gray-400 mb-1">{duration}</div>
                            <div className="w-full h-[1px] bg-gray-200 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-300 rounded-full" />
                            </div>
                            <div className={`text-[10px] mt-1 font-medium ${stops === 'Direct' ? 'text-green-600' : 'text-yellow-600'}`}>
                                {stops}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg">{arrivalTime}</div>
                            <div className="text-xs text-gray-500">{arrivalCity}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100 dark:border-zinc-800">
                        <div>
                            <div className="text-2xl font-bold text-primary">{price}</div>
                        </div>
                        <a href="/seat-selection" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold group-hover:bg-primary transition-colors">
                            Select
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-lg h-full flex flex-col justify-between">
            <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={`w-12 h-12 ${color} bg-opacity-10 rounded-full flex items-center justify-center font-bold text-xs`}>
                        {airlineCode}
                    </div>
                    <div>
                        <div className="font-bold text-lg">{airline}</div>
                        <div className="text-xs text-gray-500">{flightNumber}</div>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center gap-8 w-full md:w-auto text-center">
                    <div>
                        <div className="text-2xl font-bold">{departureTime}</div>
                        <div className="text-xs text-gray-500">{departureCity}</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <div className="text-xs text-gray-400 mb-1">{duration}</div>
                        <div className="w-full h-[1px] bg-gray-300 relative min-w-[80px]">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-gray-300 bg-white rounded-full" />
                        </div>
                        <div className={`text-xs mt-1 font-medium ${stops === 'Direct' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {stops}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{arrivalTime}</div>
                        <div className="text-xs text-gray-500">{arrivalCity}</div>
                    </div>
                </div>

                <div className="text-right w-full md:w-auto border-t md:border-t-0 md:border-l border-dashed border-gray-200 pt-4 md:pt-0 md:pl-6">
                    <div className="text-3xl font-bold text-primary">{price}</div>
                    <div className="text-xs text-gray-500 mb-2">per person</div>
                    <a href="/seat-selection" className="block w-full text-center bg-black text-white px-6 py-2 rounded-xl text-sm font-bold group-hover:bg-primary transition-colors">
                        Select
                    </a>
                </div>
            </div>
        </div>
    );
}
