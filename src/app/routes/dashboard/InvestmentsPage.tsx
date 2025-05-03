import { useEffect, useState } from "react";
import { getAuthToken } from "@/utils/auth.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import DashboardHeader from "@/components/DashboardHeader.tsx";

interface Investment {
    id: number;
    title: string;
    amount: number;
    status: string;
    created_at: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

export default function InvestmentsPage() {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const res = await fetch(`${baseUrl}investments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch investments");

                const result = await res.json();
                setInvestments(result?.data?.data || []);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchInvestments();
    }, []);

    return (
        <div className="min-h-screen text-white flex bg-gradient-to-br from-[#0A0F1E] to-[#1E293B]">
            {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <div className="min-h-screen bg-[#0A0F1E] text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">My Investments</h1>

            {loading ? (
                <p className="text-center text-gray-400">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-400">Error: {error}</p>
            ) : investments.length === 0 ? (
                <p className="text-center text-gray-500">No investments found.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {investments.map((inv) => (
                        <div
                            key={inv.id}
                            className="bg-[#1F2937] border border-gray-700 rounded-lg p-4 shadow hover:shadow-xl transition"
                        >
                            <h2 className="text-xl font-semibold mb-1">{inv.title}</h2>
                            <p className="text-gray-400 text-sm mb-2">
                                {new Date(inv.created_at).toLocaleString()}
                            </p>
                            <p className="text-green-400 font-bold mb-1">
                                ₦{inv.amount.toLocaleString()}
                            </p>
                            <p
                                className={`text-sm font-medium ${
                                    inv.status === "completed"
                                        ? "text-green-500"
                                        : inv.status === "pending"
                                            ? "text-yellow-400"
                                            : "text-red-500"
                                }`}
                            >
                                Status: {inv.status}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
            </div>
        </div>
    );
}
