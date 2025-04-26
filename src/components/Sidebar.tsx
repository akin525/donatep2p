import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

export default function SupportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const telegramLinks = {
    channel: "https://t.me/yourchannel", // Replace with your real Telegram Channel link
    group: "https://t.me/yourgroup",     // Replace with your real Telegram Group link
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

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
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Support</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Telegram Channel Card */}
                <div className="bg-[#070D20] p-6 rounded-xl border border-gray-800 shadow hover:shadow-lg transition">
                  <h3 className="text-lg font-medium text-white mb-2">Telegram Channel</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Stay updated with the latest news and announcements!
                  </p>
                  <a
                      href={telegramLinks.channel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                  >
                    Join Channel
                  </a>
                  <button
                      onClick={() => handleCopy(telegramLinks.channel)}
                      className="flex items-center justify-center mt-3 w-full text-sm text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Channel Link
                  </button>
                </div>

                {/* Telegram Group Card */}
                <div className="bg-[#070D20] p-6 rounded-xl border border-gray-800 shadow hover:shadow-lg transition">
                  <h3 className="text-lg font-medium text-white mb-2">Telegram General Group</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Chat, ask questions, and connect with the community!
                  </p>
                  <a
                      href={telegramLinks.group}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                  >
                    Join Group
                  </a>
                  <button
                      onClick={() => handleCopy(telegramLinks.group)}
                      className="flex items-center justify-center mt-3 w-full text-sm text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Group Link
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}
