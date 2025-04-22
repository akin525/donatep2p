import { useState } from "react";
import { Link } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <button className="text-white hover:text-primary transition">
          <Menu size={24} />
          <span className="sr-only">Toggle menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] bg-[#050A1A] border-l border-gray-800 p-0"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-primary transition"
            >
              <X size={24} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <Link
              to="#how-it-works"
              className="text-white hover:text-primary transition py-3 px-4 text-lg border-b border-gray-800"
              onClick={() => setOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="#faqs"
              className="text-white hover:text-primary transition py-3 px-4 text-lg border-b border-gray-800"
              onClick={() => setOpen(false)}
            >
              FAQs
            </Link>
            <Link
              to="/signup"
              className="text-white hover:text-primary transition py-3 px-4 text-lg border-b border-gray-800"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-primary transition py-3 px-4 text-lg border-b border-gray-800"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/"
              className="border border-primary text-primary px-4 py-3 rounded text-center mt-4 hover:bg-primary hover:text-black transition"
              onClick={() => setOpen(false)}
            >
              HOME
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
