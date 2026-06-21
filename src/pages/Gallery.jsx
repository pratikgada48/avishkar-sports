import { useParams } from 'react-router-dom';
import { tournaments } from '../data';

export default function TournamentDetail() {
  const { id } = useParams();
  const t = tournaments.find(x => x.id === id);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-6">{t.title}</h1>
      <img src={t.heroImage} className="w-full h-96 object-cover rounded-xl mb-10" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Event Details</h2>
          <p className="text-gray-300 text-lg">{t.desc}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Teams</h2>
          <div className="bg-gray-900 p-6 rounded-lg">
            {t.teams.map((team, i) => (
              <div key={i} className="py-2 border-b border-gray-800">
                <span className="font-bold">{team.name}</span> - <span className="text-gray-400">{team.owner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6">Gallery</h2>
      <div className="grid grid-cols-3 gap-4">
        {t.gallery.map((img, i) => (
          <img key={i} src={img} className="rounded-lg h-64 w-full object-cover" />
        ))}
      </div>
    </div>
  );
}