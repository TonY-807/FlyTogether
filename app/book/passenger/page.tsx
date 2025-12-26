"use client";

import { useState } from "react";
import { User, Mail, Phone, Luggage } from "lucide-react";

export default function PassengerPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-20 pt-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Passenger Details</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <User className="w-5 h-5" /> Adult 1
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First Name</label>
                                    <input type="text" className="w-full p-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent" placeholder="e.g. John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Last Name</label>
                                    <input type="text" className="w-full p-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent" placeholder="e.g. Doe" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-1">Email (for e-ticket)</label>
                                <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                                    <span className="px-3 bg-gray-50 dark:bg-zinc-800 text-gray-500"><Mail className="w-4 h-4" /></span>
                                    <input type="email" className="w-full p-2 bg-transparent outline-none" placeholder="john@example.com" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Luggage className="w-5 h-5" /> Baggage & Add-ons
                            </h2>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:border-primary">
                                    <input type="checkbox" className="w-4 h-4 text-primary" />
                                    <span className="flex-1 text-sm">Extra Baggage (20kg)</span>
                                    <span className="font-bold text-sm">+₹3,200</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:border-primary">
                                    <input type="checkbox" className="w-4 h-4 text-primary" />
                                    <span className="flex-1 text-sm">Travel Insurance</span>
                                    <span className="font-bold text-sm">+₹1,200</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <a href="/book/payment" className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition-colors">
                                Proceed to Pay
                            </a>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 sticky top-24">
                            <h3 className="font-bold border-b border-gray-200 dark:border-zinc-800 pb-2 mb-4">Fare Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Base Fare (1 Adult)</span>
                                    <span>₹60,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Taxes & Fees</span>
                                    <span>₹3,500</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-zinc-800 mt-2">
                                    <span>Total</span>
                                    <span className="text-primary">₹64,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
