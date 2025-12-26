"use client";

import { useState } from "react";
import { Plus, Search, Filter, Plane, Clock, Info, Lock, Unlock, Trash2, X } from "lucide-react";

const INITIAL_FLIGHTS = [
    { id: 1, number: "EK-505", route: "DEL → LHR", status: "Active", time: "11:45 AM", aircraft: "Airbus A380" },
    { id: 2, number: "AI-101", route: "BOM → JFK", status: "Active", time: "02:20 AM", aircraft: "Boeing 777" },
    { id: 3, number: "QR-202", route: "DOH → SIN", status: "Delayed", time: "08:15 PM", aircraft: "Boeing 787" },
    { id: 4, number: "SQ-404", route: "SIN → SYD", status: "Inactive", time: "10:30 PM", aircraft: "Airbus A350" },
];

export default function AdminFlights() {
    const [flights, setFlights] = useState(INITIAL_FLIGHTS);
    const [showAddModal, setShowAddModal] = useState(false);

    const toggleStatus = (id: number) => {
        setFlights(prev => prev.map(f => {
            if (f.id === id) {
                const statuses = ["Active", "Delayed", "Inactive"];
                const currIdx = statuses.indexOf(f.status);
                const nextIdx = (currIdx + 1) % statuses.length;
                return { ...f, status: statuses[nextIdx] };
            }
            return f;
        }));
    };

    const deleteFlight = (id: number) => {
        if (confirm("Cancel/Delete this flight?")) {
            setFlights(prev => prev.filter(f => f.id !== id));
        }
    };

    const addFlight = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newFlight = {
            id: Date.now(),
            number: formData.get("number") as string,
            route: formData.get("route") as string,
            status: "Active",
            time: formData.get("time") as string,
            aircraft: formData.get("aircraft") as string
        };
        setFlights(prev => [newFlight, ...prev]);
        setShowAddModal(false);
    };
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center text-white">
                <div>
                    <h1 className="text-2xl font-bold">Flights Management</h1>
                    <p className="text-gray-500 text-sm">Manage flight schedules, aircraft assignments, and operational status.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-4 h-4" /> Schedule Flight
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden text-white">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Flight / Aircraft</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Route</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Departure</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {flights.map((flight) => (
                            <tr key={flight.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                                            <Plane className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{flight.number}</p>
                                            <p className="text-xs text-gray-500">{flight.aircraft}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{flight.route}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Clock className="w-4 h-4" /> {flight.time}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${flight.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                                        flight.status === 'Delayed' ? 'bg-yellow-500/10 text-yellow-500' :
                                            'bg-red-500/10 text-red-500'
                                        }`}>
                                        {flight.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => toggleStatus(flight.id)}
                                            title="Toggle Status" className="p-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 rounded-lg transition-colors"
                                        >
                                            <Lock className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteFlight(flight.id)}
                                            title="Delete Flight" className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Flight Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Schedule New Flight</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={addFlight} className="space-y-4 text-white">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Flight Number</label>
                                <input name="number" required placeholder="e.g. EK-505" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Route</label>
                                <input name="route" required placeholder="e.g. DEL → DXB" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Departure Time</label>
                                <input name="time" required placeholder="e.g. 10:30 PM" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Aircraft</label>
                                <input name="aircraft" required placeholder="e.g. Airbus A350" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                                Confirm Schedule
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
