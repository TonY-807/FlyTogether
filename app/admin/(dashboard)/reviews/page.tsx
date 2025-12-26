"use client";

import { useState } from "react";
import { Star, Trash2, CheckCircle, XCircle, Search, Filter, MessageSquare, User } from "lucide-react";

const INITIAL_REVIEWS = [
    {
        id: 1,
        user: "Alex Rivera",
        rating: 5,
        comment: "The AI price prediction is a game changer. Saved ₹15,000 on my last trip to Tokyo.",
        date: "Oct 24, 2024",
        status: "Approved",
        avatar: "https://i.pravatar.cc/150?u=alex"
    },
    {
        id: 2,
        user: "Sarah Chen",
        rating: 5,
        comment: "FlyTogether makes complex bookings feel like a breeze. The hotel recommendations were spot on.",
        date: "Oct 25, 2024",
        status: "Pending",
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        id: 3,
        user: "James Wilson",
        rating: 4,
        comment: "Customer support is lightning fast. Had a flight change and it was resolved in minutes.",
        date: "Oct 26, 2024",
        status: "Approved",
        avatar: "https://i.pravatar.cc/150?u=james"
    }
];

export default function AdminReviews() {
    const [reviews, setReviews] = useState(INITIAL_REVIEWS);
    const [searchTerm, setSearchTerm] = useState("");

    const updateStatus = (id: number, status: string) => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    const deleteReview = (id: number) => {
        if (confirm("Permanently delete this review?")) {
            setReviews(prev => prev.filter(r => r.id !== id));
        }
    };

    const filteredReviews = reviews.filter(r =>
        r.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white">
                <div>
                    <h1 className="text-2xl font-bold italic uppercase tracking-tighter">Review Moderation</h1>
                    <p className="text-gray-500 text-sm font-medium">Manage and approve customer testimonials for the landing page.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-zinc-800 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 ring-indigo-500/50 w-64 text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Total Reviews", value: reviews.length, color: "text-indigo-400" },
                    { label: "Pending Approval", value: reviews.filter(r => r.status === 'Pending').length, color: "text-yellow-400" },
                    { label: "Avg. Rating", value: "4.8", color: "text-green-400" }
                ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900 border border-white/10 p-5 rounded-2xl">
                        <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-zinc-800/50 border-b border-white/10">
                        <tr>
                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Reviewer</th>
                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Content</th>
                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Date / Status</th>
                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Moderation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredReviews.map((review) => (
                            <tr key={review.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-4">
                                        <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full ring-2 ring-white/5" />
                                        <div>
                                            <p className="text-white font-bold">{review.user}</p>
                                            <div className="flex gap-0.5 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-700'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6 max-w-md">
                                    <div className="flex gap-3">
                                        <MessageSquare className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
                                        <p className="text-gray-400 text-sm leading-relaxed italic">"{review.comment}"</p>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <p className="text-zinc-500 text-xs font-bold mb-1">{review.date}</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${review.status === 'Approved' ? 'bg-green-500/10 text-green-500' :
                                            review.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {review.status}
                                    </span>
                                </td>
                                <td className="px-6 py-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {review.status !== 'Approved' && (
                                            <button
                                                onClick={() => updateStatus(review.id, 'Approved')}
                                                title="Approve"
                                                className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-lg transition-all"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        )}
                                        {review.status !== 'Rejected' && (
                                            <button
                                                onClick={() => updateStatus(review.id, 'Rejected')}
                                                title="Reject"
                                                className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-all"
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteReview(review.id)}
                                            title="Delete"
                                            className="p-2 bg-zinc-800 text-gray-500 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all"
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
        </div>
    );
}
