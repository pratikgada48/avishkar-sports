import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Vision from "./pages/Vision";
import Sponsors from "./pages/Sponsors";
import Contact from "./pages/Contact";

import TournamentDetail from "./pages/TournamentDetail";

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/:id" element={<TournamentDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
