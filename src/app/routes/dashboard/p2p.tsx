import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import { HandCoins, HandHeart } from "lucide-react";

export default function P2P() {
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
                            <h1 className="text-3xl font-bold text-white mb-4">Peer-to-Peer Donations</h1>
                            <p className="text-gray-400 mb-8">Find bids or requests to donate USDT to others in the community.</p>

                            {/* Search Bar */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Search donations or requests..."
                                    className="w-full p-3 rounded-lg bg-[#0A1128] border border-gray-700 text-white placeholder-gray-400"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Bid for Donation */}
                                <div className="bg-[#070D20] p-6 rounded-xl border border-gray-800 shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-medium text-white">Bid for Donation</h3>
                                        <HandHeart className="text-pink-400 w-5 h-5" />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">Need help? Create a bid and receive donations in USDT from the community.</p>
                                    <button className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">Create a Bid</button>
                                </div>

                                {/* Ask to Donate */}
                                <div className="bg-[#070D20] p-6 rounded-xl border border-gray-800 shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-medium text-white">Ask to Donate</h3>
                                        <HandCoins className="text-green-400 w-5 h-5" />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">Want to help others? View active bids and donate directly.</p>
                                    <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">View Donation Requests</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
