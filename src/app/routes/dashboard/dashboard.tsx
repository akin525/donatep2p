import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import { Link } from "react-router";
import { DollarSign, TrendingUp, Activity, ArrowRightLeft, HandHeart, HandCoins, Copy } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useUser() as any;
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    const referralLink = user?.ref_code ? `${baseUrl}/register?ref=${user.ref_code}` : "";

    const handleCopyReferral = () => {
        if (user?.ref_code) {
            navigator.clipboard.writeText(user.ref_code);
            toast.success("Referral code copied to clipboard!");
        }
    };

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
                            <h1 className="text-3xl font-bold text-white mb-4">Welcome back, {user?.firstname}!</h1>
                            <p className="text-gray-400 mb-8">Here’s what’s happening with your account today.</p>

                            {/* Main cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Balance & Earnings */}
                                <div className="bg-gradient-to-br from-[#0A1128] to-[#1A1F3D] rounded-xl p-6 border border-gray-800 shadow-xl hover:shadow-2xl transition-shadow">
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-400">USDT Balance</p>
                                        <h2 className="text-2xl font-semibold text-white">{user?.balance || "0"} USDT</h2>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-400">Total Earnings</p>
                                        <h2 className="text-2xl font-semibold text-green-400">{user?.earning || "0"} USDT</h2>
                                    </div>
                                    <Link to="/dashboard/wallet/usdt" className="text-primary hover:text-yellow-500 text-sm font-medium">
                                        View Wallet
                                    </Link>
                                </div>

                                {/* Referral Code */}
                                <div className="bg-[#070D20] rounded-xl p-6 border border-gray-800 shadow-xl">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-lg font-semibold text-white">Referral Code</h3>
                                        <button
                                            onClick={handleCopyReferral}
                                            className="text-gray-300 hover:text-white transition"
                                            title="Copy code"
                                        >
                                            <Copy className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="text-white bg-[#1A1F3D] px-4 py-2 rounded-md font-mono text-center mb-2">
                                        {user?.ref_code || "N/A"}
                                    </div>

                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm text-gray-400">Referral Link</p>
                                        <button
                                            onClick={() => {
                                                if (referralLink) {
                                                    navigator.clipboard.writeText(referralLink);
                                                    toast.success("Referral link copied to clipboard!");
                                                }
                                            }}
                                            className="text-gray-300 hover:text-white transition"
                                            title="Copy link"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="text-white bg-[#1A1F3D] px-4 py-2 rounded-md font-mono text-center text-sm break-all">
                                        {referralLink || "N/A"}
                                    </div>
                                </div>

                                    {/* Market Trends */}
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

                            {/* Quick Actions */}
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

                            {/* P2P Donations */}
                            <div className="mt-12">
                                <h2 className="text-2xl font-semibold text-white mb-4">P2P Donations</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Bid Card */}
                                    <div className="bg-[#070D20] p-6 rounded-xl border border-gray-800 shadow hover:shadow-lg transition">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-medium text-white">Bid for Donation</h3>
                                            <HandHeart className="text-pink-400 w-5 h-5" />
                                        </div>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Request help or support from the community using USDT.
                                        </p>
                                        <Link
                                            to="/bid"
                                            className="block w-full text-center py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                                        >
                                            Create Bid
                                        </Link>
                                    </div>

                                    {/* Ask Card */}
                                    <div className="bg-[#070D20] p-6 rounded-xl border border-gray-800 shadow hover:shadow-lg transition">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-medium text-white">Ask to Donate</h3>
                                            <HandCoins className="text-green-400 w-5 h-5" />
                                        </div>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Donate to active community bids and support users in need.
                                        </p>
                                        <Link
                                            to="/ask"
                                            className="block w-full text-center py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                        >
                                            View Requests
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activities */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">{/* Recent Bid Activity */}
                                <div className="bg-[#070D20] rounded-xl p-6 border border-gray-800 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">Recent Bid Activity</h3>
                                        <Activity className="text-gray-400 w-5 h-5" />
                                    </div>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        {user?.recentBids?.length > 0 ? (
                                            user.recentBids.map((bid: any) => (
                                                <li key={bid.id}>
                                                    Bid {bid.amount} USDT —{" "}
                                                    <span className={bid.status === "pending" ? "text-yellow-300" : "text-green-400"}>
                                                        {bid.status}
                                                    </span>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No recent bid activity.</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Recent Ask Activity */}
                                <div className="bg-[#070D20] rounded-xl p-6 border border-gray-800 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">Recent Ask Activity</h3>
                                        <Activity className="text-gray-400 w-5 h-5" />
                                    </div>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        {user?.recentAsks?.length > 0 ? (
                                            user.recentAsks.map((ask: any) => (
                                                <li key={ask.id}>
                                                    Asked for {ask.amount} USDT —{" "}
                                                    <span className={ask.status === "pending" ? "text-yellow-300" : "text-green-400"}>
                                                        {ask.status}
                                                    </span>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No recent ask activity.</li>
                                        )}
                                    </ul>
                                </div>

                                </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
