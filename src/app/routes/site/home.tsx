import { Link } from "react-router";
import MobileMenu from "@/components/mobile-menu";
import FAQSection from "@/components/faq-section";
import ServicesSection from "@/components/services-section";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <>
      <div className="h-20">
        <header className="flex items-center  justify-center px-5 h-20 fixed top-0 z-50 backdrop-blur-sm w-full">
          <div className="flex items-center justify-between container h-full mx-auto">
            <div className="flex items-center">
              <p className="font-bold text-3xl">tradelink</p>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/login" className=" transition">
                <Button variant="outline">Sign In</Button>
              </Link>

              <Link
                to="/register"
                className="text-white hover:text-primary transition"
              >
                <Button>Register</Button>
              </Link>
            </nav>
            <MobileMenu />
          </div>
        </header>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center lg:min-h-screen">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="flex items-center mb-4">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="text-white font-bold">!</span>
            </div>
            <span className="text-primary uppercase font-medium">
              WHAT IS TradeLink
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Trade All Assets Through Peer-To-Peer (P2P) Easier Than Ever
          </h1>

          <p className="text-muted-foreground mb-8 max-w-lg">
            TradeLink (TL) is a peer-to-peer digital asset trading and exchange
            platform that seizes all opportunities in the crypto world by acting
            as an intermediary between a seller of a digital asset (coin or
            token) and his corresponding buyer.
          </p>

          <Link to="/dashboard">
            <Button size={"lg"}>
              BID NOW
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>

        <div className="md:w-1/2 relative">
          <img
            src="/hero-image.png"
            alt="Cryptocurrency trading illustration"
            width={600}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* P2P Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src="/p2p-image.png"
              alt="P2P Trading illustration"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>

          <div className="md:w-1/2 md:pl-12">
            <div className="mb-4">
              <span className="text-primary uppercase font-medium">
                P2P DECENTRALISED
              </span>
              <div className="w-24 h-1 bg-primary mt-2"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Trade New Assets Via A Decentralized Platform
            </h2>

            <p className="text-gray-400 mb-8">
              Our platform enables secure, transparent, and efficient
              peer-to-peer trading of digital assets without the need for
              intermediaries, giving you complete control over your
              transactions.
            </p>

            <Link
              to="#learn-more"
              className="text-primary inline-flex items-center hover:underline"
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
