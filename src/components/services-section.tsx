import { Bitcoin, Wallet, BarChart3, Shield, Coins } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            TradeLink Trading offers a comprehensive suite of services to meet
            all your cryptocurrency trading needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-[#070D20] p-6 rounded-lg border border-gray-800 hover:border-primary transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Bitcoin className="text-primary h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              P2P Cryptocurrency Trading
            </h3>
            <p className="text-gray-400">
              Trade Bitcoin, Ethereum, and other cryptocurrencies directly with
              other users through our secure peer-to-peer platform.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-[#070D20] p-6 rounded-lg border border-gray-800 hover:border-primary transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Wallet className="text-primary h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Wallet Services</h3>
            <p className="text-gray-400">
              Store your digital assets safely with our state-of-the-art wallet
              technology featuring advanced encryption and multi-signature
              protection.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-[#070D20] p-6 rounded-lg border border-gray-800 hover:border-primary transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="text-primary h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Market Analysis Tools</h3>
            <p className="text-gray-400">
              Access real-time market data, price charts, and analytical tools
              to make informed trading decisions.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-[#070D20] p-6 rounded-lg border border-gray-800 hover:border-primary transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Shield className="text-primary h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Escrow Protection</h3>
            <p className="text-gray-400">
              Trade with confidence using our escrow service that protects both
              buyers and sellers throughout the transaction process.
            </p>
          </div>

          {/* Service 5 */}
          <div className="bg-[#070D20] p-6 rounded-lg border border-gray-800 hover:border-primary transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Coins className="text-primary h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Multi-Currency Support</h3>
            <p className="text-gray-400">
              Trade a wide variety of cryptocurrencies and digital assets on our
              platform with competitive rates and low fees.
            </p>
          </div>

          {/* Service 6 */}
          <div className="bg-[#070D20] p-6 rounded-lg border border-gray-800 hover:border-primary transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
                <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">24/7 Customer Support</h3>
            <p className="text-gray-400">
              Get assistance anytime with our dedicated customer support team
              available 24/7 via live chat, email, and phone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
