import { CheckCircle } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    "Secure P2P Trading",
    "Low Transaction Fees",
    "Multi-Currency Support",
    "Advanced Encryption",
    "Real-time Market Data",
    "Mobile Trading App",
    "Escrow Protection",
    "24/7 Customer Support",
    "Fast Transaction Processing",
    "Two-Factor Authentication",
    "User-Friendly Interface",
    "Global Accessibility",
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-[#070D20]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="mb-4">
              <span className="text-primary uppercase font-medium">
                PLATFORM FEATURES
              </span>
              <div className="w-24 h-1 bg-primary mt-2"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Why Choose TradeLink Trading Platform
            </h2>

            <p className="text-gray-400 mb-8">
              Our platform is designed with security, efficiency, and user
              experience in mind. We provide the tools and features you need to
              trade cryptocurrencies with confidence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-primary/20 blur-xl"></div>
              <div className="relative bg-[#0A1128] p-6 rounded-xl border border-primary/30">
                <img
                  src="/features-image.png"
                  alt="Platform Features"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
