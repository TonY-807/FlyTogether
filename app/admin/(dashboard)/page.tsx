import { ArrowUpRight, ArrowDownRight, DollarSign, Ticket, Users, Plane, Building, Package } from "lucide-react";

const stats = [
    { name: 'Total Revenue', value: '₹36,18,500', change: '+20.1%', trend: 'up', icon: DollarSign },
    { name: 'Hotel Bookings', value: '412', change: '+12.5%', trend: 'up', icon: Building },
    { name: 'Package Sales', value: '84', change: '+8.4%', trend: 'up', icon: Package },
    { name: 'Active Flights', value: '89', change: '+2.4%', trend: 'up', icon: Plane },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg">
                                <stat.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bookings Chart Placeholder */}
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
                    <h3 className="font-bold text-lg mb-6">Revenue Analytics</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {[40, 70, 45, 90, 65, 80, 55, 30, 60, 75, 50, 85].map((h, i) => (
                            <div key={i} className="w-full bg-primary/10 rounded-t-lg hover:bg-primary/20 transition-colors relative group">
                                <div
                                    className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500"
                                    style={{ height: `${h}%` }}
                                />
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    ₹{h * 80}k
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between text-xs text-gray-400">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
                    <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">New booking #FLY-{8293 + i}</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
