import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import { User, Bell, Shield, Lock } from "lucide-react";

export default function Settings() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [alertEnabled, setAlertEnabled] = useState(true);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [telegramId, setTelegramId] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    const handleSaveSettings = () => {
        console.log({
            telegramId,
            pin,
            confirmPin,
            alertEnabled,
            twoFactorEnabled,
        });
        alert("Settings saved!");
    };

    const handleUpdateTelegramId = () => {
        alert(`Telegram ID updated to: ${telegramId}`);
    };

    return (
        <div className="min-h-screen flex bg-[#050B1E] text-white">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-4xl mx-auto space-y-10">
                        <h1 className="text-3xl font-bold mb-6">Settings</h1>

                        {/* Profile Settings */}
                        <section className="bg-[#070D20] p-8 rounded-2xl border border-gray-800 shadow space-y-6">
                            <div className="flex items-center gap-3">
                                <User className="text-blue-400" />
                                <h2 className="text-2xl font-semibold">Telegram ID</h2>
                            </div>

                            {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-6">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        placeholder="Full Name"*/}
                            {/*        className="p-4 bg-[#0A1128] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                            {/*    />*/}
                            {/*    <input*/}
                            {/*        type="email"*/}
                            {/*        placeholder="Email Address"*/}
                            {/*        className="p-4 bg-[#0A1128] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <div className="flex gap-4 items-center mt-6">
                                <input
                                    type="text"
                                    placeholder="Telegram ID"
                                    value={telegramId}
                                    onChange={(e) => setTelegramId(e.target.value)}
                                    className="flex-1 p-4 bg-[#0A1128] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleUpdateTelegramId}
                                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
                                >
                                    Update
                                </button>
                            </div>
                        </section>

                        {/* Notification Settings */}
                        <section className="bg-[#070D20] p-8 rounded-2xl border border-gray-800 shadow space-y-6">
                            <div className="flex items-center gap-3">
                                <Bell className="text-yellow-400" />
                                <h2 className="text-2xl font-semibold">Notification Settings</h2>
                            </div>

                            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">
                  Alert me when a peer is available
                </span>
                                <button
                                    onClick={() => setAlertEnabled(!alertEnabled)}
                                    className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
                                        alertEnabled ? "bg-green-500" : "bg-gray-600"
                                    }`}
                                >
                                    <div
                                        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                                            alertEnabled ? "translate-x-7" : ""
                                        }`}
                                    ></div>
                                </button>
                            </div>
                        </section>

                        {/* Security Settings */}
                        <section className="bg-[#070D20] p-8 rounded-2xl border border-gray-800 shadow space-y-6">
                            <div className="flex items-center gap-3">
                                <Shield className="text-red-400" />
                                <h2 className="text-2xl font-semibold">Security</h2>
                            </div>

                            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">
                  Enable Two-Factor Authentication
                </span>
                                <button
                                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                    className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
                                        twoFactorEnabled ? "bg-green-500" : "bg-gray-600"
                                    }`}
                                >
                                    <div
                                        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                                            twoFactorEnabled ? "translate-x-7" : ""
                                        }`}
                                    ></div>
                                </button>
                            </div>

                            {twoFactorEnabled && (
                                <div className="mt-6">
                                    <label className="block text-sm mb-2 text-gray-400">
                                        Enter PIN
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your PIN"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        className="p-4 bg-[#0A1128] border border-gray-700 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            )}
                        </section>

                        {/* PIN Setup */}
                        <section className="bg-[#070D20] p-8 rounded-2xl border border-gray-800 shadow space-y-6">
                            <div className="flex items-center gap-3">
                                <Lock className="text-purple-400" />
                                <h2 className="text-2xl font-semibold">PIN Setup</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="password"
                                    placeholder="Enter New PIN"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="p-4 bg-[#0A1128] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm New PIN"
                                    value={confirmPin}
                                    onChange={(e) => setConfirmPin(e.target.value)}
                                    className="p-4 bg-[#0A1128] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </section>

                        {/* Save Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleSaveSettings}
                                className="mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-xl transition shadow-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
