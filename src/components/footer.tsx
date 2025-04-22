import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#030712] pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="TL Logo"
                width={100}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              TradeLink Trading is a peer-to-peer digital asset trading and
              exchange platform that connects buyers and sellers worldwide.
            </p>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-gray-400 hover:text-primary transition"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-primary transition"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-primary transition"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-primary transition"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-primary transition"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#how-it-works"
                  className="text-gray-400 hover:text-primary transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="#services"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#features"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#faqs"
                  className="text-gray-400 hover:text-primary transition"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Risk Disclosure
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-primary transition"
                >
                  AML Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive updates and news about our
              platform.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-[#0A1128] border border-gray-700 rounded focus:outline-none focus:border-primary text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-black px-4 py-2 rounded font-medium hover:bg-yellow-500 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TradeLink Trading. All rights
              reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-gray-400 hover:text-primary transition text-sm"
              >
                Support
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-primary transition text-sm"
              >
                Security
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-primary transition text-sm"
              >
                Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
