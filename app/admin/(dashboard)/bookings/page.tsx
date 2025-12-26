"use client";

import { useState } from "react";
import { Eye, Download, Search, Filter, Lock, Unlock, Trash2, Plus, X, User, Mail, Phone, Info, Plane, CreditCard } from "lucide-react";

const INITIAL_BOOKINGS = [
    {
        id: "#FLY-8293",
        passenger: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 98765 43210",
        seat: "12A",
        class: "Economy",
        flight: "EK505",
        route: "New Delhi (DEL) → London (LHR)",
        date: "24 Oct, 2024",
        status: "Confirmed",
        amount: "₹64,000",
        passport: "L820XXXX",
        meal: "Vegetarian"
    },
    {
        id: "#FLY-8294",
        passenger: "Sarah Smith",
        email: "sarah.s@outlook.com",
        phone: "+1 202 555 0123",
        seat: "04C",
        class: "Business",
        flight: "AI101",
        route: "Mumbai (BOM) → New York (JFK)",
        date: "25 Oct, 2024",
        status: "Pending",
        amount: "₹96,000",
        passport: "A901XXXX",
        meal: "Standard"
    },
    {
        id: "#FLY-8295",
        passenger: "Mike Johnson",
        email: "mike.j@tech.org",
        phone: "+44 20 7946 0852",
        seat: "28F",
        class: "Economy",
        flight: "BA249",
        route: "London (LHR) → New Delhi (DEL)",
        date: "26 Oct, 2024",
        status: "Cancelled",
        amount: "₹52,000",
        passport: "P123XXXX",
        meal: "Non-Veg"
    },
    {
        id: "#FLY-8296",
        passenger: "Emily Brown",
        email: "emily.b@gmail.com",
        phone: "+65 8123 4567",
        seat: "08B",
        class: "Premium Economy",
        flight: "QR505",
        route: "Doha (DOH) → Singapore (SIN)",
        date: "27 Oct, 2024",
        status: "Confirmed",
        amount: "₹72,000",
        passport: "S456XXXX",
        meal: "Standard"
    },
    {
        id: "#FLY-8297",
        passenger: "David Wilson",
        email: "d.wilson@corp.com",
        phone: "+61 2 9385 1000",
        seat: "01A",
        class: "First Class",
        flight: "SQ404",
        route: "Singapore (SIN) → Sydney (SYD)",
        date: "28 Oct, 2024",
        status: "Confirmed",
        amount: "₹88,000",
        passport: "D789XXXX",
        meal: "Kosher"
    },
];

export default function BookingsPage() {
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBooking, setSelectedBooking] = useState<typeof INITIAL_BOOKINGS[0] | null>(null);

    const deleteBooking = (id: string) => {
        if (confirm("Cancel this booking?")) {
            setBookings(prev => prev.filter(b => b.id !== id));
        }
    };

    const nextStatus = (id: string) => {
        setBookings(prev => prev.map(b => {
            if (b.id === id) {
                const states = ["Pending", "Confirmed", "Cancelled"];
                const currIdx = states.indexOf(b.status);
                const nextIdx = (currIdx + 1) % states.length;
                return { ...b, status: states[nextIdx] };
            }
            return b;
        }));
    };

    const filteredBookings = bookings.filter(b =>
        b.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 w-full md:w-80 outline-none focus:ring-2 ring-primary/20"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                        <Plus className="w-4 h-4" /> New Booking
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-200 dark:border-zinc-800 text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Booking ID</th>
                            <th className="px-6 py-4 font-medium">Passenger</th>
                            <th className="px-6 py-4 font-medium">Flight Info</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Amount</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <td className="px-6 py-4 font-mono font-medium">{booking.id}</td>
                                <td className="px-6 py-4 font-medium">{booking.passenger}</td>
                                <td className="px-6 py-4 text-gray-500">{booking.flight}</td>
                                <td className="px-6 py-4 text-gray-500">{booking.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-bold">{booking.amount}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedBooking(booking)}
                                            title="View Details" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-gray-500"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => nextStatus(booking.id)}
                                            title="Update Status" className="p-2 hover:bg-yellow-500/10 text-yellow-500 rounded-lg transition-colors font-bold"
                                        >
                                            <Unlock className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteBooking(booking.id)}
                                            title="Cancel/Delete Booking" className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
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

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden text-white">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-800/50">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    Booking Details <span className="text-sm font-mono text-indigo-400">{selectedBooking.id}</span>
                                </h2>
                                <p className="text-xs text-white/40">Registered on {selectedBooking.date}</p>
                            </div>
                            <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Passenger Info */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Passenger Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <User className="w-4 h-4 text-white/40" />
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Full Name</p>
                                            <p className="font-bold">{selectedBooking.passenger}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-white/40" />
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Email</p>
                                            <p className="font-medium text-sm">{selectedBooking.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-white/40" />
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Phone</p>
                                            <p className="font-medium text-sm">{selectedBooking.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Info className="w-4 h-4 text-white/40" />
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Passport Number</p>
                                            <p className="font-mono text-xs">{selectedBooking.passport}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Flight & Booking Info */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Flight & Seat Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Plane className="w-4 h-4 text-white/40" />
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Flight / Route</p>
                                            <p className="font-bold text-sm">{selectedBooking.flight}</p>
                                            <p className="text-[10px] text-white/50">{selectedBooking.route}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Seat</p>
                                            <p className="font-black text-xl text-indigo-400">{selectedBooking.seat}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Class</p>
                                            <p className="font-bold text-sm">{selectedBooking.class}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Meal Preference</p>
                                            <p className="font-medium text-sm">{selectedBooking.meal}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Amount Paid</p>
                                            <p className="font-bold text-sm text-green-400">{selectedBooking.amount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end gap-3">
                            <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20">
                                <Download className="w-4 h-4" /> Download E-Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
