import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { X, ArrowDown, Wallet2 } from 'lucide-react';
import Sidebar from "@/components/Sidebar.tsx";
import DashboardHeader from "@/components/DashboardHeader.tsx";
import { getAuthToken } from "@/utils/auth.tsx";
import { useUser } from "@/context/UserContext.tsx";

interface Transaction {
    id: string;
    trx_type: string;
    created_at: string;
    status: 'success' | 'pending' | 'failed';
    amount: string;
    bal_before: string;
    bal_after: string;
    wallet: string;
    trx: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

const WalletPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    const summary = [
        { label: 'Total Balance', value: user?.balance, icon: <Wallet2 className="w-8 h-8 text-blue-400" /> },
        { label: 'Total Earning', value: user?.earning, icon: <ArrowDown className="w-8 h-8 text-green-400" /> },
    ];

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await fetch(`${baseUrl}transactions`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const result = await res.json();
                if (result.success && result.data && result.data.data) {
                    setTransactions(result.data.data);
                }
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
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <h1 className="text-3xl font-bold">Wallet Overview</h1>
                        <div className="flex gap-3">
                            <Link to="/ask" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Ask</Link>
                            <Link to="/bid" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Bids</Link>
                            <Link to="/history" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium">History</Link>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {summary.map((item, index) => (
                            <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-400 text-sm">{item.label}</p>
                                        <h2 className="text-2xl font-semibold">{item.value} USDT</h2>
                                    </div>
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Transactions Table */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
                        <div className="overflow-x-auto bg-[#111827] rounded-xl p-4 border border-gray-800">
                            {loading ? (
                                <p className="text-center text-gray-400">Loading...</p>
                            ) : (
                                <table className="w-full text-left text-sm">
                                    <thead>
                                    <tr className="text-gray-400 border-b border-gray-700">
                                        <th className="py-3">Type</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.map((txn) => (
                                        <tr
                                            key={txn.id}
                                            className="border-b border-gray-800 hover:bg-white/5 cursor-pointer"
                                            onClick={() => setSelectedTransaction(txn)}
                                        >
                                            <td className="py-3">{txn.trx_type}</td>
                                            <td>{new Date(txn.created_at).toLocaleDateString()}</td>
                                            <td className={
                                                txn.status === 'success'
                                                    ? 'text-green-400'
                                                    : txn.status === 'pending'
                                                        ? 'text-yellow-400'
                                                        : 'text-red-400'
                                            }>
                                                {txn.status}
                                            </td>
                                            <td>{parseFloat(txn.amount).toFixed(2)} USDT</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* Slide-In Drawer */}
                    {selectedTransaction && (
                        <div className="fixed inset-0 flex justify-end z-50 bg-black bg-opacity-50">
                            <div className="bg-[#1E293B] w-full max-w-md h-full shadow-xl p-6 overflow-y-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold">Transaction Details</h2>
                                    <button onClick={() => setSelectedTransaction(null)}>
                                        <X className="w-6 h-6 text-gray-400 hover:text-white" />
                                    </button>
                                </div>
                                <div className="space-y-3 text-sm text-gray-300">
                                    <p><strong>Type:</strong> {selectedTransaction.trx_type}</p>
                                    <p><strong>Status:</strong> {selectedTransaction.status}</p>
                                    <p><strong>Amount:</strong> {parseFloat(selectedTransaction.amount).toFixed(2)} USDT</p>
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
            </div>
        </div>
    );
};

export default WalletPage;
