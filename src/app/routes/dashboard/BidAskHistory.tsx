import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

export default function BidAskHistory() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [bids, setBids] = useState<any[]>([]);
    const [asks, setAsks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"bids" | "asks">("bids");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
    }, [activeTab, currentPage]);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const endpoint = activeTab === "bids" ? "bids" : "asks";
            const res = await fetch(`${baseUrl}${endpoint}?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            const items = data.data?.data || [];
            if (activeTab === "bids") setBids(items);
            else setAsks(items);
            setLastPage(data.data?.last_page || 1);
            setCurrentPage(data.data?.current_page || 1);
        } catch (err) {
            console.error("Failed to fetch history", err);
        } finally {
            setLoading(false);
        }
    };

    const renderCard = (item: any, type: "bid" | "ask") => (
        <Link to={type === "bid" ? `/bids/${item.id}` : `/asks/${item.id}`} key={item.id}>
            <div className="p-6 rounded-2xl bg-[#1A202C] border border-[#2D3748] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <p className="text-white font-semibold text-2xl mt-2">{item.amount} USDT</p>
                <p className="text-gray-400 text-xs mt-2">
                    {formatDistanceToNow(new Date(item.created_at))} ago
                </p>
                <p className="text-gray-400 text-sm mt-2">TRX: <span className="text-white">{item.trx}</span></p>
                <p className="text-gray-400 text-sm mt-2">
                    Status:{" "}
                    <span
                        className={`text-sm font-medium ${
                            item.status === "pending"
                                ? "text-yellow-400"
                                : item.status === "success"
                                    ? "text-green-500"
                                    : item.status === "paired"
                                        ? "text-blue-500"
                                        : item.status === "completed"
                                            ? "text-blue-800"
                                            : item.status === "partly_paired"
                                                ? "text-blue-400"
                                                : "text-red-500"
                        }`}
                    >
                        {item.status}
                    </span>
                </p>
            </div>
        </Link>
    );

    const Pagination = () => (
        <div className="flex justify-center mt-6 space-x-4">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
                Prev
            </button>
            <span className="text-gray-300 self-center">Page {currentPage} of {lastPage}</span>
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
                disabled={currentPage === lastPage}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050B1E] text-white flex">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto py-10 px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6 text-center">Bid & Ask History</h1>

                        {loading ? (
                            <p className="text-gray-400 text-center">Loading history...</p>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex space-x-4 bg-[#070D20] p-2 rounded-lg border border-gray-700">
                                    <button
                                        onClick={() => {
                                            setActiveTab("bids");
                                            setCurrentPage(1);
                                        }}
                                        className={`flex-1 text-center text-lg font-semibold transition-all duration-300 p-2 rounded-md ${
                                            activeTab === "bids"
                                                ? "bg-[#0A1128] text-white"
                                                : "bg-transparent text-gray-400 hover:bg-[#1A202C]"
                                        }`}
                                    >
                                        Bids
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActiveTab("asks");
                                            setCurrentPage(1);
                                        }}
                                        className={`flex-1 text-center text-lg font-semibold transition-all duration-300 p-2 rounded-md ${
                                            activeTab === "asks"
                                                ? "bg-[#0A1128] text-white"
                                                : "bg-transparent text-gray-400 hover:bg-[#1A202C]"
                                        }`}
                                    >
                                        Asks
                                    </button>
                                </div>

                                {activeTab === "bids" && (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                            {bids.length ? (
                                                bids.map((bid) => renderCard(bid, "bid"))
                                            ) : (
                                                <p className="text-gray-400 text-center col-span-full">No bids yet.</p>
                                            )}
                                        </div>
                                        <Pagination />
                                    </>
                                )}

                                {activeTab === "asks" && (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                            {asks.length ? (
                                                asks.map((ask) => renderCard(ask, "ask"))
                                            ) : (
                                                <p className="text-gray-400 text-center col-span-full">No asks yet.</p>
                                            )}
                                        </div>
                                        <Pagination />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
