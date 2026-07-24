import Hero from "../components/Hero";
import tournaments from "../data/tournaments";
import { Link } from "react-router-dom";
import SuperscoreTournament from "../components/SuperscoreTournament";

function Home() {
  const featuredEvent = tournaments.find(
    (event) => event.id === "pickleball-tournament-season-2",
  );

  const remainingEvents = tournaments.filter(
    (event) => event.id !== "pickleball-tournament-season-2",
  );

  return (
    <>
      {" "}
      <Hero />
      {/* Featured Event */}
      <section className="py-20 bg-black">
        <div className="w-full">
          <div className="px-6 md:px-12 lg:px-20 mb-10 text-center">
            <span className="text-pink-400 uppercase tracking-[4px] font-semibold">
              Upcoming Event
            </span>

            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <h2 className="text-4xl md:text-6xl font-bold text-center">
                  {featuredEvent.title}
                </h2>
              </div>
            </div>
          </div>

          <Link to="/pickleball-tournament-season-2" className="block group">
            <div className="overflow-hidden">
              <img
                src={featuredEvent.banner}
                alt={featuredEvent.title}
                className="w-full max-h-[850px] object-contain bg-black transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          <div className="px-6 md:px-12 lg:px-20 mt-10">
            <p className="text-zinc-300 text-lg md:text-xl leading-9 max-w-4xl mx-auto text-center">
              240+ registrations including 60+ women registrations. 10 franchise
              teams competing in the biggest Pickleball Premier League season
              yet.
            </p>

            <SuperscoreTournament compact />
          </div>
        </div>
      </section>
      {/* About */}
      <section className="py-24 bg-zinc-950">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-center">
            About Avishkar Sports
          </h2>

          <p className="text-zinc-400 text-lg md:text-xl leading-9 max-w-5xl mx-auto text-center">
            Avishkar Sports is dedicated to building communities through sports.
            From Avishkar Bigbash and Destination Cup to Pickleball Leagues,
            Tennis Tournaments and Youth Development Programs, our mission is to
            create opportunities for players, sponsors and future sporting
            talent.
          </p>
        </div>
      </section>
      {/* Events */}
      <section className="bg-black py-10">
        {remainingEvents.map((event) => (
          <section key={event.id} className="mb-28">
            <Link to={`/${event.id}`} className="block group">
              <div className="overflow-hidden">
                <img
                  src={event.banner}
                  alt={event.title}
                  className="w-full max-h-[850px] object-contain bg-black transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </Link>

            <div className="px-6 md:px-12 lg:px-20 mt-10 text-center">
              <Link to={`/${event.id}`}>
                <h3 className="text-4xl md:text-6xl font-black mb-6 hover:text-pink-400 transition">
                  {event.title}
                </h3>
              </Link>

              <p className="text-zinc-400 text-lg md:text-xl leading-9 max-w-4xl mx-auto">
                {event.short}
              </p>
            </div>
          </section>
        ))}
      </section>
    </>
  );
}

export default Home;
