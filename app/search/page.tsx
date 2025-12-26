"use client";

import { useSearchParams } from "next/navigation";
import { SearchWidget } from "@/components/search-widget";
import { Filter, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { Suspense, useState } from "react";
import { FlightCard } from "@/components/flight-card";

const MOCK_FLIGHTS = [
    {
        id: 1,
        airline: "Emirates",
        airlineCode: "EK",
        flightNumber: "Boeing 777-300ER",
        departureTime: "10:20",
        departureCity: "DEL",
        arrivalTime: "19:00",
        arrivalCity: "LHR",
        duration: "08h 40m",
        price: "₹62,500",
        stops: "Direct",
        color: "bg-red-500 text-red-600",
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        airline: "Air India",
        airlineCode: "AI",
        flightNumber: "Dreamliner",
        departureTime: "14:00",
        departureCity: "DEL",
        arrivalTime: "23:15",
        arrivalCity: "LHR",
        duration: "09h 15m",
        price: "₹55,000",
        stops: "Direct",
        color: "bg-orange-500 text-orange-600"
    },
    {
        id: 3,
        airline: "British Airways",
        airlineCode: "BA",
        flightNumber: "Airbus A350",
        departureTime: "08:15",
        departureCity: "DEL",
        arrivalTime: "13:30",
        arrivalCity: "LHR",
        duration: "09h 45m",
        price: "₹72,000",
        stops: "1 Stop",
        color: "bg-blue-600 text-blue-700"
    },
    {
        id: 4,
        airline: "Virgin Atlantic",
        airlineCode: "VS",
        flightNumber: "Dreamliner",
        departureTime: "02:45",
        departureCity: "DEL",
        arrivalTime: "07:15",
        arrivalCity: "LHR",
        duration: "09h 00m",
        price: "₹68,500",
        stops: "Direct",
        color: "bg-red-600 text-red-700",
        imageUrl: "https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=1000&auto=format&fit=crop"
    }
];

function SearchContent() {
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "DEL";
    const to = searchParams.get("to") || "LHR";
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-20">
            {/* Compact Header with Search Widget */}
            <div className="bg-black/90 pt-24 pb-12 rounded-b-[3rem] relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-blue-900/50" />
                <div className="container mx-auto px-4 relative z-10 scale-90 origin-top">
                    <SearchWidget />
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="hidden lg:block space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">Filters</h3>
                            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                        </div>
                        {/* Price Slider Placeholder */}
                        <div className="mb-6">
                            <label className="text-sm font-medium text-gray-500 mb-2 block">Price Range</label>
                            <div className="h-2 bg-gray-200 rounded-full w-full">
                                <div className="h-full bg-primary w-1/2 rounded-full" />
                            </div>
                            <div className="flex justify-between text-xs mt-2 font-mono">
                                <span>₹16,000</span>
                                <span>₹1,60,000</span>
                            </div>
                        </div>

                        {/* Airlines Checkbox */}
                        <div>
                            <label className="text-sm font-medium text-gray-500 mb-2 block">Airlines</label>
                            {["Emirates", "Qatar Airways", "Air India", "British Airways"].map(airline => (
                                <div key={airline} className="flex items-center gap-2 mb-2">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" checked readOnly />
                                    <span className="text-sm">{airline}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Flight Results */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Flights from {from} to {to}</h2>

                        <div className="flex items-center gap-4">
                            <div className="flex bg-white dark:bg-zinc-900 rounded-lg p-1 border border-gray-200 dark:border-zinc-800">
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                                Cheapest First <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                        {MOCK_FLIGHTS.map((flight) => (
                            <FlightCard
                                key={flight.id}
                                {...flight}
                                isGrid={viewMode === 'grid'}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading flights...</div>}>
            <SearchContent />
        </Suspense>
    );
}
