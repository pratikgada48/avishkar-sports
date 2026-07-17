import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

function Footer() {
  const logo = "/logo/logo.png";
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo Section */}

          <div>
            <img
              src={logo}
              alt="Avishkar Sports"
              className="h-20 object-contain mb-4 drop-shadow-[0_0_35px_rgba(255,77,141,0.95)] transition-all duration-300 hover:scale-105"
            />

            <p className="text-zinc-400">
              Building Communities Through Sports.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h4 className="font-semibold mb-4 text-pink-400">Quick Links</h4>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                About
              </Link>

              <Link
                to="/vision"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                Vision
              </Link>

              <Link
                to="/contact"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Events */}

          <div>
            <h4 className="font-semibold mb-4 text-pink-400">Events</h4>

            <div className="flex flex-col gap-3">
              <Link
                to="/pickleball-tournament-season-2"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                Pickleball Tournament
              </Link>

              <Link
                to="/pickleball-league-season-1"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                Pickleball League
              </Link>

              <Link
                to="/destination-cup"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                Destination Cup
              </Link>

              <Link
                to="/bigbash"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                Avishkar Bigbash
              </Link>
            </div>
          </div>

          {/* Social */}

          <div>
            <h4 className="font-semibold mb-4 text-pink-400">Follow Us</h4>

            <div className="flex gap-5 text-2xl">
              <a
                href="#"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:scale-125 cursor-pointer"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:scale-125 cursor-pointer"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                className="text-zinc-400 hover:text-pink-500 transition-all duration-300 hover:scale-125 cursor-pointer"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-800 text-center text-zinc-500">
          © {new Date().getFullYear()} Avishkar Sports. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
