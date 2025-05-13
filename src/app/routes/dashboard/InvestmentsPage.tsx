import { useEffect, useState } from "react";
import { getAuthToken } from "@/utils/auth.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import DashboardHeader from "@/components/DashboardHeader.tsx";
import {useNavigate} from "react-router";

interface Investment {
    id: number;
    amount: number;
    expected_profit: number;
    expected_return: number;
    return_date: string;
    reference: string;
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
    const navigate = useNavigate();

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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-500";
            case "running":
                return "text-yellow-400";
            default:
                return "text-red-500";
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-[#0A0F1E] to-[#1E293B] text-white">
            {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="p-6">
                    <h1 className="text-3xl font-bold text-center mb-6">Energy Node</h1>

                    {loading ? (
                        <p className="text-center text-gray-400">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-400">Error: {error}</p>
                    ) : investments.length === 0 ? (
                        <p className="text-center text-gray-500">No investments found.</p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {investments.map((inv) => (
                                <div
                                    key={inv.id}
                                    onClick={() => navigate(`/investments/${inv.id}`)}
                                    className="cursor-pointer bg-[#1F2937] border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-2xl transition"
                                >
                                    <div className="mb-3">
                                        <p className="text-sm text-gray-400">Reference:</p>
                                        <p className="font-semibold">{inv.reference}</p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-gray-400">Created:</p>
                                        <p>{new Date(inv.created_at).toLocaleString()}</p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-gray-400">Return Date:</p>
                                        <p>{new Date(inv.return_date).toLocaleString()}</p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-gray-400">Invested Amount:</p>
                                        <p className="text-blue-400 font-bold">{Number(inv.amount).toLocaleString()} USDT</p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-gray-400">Expected Profit:</p>
                                        <p className="text-green-400 font-bold">+{Number(inv.expected_profit).toLocaleString()} USDT</p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-gray-400">Expected Return:</p>
                                        <p className="text-purple-400 font-bold">{Number(inv.expected_return).toLocaleString()} USDT</p>
                                    </div>

                                    <div className="mt-2">
                                        <p className={`text-sm font-semibold ${getStatusColor(inv.status)}`}>
                                            Status: {inv.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
