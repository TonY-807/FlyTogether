"use client";

import { CheckCircle, Download, Share2, Home } from "lucide-react";

export default function ConfirmationPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-20 pt-24">
            <div className="container mx-auto px-4 max-w-xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                <p className="text-gray-500 mb-8">Reference ID: #FLY-8293-XJ</p>

                {/* Ticket Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-0 shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden text-left mb-8 relative">
                    {/* Airline Header */}
                    <div className="bg-primary/10 p-6 flex justify-between items-center border-b border-dashed border-primary/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xs font-bold text-red-600">EK</div>
                            <span className="font-bold">Emirates</span>
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Confirmed</div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest">Date</div>
                                <div className="font-bold text-lg">24 Oct, 2024</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest text-right">Time</div>
                                <div className="font-bold text-lg">10:20</div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-3xl font-bold">DEL</div>
                                <div className="text-xs text-gray-500">New Delhi</div>
                            </div>
                            <div className="flex-1 px-4 text-center">
                                <div className="text-xs text-gray-400">08h 40m</div>
                                <div className="border-t border-dashed border-gray-300 my-2"></div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold">LHR</div>
                                <div className="text-xs text-gray-500">London</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest">Passenger</div>
                                <div className="font-bold">John Doe</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-500 uppercase tracking-widest">Seat</div>
                                <div className="font-bold">3A</div>
                            </div>
                        </div>
                    </div>

                    {/* Cutout Effect */}
                    <div className="absolute left-0 bottom-24 w-4 h-4 rounded-r-full bg-gray-50 dark:bg-zinc-950"></div>
                    <div className="absolute right-0 bottom-24 w-4 h-4 rounded-l-full bg-gray-50 dark:bg-zinc-950"></div>
                </div>

                <div className="flex gap-4 justify-center">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                </div>

                <div className="mt-8">
                    <a href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
                        <Home className="w-4 h-4" /> Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
