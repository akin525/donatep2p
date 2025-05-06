import {  useState } from "react";
import { getAuthToken } from "@/utils/auth";
import { useUser } from "@/context/UserContext.tsx";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

const generateAmountOptions = () => Array.from({ length: 15 }, (_, i) => (i + 1) * 10);

export default function AskPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [amount, setAmount] = useState(10);
  const [balSource, setBalSource] = useState("balance");
  const [loading, setLoading] = useState(false);
  const [askSuccess, setAskSuccess] = useState(false);
  const { user } = useUser();
  const [bepAddress, setBepAddress] = useState("");

  const handleAskRequest = async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const isValidTime =
        (currentHour === 9 || currentHour === 21) && currentMinutes <= 30;

    if (!isValidTime) {
      toast.error("Ask requests are allowed only between 9:00–9:30 AM and 9:00–9:30 PM.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bal_source: balSource,
          bep_address: bepAddress,
          amount,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAskSuccess(true);
        toast.success("Ask request successfully created!");
      } else {
        toast.error(data.message || "Failed to create ask request.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while processing the request.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (user?.bep_address) {
  //     setBepAddress(user.bep_address);
  //   }
  // }, [user]);

  const amountOptions = generateAmountOptions();

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

          <main className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-3xl mx-auto bg-[#0A1128] p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-6">Create Ask Request</h2>

              {/* Wallet Source */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { type: "balance", label: "Balance", value: user?.balance },
                  { type: "earning", label: "Earnings", value: user?.earning },
                ].map(({ type, label, value }) => (
                    <div
                        key={type}
                        onClick={() => setBalSource(type)}
                        className={`rounded-xl p-5 cursor-pointer border border-gray-700 transition-all ${
                            balSource === type
                                ? "bg-blue-900 ring-2 ring-blue-500"
                                : "bg-[#1A2433]"
                        }`}
                    >
                      <p className="text-gray-400">{label}</p>
                      <p className="text-2xl font-bold mt-2">{value} USDT</p>
                    </div>
                ))}
              </div>

              {/* Amount Selector */}
              <div className="mb-6">
                <label className="text-sm text-gray-300 mb-2 block">
                  Select Amount (or enter manually)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                  {amountOptions.map((amt) => (
                      <button
                          key={amt}
                          onClick={() => setAmount(amt)}
                          className={`py-2 rounded-lg text-sm font-medium border text-center transition ${
                              amount === amt
                                  ? "bg-blue-600 text-white border-blue-500"
                                  : "bg-[#1A2433] text-gray-300 border-gray-700 hover:bg-[#2A3444]"
                          }`}
                      >
                        {amt} USDT
                      </button>
                  ))}
                </div>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Or enter a custom amount"
                    className="w-full p-3 rounded-lg bg-[#0F172A] border border-gray-700 text-white"
                />
              </div>

              {/* BEP Address */}
              <div className="mb-6">
                <label className="text-sm text-gray-300 mb-2 block">BEP Address</label>
                <div className="flex gap-2">
                  <input
                      type="text"
                      value={bepAddress}
                      onChange={(e) => setBepAddress(e.target.value)}
                      placeholder="Enter BEP address"
                      className="flex-1 p-3 rounded-lg bg-[#0F172A] border border-gray-700 text-white"
                  />
                  <Button
                      type="button"
                      onClick={() => {
                        if (user?.bep_address) {
                          setBepAddress(user.bep_address);
                          toast.success("BEP address auto-filled.");
                        } else {
                          toast.warn("No BEP address found in your profile.");
                        }
                      }}
                  >
                    Auto Fill
                  </Button>
                </div>
              </div>

              {/* Time Notice */}
              <div className="text-center text-yellow-400 text-sm mb-6">
                Ask requests are only allowed between 9:00–9:30 AM and 9:00–9:30 PM.
              </div>

              {/* Submit Button */}
              <Button
                  onClick={handleAskRequest}
                  disabled={loading}
                  className="w-full py-3 text-lg font-semibold"
              >
                {loading ? "Processing..." : "Submit Ask Request"}
              </Button>

              {askSuccess && (
                  <p className="text-green-500 mt-4 text-center font-medium">
                    Your ask request has been created successfully!
                  </p>
              )}
            </div>
          </main>
        </div>
      </div>
  );
}
