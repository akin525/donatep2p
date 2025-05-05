import { useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar.tsx";
import DashboardHeader from "@/components/DashboardHeader.tsx";
import { useUser } from "@/context/UserContext.tsx";
import axios from 'axios';
import { getAuthToken } from "@/utils/auth.tsx";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

type Referral = {
    username: string;
    email: string;
};

export default function ReferralPage() {
    const [copied, setCopied] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [referralHistory, setReferralHistory] = useState<Referral[]>([]);
    const { user } = useUser() as any;

    const siteOrigin = typeof window !== "undefined" ? window.location.origin : "";
    const referralCode = user?.ref_code || "N/A";
    const referralLink = user?.ref_code ? `${siteOrigin}/register?ref=${user.ref_code}` : "";

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const token = getAuthToken();
                const response = await axios.get(`${apiBaseUrl}referrals`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data?.success) {
                    setReferralHistory(response.data.data.data || []);
                } else {
                    setReferralHistory([]);
                }
            } catch (error) {
                console.error("Failed to fetch referral history:", error);
            }
        };

        fetchReferrals();
    }, []);

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

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-2xl mx-auto space-y-10">
                        {/* Referral Details */}
                        <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
                            <h1 className="text-3xl font-bold mb-6 text-center">🎉 Refer & Earn</h1>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2">Your Referral Code</label>
                                <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                                    <span className="flex-1">{referralCode}</span>
                                    <button
                                        onClick={() => copyToClipboard(referralCode)}
                                        className="ml-4 bg-blue-600 hover:bg-blue-700 transition px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {copied ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2">Your Referral Link</label>
                                <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                                    <span className="flex-1 text-xs break-all">{referralLink}</span>
                                    <button
                                        onClick={() => copyToClipboard(referralLink)}
                                        className="ml-4 bg-green-600 hover:bg-green-700 transition px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {copied ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                            </div>

                            <p className="text-center text-sm text-gray-400">
                                Share this link with your friends and earn rewards when they register!
                            </p>
                        </div>

                        {/* Referral History */}
                        <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold mb-4">📜 Referral History</h2>
                            {referralHistory.length === 0 ? (
                                <p className="text-gray-400 text-sm">No referrals yet.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {referralHistory.map((ref, index) => (
                                        <li
                                            key={index}
                                            className="bg-gray-700 p-4 rounded-xl flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-medium">{ref.username || 'Unnamed User'}</p>
                                                <p className="text-xs text-gray-400">{ref.email}</p>
                                            </div>
                                            <span className="text-sm text-green-400">✓</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
