import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <Link to={`/${event.id}`}>

      <div className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-[1.02] duration-300">

        <div className="h-60 bg-zinc-800 flex items-center justify-center">
          <span className="text-zinc-500">
            Banner Image
          </span>
        </div>

        <div className="p-5">

          <h3 className="text-xl font-bold mb-3">
            {event.title}
          </h3>

          <p className="text-zinc-400">
            {event.short}
          </p>

        </div>
      </div>
    </Link>
  );
}

export default EventCard;