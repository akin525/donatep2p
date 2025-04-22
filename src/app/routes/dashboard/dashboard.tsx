import { useState } from "react";

import {
  ChevronDown,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Settings,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Link } from "react-router";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen text-white flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform  transition-transform border-r duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <Link to="/" className="flex items-center">
            <p className="font-bold text-3xl">tradelink</p>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-3 py-4">
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-[#0A1128] text-white"
            >
              <LayoutDashboard className="mr-3 h-5 w-5 text-primary" />
              Dashboard
            </Link>
            <Link
              to="/dashboard/wallet"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-[#0A1128] hover:text-white"
            >
              <Wallet className="mr-3 h-5 w-5 text-gray-400" />
              Wallet
            </Link>
            <Link
              to="/dashboard/transactions"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-[#0A1128] hover:text-white"
            >
              <CreditCard className="mr-3 h-5 w-5 text-gray-400" />
              Transactions
            </Link>
            <Link
              to="/dashboard/market"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-[#0A1128] hover:text-white"
            >
              <PieChart className="mr-3 h-5 w-5 text-gray-400" />
              Market
            </Link>
            <Link
              to="/dashboard/p2p"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-[#0A1128] hover:text-white"
            >
              <Users className="mr-3 h-5 w-5 text-gray-400" />
              P2P Trading
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Account
            </h3>
            <div className="mt-2 space-y-1">
              <Link
                to="/dashboard/profile"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-[#0A1128] hover:text-white"
              >
                <User className="mr-3 h-5 w-5 text-gray-400" />
                Profile
              </Link>
              <Link
                to="/dashboard/settings"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-[#0A1128] hover:text-white"
              >
                <Settings className="mr-3 h-5 w-5 text-gray-400" />
                Settings
              </Link>
              <Link
                to="/dashboard/support"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-[#0A1128] hover:text-white"
              >
                <MessageSquare className="mr-3 h-5 w-5 text-gray-400" />
                Support
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
          <Link
            to="/login"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-[#0A1128] hover:text-white"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className=" border-b border-gray-800">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end h-16">
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>

              {/* <div className="flex-1 flex justify-center lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5" />
                    </div>
                    <input
                      id="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-[#0A1128] placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary focus:ring-0 sm:text-sm"
                      placeholder="Search transactions, wallets..."
                      type="search"
                    />
                  </div>
                </div>
              </div> */}

              <div className="flex items-center">
                {/* Notifications dropdown */}

                {/* Profile dropdown */}
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center max-w-xs text-sm rounded-full focus:outline-none"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                        x
                      </div>
                      <span className="ml-2 text-sm font-medium hidden sm:block">
                        John Doe
                      </span>
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-400 hidden sm:block" />
                    </button>
                  </div>

                  {userMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#0A1128] ring-1 ring-black ring-opacity-5 z-50">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link
                          to="/dashboard/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#070D20] hover:text-white"
                          role="menuitem"
                        >
                          Your Profile
                        </Link>
                        <Link
                          to="/dashboard/settings"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#070D20] hover:text-white"
                          role="menuitem"
                        >
                          Settings
                        </Link>
                        <Link
                          to="/dashboard/support"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#070D20] hover:text-white"
                          role="menuitem"
                        >
                          Support
                        </Link>
                        <div className="border-t border-gray-800"></div>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#070D20] hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto ">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Balance cards */}
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-[#070D20] overflow-hidden rounded-lg border border-gray-800 hover:border-primary/50 transition-colors">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-400 truncate">
                            Total Balance
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold">
                              $24,563.65
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0A1128] px-5 py-3">
                    <div className="text-sm">
                      <Link
                        to="/dashboard/wallet"
                        className="font-medium text-primary hover:text-yellow-500"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-[#070D20] overflow-hidden rounded-lg border border-gray-800 hover:border-primary/50 transition-colors">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                        <svg
                          className="h-6 w-6 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 9.354C14.4626 8.7447 13.7523 8.31351 12.9638 8.11779C12.1753 7.92208 11.3473 7.97142 10.5857 8.26C9.82411 8.54858 9.16548 9.06574 8.69672 9.74319C8.22796 10.4206 7.97121 11.2255 7.96 12.05C7.96 14.45 11.26 15.65 11.26 15.65"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5 19H11.51"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-400 truncate">
                            Bitcoin (BTC)
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold">
                              0.45 BTC
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0A1128] px-5 py-3">
                    <div className="text-sm">
                      <Link
                        to="/dashboard/wallet/btc"
                        className="font-medium text-primary hover:text-yellow-500"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-[#070D20] overflow-hidden rounded-lg border border-gray-800 hover:border-primary/50 transition-colors">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                        <svg
                          className="h-6 w-6 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.5 12H16.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 7.5V16.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-400 truncate">
                            Ethereum (ETH)
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold">
                              3.25 ETH
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0A1128] px-5 py-3">
                    <div className="text-sm">
                      <Link
                        to="/dashboard/wallet/eth"
                        className="font-medium text-primary hover:text-yellow-500"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-[#070D20] overflow-hidden rounded-lg border border-gray-800 hover:border-primary/50 transition-colors">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                        <svg
                          className="h-6 w-6 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 13.5C8 13.5 9.5 15.5 12 15.5C14.5 15.5 16 13.5 16 13.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.5 9H8.51"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5 9H15.51"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-400 truncate">
                            USDT
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold">
                              5,230.75 USDT
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0A1128] px-5 py-3">
                    <div className="text-sm">
                      <Link
                        to="/dashboard/wallet/usdt"
                        className="font-medium text-primary hover:text-yellow-500"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
