"use client";

import { useState } from "react";
import { MoveLeft, User, Armchair } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Seat Data
const SEAT_ROWS = 10;
const SEAT_COLS = ["A", "B", "C", "D", "E", "F"];
const BLOCKED_SEATS = ["1A", "2B", "5C"];
const BOOKED_SEATS = ["3A", "3B", "4D"];

export default function SeatSelectionPage() {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const toggleSeat = (seatId: string) => {
        if (BLOCKED_SEATS.includes(seatId) || BOOKED_SEATS.includes(seatId)) return;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-foreground pb-20">
            {/* Header */}
            <header className="fixed top-0 w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-zinc-800">
                            <MoveLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="font-bold text-lg">Select Seats</h1>
                            <p className="text-xs text-gray-500">DEL - LHR • Flight EK505</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500">Total Price</div>
                        <div className="font-bold text-lg text-primary">₹{selectedSeats.length * 3500}</div>
                    </div>
                </div>
            </header>

            <main className="pt-24 container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Plane Layout */}
                    <div className="flex-1 bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl border border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-100 dark:bg-zinc-800 px-6 py-2 rounded-b-xl text-xs font-mono uppercase tracking-widest text-gray-500">
                            Cockpit
                        </div>

                        <div className="mt-12 flex flex-col gap-4 items-center">
                            {Array.from({ length: SEAT_ROWS }).map((_, rowIndex) => (
                                <div key={rowIndex} className="flex gap-8 items-center">
                                    <div className="flex gap-2">
                                        {SEAT_COLS.slice(0, 3).map((col) => {
                                            const seatId = `${rowIndex + 1}${col}`;
                                            const isSelected = selectedSeats.includes(seatId);
                                            const isBooked = BOOKED_SEATS.includes(seatId);
                                            const isBlocked = BLOCKED_SEATS.includes(seatId);

                                            return (
                                                <button
                                                    key={seatId}
                                                    onClick={() => toggleSeat(seatId)}
                                                    disabled={isBooked || isBlocked}
                                                    className={cn(
                                                        "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all border",
                                                        isBooked ? "bg-gray-200 text-gray-400 border-transparent cursor-not-allowed" :
                                                            isBlocked ? "bg-transparent border-transparent opacity-0 cursor-default" :
                                                                isSelected ? "bg-primary text-white border-primary shadow-lg scale-110" :
                                                                    "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 hover:border-primary hover:text-primary"
                                                    )}
                                                >
                                                    {isBooked ? "X" : col}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="text-xs font-mono text-gray-300 w-4 text-center">{rowIndex + 1}</div>

                                    <div className="flex gap-2">
                                        {SEAT_COLS.slice(3).map((col) => {
                                            const seatId = `${rowIndex + 1}${col}`;
                                            const isSelected = selectedSeats.includes(seatId);
                                            const isBooked = BOOKED_SEATS.includes(seatId);
                                            const isBlocked = BLOCKED_SEATS.includes(seatId);

                                            return (
                                                <button
                                                    key={seatId}
                                                    onClick={() => toggleSeat(seatId)}
                                                    disabled={isBooked || isBlocked}
                                                    className={cn(
                                                        "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all border",
                                                        isBooked ? "bg-gray-200 text-gray-400 border-transparent cursor-not-allowed" :
                                                            isBlocked ? "bg-transparent border-transparent opacity-0 cursor-default" :
                                                                isSelected ? "bg-primary text-white border-primary shadow-lg scale-110" :
                                                                    "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 hover:border-primary hover:text-primary"
                                                    )}
                                                >
                                                    {isBooked ? "X" : col}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend / Summary */}
                    <div className="w-full md:w-80 space-y-6">
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-100 dark:border-zinc-800">
                            <h3 className="font-bold mb-4">Legend</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-lg border border-gray-200 bg-white"></div>
                                    <span className="text-sm">Available</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-lg bg-primary border border-primary"></div>
                                    <span className="text-sm">Selected</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-lg bg-gray-200 text-gray-400 flex items-center justify-center text-xs">X</div>
                                    <span className="text-sm">Booked</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                            <h3 className="font-bold mb-4 text-primary">Your Selection</h3>
                            {selectedSeats.length === 0 ? (
                                <p className="text-sm text-gray-500">No seats selected.</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {selectedSeats.map(seat => (
                                        <span key={seat} className="px-3 py-1 bg-white rounded-full text-xs font-bold shadow-sm text-primary">
                                            {seat}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="mt-6 pt-6 border-t border-primary/10">
                                <a href="/book/passenger" className="block w-full text-center bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all">
                                    Confirm Selection
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
