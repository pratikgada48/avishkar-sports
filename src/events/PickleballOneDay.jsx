import { Link } from 'react-router-dom';
import { tournaments } from '../data';

export default function Home() {
  return (
    <div className="bg-black min-h-screen p-10">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-4">Our Tournaments</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tournaments.map(t => (
          <Link to={`/tournament/${t.id}`} key={t.id} className="group border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500 transition">
            <img src={t.heroImage} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-white group-hover:text-pink-500">{t.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}