"use client";

import { useState } from "react";
import { Plus, Search, User, ShieldCheck, Mail, Lock, Unlock, Trash2, X } from "lucide-react";

const INITIAL_USERS = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", role: "Passenger", joined: "Oct 12, 2024" },
    { id: 2, name: "Sarah Smith", email: "sarah@startup.com", status: "Active", role: "Admin", joined: "Oct 15, 2024" },
    { id: 3, name: "Mike Johnson", email: "mike@travel.org", status: "Blocked", role: "Passenger", joined: "Oct 18, 2024" },
];

export default function AdminUsers() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [showAddModal, setShowAddModal] = useState(false);

    const toggleBlock = (id: number) => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                return { ...u, status: u.status === 'Blocked' ? 'Active' : 'Blocked' };
            }
            return u;
        }));
    };

    const deleteUser = (id: number) => {
        if (confirm("Permanently delete this user account?")) {
            setUsers(prev => prev.filter(u => u.id !== id));
        }
    };

    const addUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newUser = {
            id: Date.now(),
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            status: "Active",
            role: "Passenger",
            joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        setUsers(prev => [newUser, ...prev]);
        setShowAddModal(false);
    };
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center text-white">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-gray-500 text-sm">Monitor user activity, manage roles, and enforce security policies.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-4 h-4" /> Add New User
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden text-white">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User / Role</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-zinc-800 flex items-center justify-center">
                                            <User className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                                            <div className="flex items-center gap-1">
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${user.role === 'Admin' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Mail className="w-4 h-4" /> {user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-500">{user.joined}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => toggleBlock(user.id)}
                                            title={user.status === 'Blocked' ? "Unblock User" : "Block User"}
                                            className={`p-2 rounded-lg transition-colors ${user.status === 'Blocked'
                                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                                : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                                                }`}
                                        >
                                            {user.status === 'Blocked' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            title="Delete User" className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
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

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Add New User</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={addUser} className="space-y-4 text-white">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Full Name</label>
                                <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Email Address</label>
                                <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                                Create User
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
