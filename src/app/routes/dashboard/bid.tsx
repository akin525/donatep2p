import { useState } from "react";
import { HandHeart } from "lucide-react";
import DashboardHeader from "../../../components/DashboardHeader";
import Sidebar from "../../../components/Sidebar";

export default function CreateBid() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        amount: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit bid logic
        console.log("Bid submitted:", formData);
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

                <main className="flex-1 overflow-y-auto py-10 px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto bg-[#070D20] rounded-xl p-8 border border-gray-800 shadow">
                        <div className="flex items-center mb-6">
                            <HandHeart className="w-6 h-6 text-pink-500 mr-3" />
                            <h1 className="text-2xl font-semibold text-white">Create Donation Bid</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-[#0A1128] border border-gray-700 rounded-md text-white focus:ring focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="mt-1 block w-full px-4 py-2 bg-[#0A1128] border border-gray-700 rounded-md text-white focus:ring focus:ring-pink-500 focus:border-pink-500"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Amount (USDT)</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-[#0A1128] border border-gray-700 rounded-md text-white focus:ring focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium"
                            >
                                Submit Bid
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
