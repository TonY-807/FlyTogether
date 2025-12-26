"use client";

import { useState } from "react";
import { Plus, Search, Filter, Building, Star, Lock, Unlock, Trash2, X } from "lucide-react";

const INITIAL_HOTELS = [
    { id: 1, name: "Aman Tokyo", location: "Tokyo, Japan", status: "Active", rooms: 84, rating: 4.9, bookings: 124 },
    { id: 2, name: "Ritz-Carlton Maldives", location: "Maldivies", status: "Active", rooms: 100, rating: 5.0, bookings: 89 },
    { id: 3, name: "The Savoy", location: "London, UK", status: "Pending", rooms: 267, rating: 4.8, bookings: 215 },
    { id: 4, name: "Burj Al Arab", location: "Dubai, UAE", status: "Inactive", rooms: 202, rating: 4.9, bookings: 342 },
];

export default function AdminHotels() {
    const [hotels, setHotels] = useState(INITIAL_HOTELS);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleStatus = (id: number) => {
        setHotels(prev => prev.map(h => {
            if (h.id === id) {
                const newStatus = h.status === 'Inactive' ? 'Active' : 'Inactive';
                return { ...h, status: newStatus };
            }
            return h;
        }));
    };

    const deleteHotel = (id: number) => {
        if (confirm("Are you sure you want to delete this hotel?")) {
            setHotels(prev => prev.filter(h => h.id !== id));
        }
    };

    const addHotel = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newHotel = {
            id: Date.now(),
            name: formData.get("name") as string,
            location: formData.get("location") as string,
            status: "Active",
            rooms: parseInt(formData.get("rooms") as string) || 0,
            rating: 5.0,
            bookings: 0
        };
        setHotels(prev => [newHotel, ...prev]);
        setShowAddModal(false);
    };

    const filteredHotels = hotels.filter(h =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Hotels Management</h1>
                    <p className="text-gray-500 text-sm">Manage your global hotel listings and partnerships.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-4 h-4" /> Add New Hotel
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search hotels..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-zinc-800 rounded-lg text-sm font-medium">
                    <Filter className="w-4 h-4" /> Filters
                </button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden text-white">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Hotel Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Rooms</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Bookings</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {filteredHotels.map((hotel) => (
                            <tr key={hotel.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                                            <Building className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{hotel.name}</p>
                                            <p className="text-xs text-gray-500">{hotel.location}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">{hotel.rooms}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-sm font-bold text-yellow-500">
                                        <Star className="w-4 h-4 fill-current" /> {hotel.rating}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">{hotel.bookings}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${hotel.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                                        hotel.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                            'bg-red-500/10 text-red-500'
                                        }`}>
                                        {hotel.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => toggleStatus(hotel.id)}
                                            title={hotel.status === 'Inactive' ? "Unblock Hotel" : "Block Hotel"}
                                            className={`p-2 rounded-lg transition-colors ${hotel.status === 'Inactive'
                                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                                : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                                                }`}
                                        >
                                            {hotel.status === 'Inactive' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => deleteHotel(hotel.id)}
                                            title="Delete Hotel"
                                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
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
            {/* Add Hotel Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Add New Hotel</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={addHotel} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Hotel Name</label>
                                <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Location</label>
                                <input name="location" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Total Rooms</label>
                                <input name="rooms" type="number" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                                Create Listing
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
