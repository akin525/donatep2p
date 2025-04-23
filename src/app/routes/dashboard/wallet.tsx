import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import { ArrowDownRight, ArrowUpRight, ClipboardList, DollarSign } from "lucide-react";

export default function Wallet() {
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
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold text-white mb-6">My Wallet</h1>

                            {/* Wallet Balance */}
                            <div className="bg-gradient-to-r from-[#1F2937] to-[#111827] p-6 rounded-xl shadow-lg border border-gray-700 mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm">USDT Balance</p>
                                        <h2 className="text-3xl font-semibold">5,230.75 USDT</h2>
                                    </div>
                                    <DollarSign className="w-10 h-10 text-primary" />
                                </div>
                            </div>

                            {/* Wallet Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <button className="flex items-center justify-between px-4 py-4 rounded-xl bg-primary/10 border border-primary text-white hover:bg-primary/20 transition">
                                    <span>Send</span>
                                    <ArrowUpRight className="w-5 h-5" />
                                </button>
                                <button className="flex items-center justify-between px-4 py-4 rounded-xl bg-primary/10 border border-primary text-white hover:bg-primary/20 transition">
                                    <span>Receive</span>
                                    <ArrowDownRight className="w-5 h-5" />
                                </button>
                                <button className="flex items-center justify-between px-4 py-4 rounded-xl bg-primary/10 border border-primary text-white hover:bg-primary/20 transition">
                                    <span>Transaction History</span>
                                    <ClipboardList className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Transaction Summary */}
                            <div className="bg-[#070D20] p-6 rounded-xl border border-gray-800 shadow">
                                <h3 className="text-xl font-semibold text-white mb-4">Recent Transactions</h3>
                                <ul className="divide-y divide-gray-800 text-sm text-gray-300">
                                    <li className="py-3 flex justify-between">
                                        <span>Sent 50 USDT to Wallet</span>
                                        <span className="text-yellow-300">Pending</span>
                                    </li>
                                    <li className="py-3 flex justify-between">
                                        <span>Received 200 USDT</span>
                                        <span className="text-green-400">Completed</span>
                                    </li>
                                    <li className="py-3 flex justify-between">
                                        <span>Bought 100 USDT</span>
                                        <span className="text-green-400">Completed</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
