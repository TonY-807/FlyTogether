"use client";

import { useState } from "react";
import { Plus, Search, Package, MapPin, DollarSign, Edit, Trash2, Lock, Unlock, X } from "lucide-react";

const INITIAL_PACKAGES = [
    { id: 1, name: "Maldives Paradise", location: "Malé, Maldives", type: "Honeymoon", price: "₹1,85,000", bookings: 45, status: 'Active' },
    { id: 2, name: "Swiss Alps Adventure", location: "Zermatt, Switzerland", type: "Adventure", price: "₹2,10,000", bookings: 32, status: 'Active' },
    { id: 3, name: "Bali Jungle & Beach", location: "Ubud, Bali", type: "Leisure", price: "₹95,000", bookings: 128, status: 'Active' },
];

export default function AdminPackages() {
    const [packages, setPackages] = useState(INITIAL_PACKAGES);
    const [showAddModal, setShowAddModal] = useState(false);

    const toggleStatus = (id: number) => {
        setPackages(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return p;
        }));
    };

    const deletePackage = (id: number) => {
        if (confirm("Delete this package?")) {
            setPackages(prev => prev.filter(p => p.id !== id));
        }
    };

    const addPackage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPkg = {
            id: Date.now(),
            name: formData.get("name") as string,
            location: formData.get("location") as string,
            type: "Custom",
            price: `₹${formData.get("price")}`,
            bookings: 0,
            status: 'Active'
        };
        setPackages(prev => [newPkg, ...prev]);
        setShowAddModal(false);
    };
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Holiday Packages</h1>
                    <p className="text-gray-500 text-sm">Curate and manage exclusive flight+hotel bundles.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-4 h-4" /> Create Package
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 space-y-4 hover:shadow-xl transition-all">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center">
                                <Package className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 h-8 w-8 flex items-center justify-center bg-gray-50 dark:bg-zinc-800 rounded-lg hover:text-indigo-600 transition-colors" title="Edit Package">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => toggleStatus(pkg.id)}
                                    className={`p-2 h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${pkg.status === 'Active' ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'}`}
                                    title={pkg.status === 'Active' ? "Deactivate Package" : "Activate Package"}
                                >
                                    {pkg.status === 'Active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => deletePackage(pkg.id)}
                                    className="p-2 h-8 w-8 flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                                    title="Delete Package"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{pkg.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <MapPin className="w-3 h-3" /> {pkg.location}
                            </div>
                        </div>

                        <div className="flex gap-4 items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Starting From</p>
                                <p className="text-lg font-black text-indigo-600">{pkg.price}</p>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase mb-1 ${pkg.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {pkg.status}
                                </span>
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Sold</p>
                                <p className="font-bold text-gray-900 dark:text-white">{pkg.bookings}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Package Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Create New Package</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={addPackage} className="space-y-4 text-white">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Package Name</label>
                                <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Destination</label>
                                <input name="location" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Base Price (₹)</label>
                                <input name="price" type="text" required placeholder="e.g. 1,20,000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                                Launch Package
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
