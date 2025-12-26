"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Ticket, Users, Settings, LogOut, Plane, Building, Package, Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const router = useRouter();

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Bookings", href: "/admin/bookings", icon: Ticket },
        { name: "Flights", href: "/admin/flights", icon: Plane },
        { name: "Hotels", href: "/admin/hotels", icon: Building },
        { name: "Packages", href: "/admin/packages", icon: Package },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const handleLogout = () => {
        // In a real app, clear auth tokens here
        router.push("/");
    };

    return (
        <div className="flex h-screen bg-[#02040a] dark:bg-[#02040a] selection:bg-indigo-500/30">
            {/* Sidebar */}
            <aside className="w-64 bg-[#090c14] dark:bg-[#090c14] border-r border-white/[0.05] flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
                <div className="h-20 flex items-center px-8 border-b border-white/[0.05]">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic">
                            Altos<span className="text-indigo-600">Admin</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/[0.05]">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.08),transparent_500px)]">
                <header className="h-16 bg-[#090c14]/40 backdrop-blur-xl border-b border-white/[0.05] flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="font-semibold text-lg">
                        {navigation.find(n => n.href === pathname)?.name || 'Dashboard'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-gray-400">
                            AD
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
