import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import {
    ArrowDownRight,
    ArrowUpRight,
    ClipboardList,
    DollarSign,
    X,
} from "lucide-react";
import { useUser } from "@/context/UserContext.tsx";
import { getAuthToken } from "@/utils/auth.tsx";
import { Link } from "react-router";

interface Transaction {
    id: string;
    trx_type: string;
    status: string;
    amount: number;
    bal_before: number;
    bal_after: number;
    trx: string;
    type: string;
    wallet: string;
    created_at: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

export default function Wallet() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useUser();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${baseUrl}transactions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch transactions");

                const result = await response.json();
                const transactionData = (result?.data?.data || []).map((txn: any): Transaction => ({
                    id: txn.id,
                    trx_type: txn.trx_type || txn.type || "N/A",
                    status: txn.status,
                    amount: parseFloat(txn.amount),
                    bal_before: parseFloat(txn.bal_before),
                    bal_after: parseFloat(txn.bal_after),
                    trx: txn.trx,
                    type: txn.type,
                    wallet: txn.wallet,
                    created_at: txn.created_at,
                }));

                setTransactions(transactionData);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="min-h-screen text-white flex bg-gradient-to-br from-[#0A0F1E] to-[#1E293B]">
            {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-10">My Wallet</h1>

                    {/* Wallet Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            {
                                label: "USDT Balance",
                                value: user?.balance?.toLocaleString() ?? "0.00",
                                icon: <DollarSign className="w-8 h-8 text-blue-400" />,
                            },
                            {
                                label: "Total Earnings",
                                value: user?.earning?.toLocaleString() ?? "0.00",
                                icon: <ArrowUpRight className="w-8 h-8 text-green-400" />,
                            },
                            {
                                label: "Total Transactions",
                                value: transactions.length.toString(),
                                icon: <ClipboardList className="w-8 h-8 text-yellow-400" />,
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[#1F2937] p-6 rounded-2xl shadow-xl border border-gray-700 flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">{item.label}</p>
                                    <h2 className="text-3xl font-semibold">{item.value} USDT</h2>
                                </div>
                                {item.icon}
                            </div>
                        ))}
                    </div>

                    {/* Wallet Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        {[
                            { label: "Ask", icon: <ArrowUpRight className="w-5 h-5" />, to: "/ask" },
                            { label: "Bids", icon: <ArrowDownRight className="w-5 h-5" />, to: "/bid" },
                            { label: "Transaction History", icon: <ClipboardList className="w-5 h-5" />, to: "/wallet/transactions" },
                        ].map((action) => (
                            <Link key={action.label} to={action.to} className="flex items-center justify-between p-5 rounded-2xl bg-primary/10 border border-primary text-white hover:bg-primary/20 transition">
                                <span className="font-medium text-lg">{action.label}</span>
                                {action.icon}
                            </Link>
                        ))}
                    </div>

                    {/* Transactions */}
                    <div className="bg-[#0F172A] p-6 rounded-2xl border border-gray-800 shadow-lg">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-2xl font-semibold">Recent Transactions</h3>
                            {transactions.length > 5 && (
                                <Link to="/wallet/transactions" className="text-sm text-blue-400 hover:underline">View All</Link>
                            )}
                        </div>
                        <ul className="divide-y divide-gray-800 text-sm text-gray-300">
                            {loading ? (
                                <li className="py-4 text-center text-gray-400">Loading...</li>
                            ) : transactions.length > 0 ? (
                                transactions.slice(0, 5).map((txn) => (
                                    <li key={txn.id} onClick={() => setSelectedTransaction(txn)} className="py-4 cursor-pointer hover:bg-white/5 px-3 rounded-md transition">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-white font-medium">{txn.trx_type}</p>
                                                <p className="text-gray-500 text-xs">{new Date(txn.created_at).toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={txn.status === "Completed" ? "text-green-400" : txn.status === "Pending" ? "text-yellow-300" : "text-red-400"}>{txn.status}</p>
                                                <p className="text-white font-semibold">{txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT</p>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="py-4 text-center text-gray-500">No recent transactions</li>
                            )}
                        </ul>
                    </div>
                </main>
            </div>

            {/* Transaction Modal */}
            {selectedTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-[#1E293B] w-full max-w-lg p-6 rounded-2xl relative text-white shadow-2xl">
                        <button onClick={() => setSelectedTransaction(null)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p><strong>Type:</strong> {selectedTransaction.trx_type}</p>
                            <p><strong>Status:</strong> {selectedTransaction.status}</p>
                            <p><strong>Amount:</strong> {selectedTransaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT</p>
                            <p><strong>Balance Before:</strong> {selectedTransaction.bal_before}</p>
                            <p><strong>Balance After:</strong> {selectedTransaction.bal_after}</p>
                            <p><strong>Wallet:</strong> {selectedTransaction.wallet}</p>
                            <p><strong>TRX ID:</strong> {selectedTransaction.trx}</p>
                            <p><strong>Date:</strong> {new Date(selectedTransaction.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
