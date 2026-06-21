import { FaInstagram, FaYoutube, FaPhone } from "react-icons/fa";

function Contact() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">

      <div className="text-center mb-16">

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Contact Us
        </h1>

        <p className="text-zinc-400">
          We'd love to hear from you.
        </p>

      </div>

      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

        <div className="space-y-6">

          <a
            href="tel:9867777316"
            className="flex items-center gap-4 hover:text-pink-400 transition"
          >
            <FaPhone />
            <span>+91 9867777316 - Harshul Nandu</span>
          </a>

          <a
            href="https://www.instagram.com/avishkarsports/?hl=en"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 hover:text-pink-400 transition"
          >
            <FaInstagram />
            <span>Instagram - Avishkar Sports</span>
          </a>

          <a
            href="https://www.youtube.com/@avishkarsports1330"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 hover:text-pink-400 transition"
          >
            <FaYoutube />
            <span>YouTube - Avishkar Sports</span>
          </a>

        </div>

      </div>

    </section>
  );
}

export default Contact;