import { useState } from 'react';
import { events } from '../data/events';

export const EventGrid = () => {
  const [filter, setFilter] = useState('All');

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter((e) => e.type === filter);

  const categories = ['All', 'Leather Ball', 'Turf', 'Pickleball', 'Football'];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full transition-all border ${
              filter === cat 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all">
            <div className="text-blue-500 text-sm font-semibold mb-2 uppercase">{event.type}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{event.description}</p>
            <div className="text-slate-500 text-xs font-mono">{event.venue} • {event.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};