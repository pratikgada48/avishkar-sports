import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const logo = "/logo/logo.png";

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-zinc-800">
      <div className="w-full px-4 lg:px-8">
        <div className="h-24 flex items-center justify-between">
          <Link to="/">
            <img
              src={logo}
              alt="Avishkar Sports"
              className="h-24 md:h-28 lg:h-32 object-contain drop-shadow-[0_0_40px_rgba(255,77,141,0.8)]"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10 font-medium">
            <Link to="/" className="hover:text-pink-400 transition">
              Home
            </Link>

            <Link to="/about" className="hover:text-pink-400 transition">
              About
            </Link>

            <Link to="/vision" className="hover:text-pink-400 transition">
              Vision
            </Link>

            <Link to="/sponsors" className="hover:text-pink-400 transition">
              Partners
            </Link>

            <Link to="/contact" className="hover:text-pink-400 transition">
              Contact
            </Link>
          </nav>

          <button
            className="lg:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-zinc-800">
          <div className="flex flex-col p-6 gap-5">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>

            <Link to="/vision" onClick={() => setIsOpen(false)}>
              Vision
            </Link>

            <Link to="/sponsors" onClick={() => setIsOpen(false)}>
              Partners
            </Link>

            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;