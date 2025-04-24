import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import { Link } from "react-router";
import { DollarSign, TrendingUp, Activity, ArrowRightLeft, HandHeart, HandCoins } from "lucide-react";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen text-white flex bg-[#050B1E]">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto">
                    <div className="py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Welcome message */}
                            <h1 className="text-3xl font-bold text-white mb-4">Welcome back, Trader!</h1>
                            <p className="text-gray-400 mb-8">Here’s what’s happening with your account today.</p>

                            {/* Balance card */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-[#0A1128] to-[#1A1F3D] rounded-xl p-6 border border-gray-800 shadow-xl hover:shadow-2xl transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-primary/10 p-3 rounded-full">
                                                <DollarSign className="text-primary w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">USDT Balance</p>
                                                <h2 className="text-2xl font-semibold text-white">5,230.75 USDT</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/dashboard/wallet/usdt" className="text-primary hover:text-yellow-500 text-sm font-medium">
                                        View Wallet
                                    </Link>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-[#070D20] rounded-xl p-6 border border-gray-800 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                                        <Activity className="text-gray-400 w-5 h-5" />
                                    </div>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        <li>
                                            Bought 100 USDT @ $1.00 — <span className="text-green-400">+$100</span>
                                        </li>
                                        <li>
                                            Transferred 50 USDT to Wallet — <span className="text-yellow-300">Pending</span>
                                        </li>
                                        <li>
                                            Received 200 USDT — <span className="text-green-400">+$200</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Market Summary */}
                                <div className="bg-[#070D20] rounded-xl p-6 border border-gray-800 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">Market Trends</h3>
                                        <TrendingUp className="text-green-400 w-5 h-5" />
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        <p>USDT price today: <span className="text-white font-semibold">$1.00</span></p>
                                        <p>24h Change: <span className="text-green-400">+0.01%</span></p>
                                        <p>Volume: <span className="text-white">$3.2B</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick actions */}
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <button className="flex items-center justify-between px-4 py-3 rounded-lg border border-primary text-white hover:bg-primary/20 transition">
                                    <span>Send USDT</span>
                                    <ArrowRightLeft className="w-5 h-5 text-primary" />
                                </button>
                                <button className="flex items-center justify-between px-4 py-3 rounded-lg border border-primary text-white hover:bg-primary/20 transition">
                                    <span>Buy USDT</span>
                                    <DollarSign className="w-5 h-5 text-primary" />
                                </button>
                                <button className="flex items-center justify-between px-4 py-3 rounded-lg border border-primary text-white hover:bg-primary/20 transition">
                                    <span>Transaction History</span>
                                    <Activity className="w-5 h-5 text-primary" />
                                </button>
                            </div>

                            {/* P2P Donations - Bid and Ask Section */}
                            <div className="mt-12">
                                <h2 className="text-2xl font-semibold text-white mb-4">P2P Donations</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#070D20] p-6 rounded-xl border border-gray-800 shadow">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-medium text-white">Bid for Donation</h3>
                                            <HandHeart className="text-pink-400 w-5 h-5" />
                                        </div>
                                        <p className="text-sm text-gray-400 mb-3">Request help or support from the community using USDT.</p>
                                        <button className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">Create Bid</button>
                                    </div>

                                    <div className="bg-[#070D20] p-6 rounded-xl border border-gray-800 shadow">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-medium text-white">Ask to Donate</h3>
                                            <HandCoins className="text-green-400 w-5 h-5" />
                                        </div>
                                        <p className="text-sm text-gray-400 mb-3">Donate to active community bids and support users in need.</p>
                                        <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">View Requests</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
