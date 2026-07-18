import { useParams, Link } from "react-router-dom";
import tournaments from "../data/tournaments";

import SponsorsSection from "../components/SponsorsSection";
import TeamOwnersSection from "../components/TeamOwnersSection";
import GallerySection from "../components/GallerySection";
import galleryData from "../data/galleryData";
import SuperscoreTournament from "../components/SuperscoreTournament";

function TournamentDetail() {
  const { id } = useParams();

  const tournament = tournaments.find((item) => item.id === id);

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Tournament Not Found
      </div>
    );
  }

  let galleryImages = [];

  if (tournament.id === "bigbash") {
    galleryImages = galleryData.bigbash;
  }

  if (tournament.id === "destination-cup") {
    galleryImages = galleryData.destinationCup;
  }

  if (tournament.id === "pickleball-one-day-tournament") {
    galleryImages = galleryData.pickleball;
  }

  if (tournament.id === "pickleball-league-season-1") {
    galleryImages = galleryData.pickleballLeagueSeason1;
  }

  return (
    <>
      {/* Banner */}

      <section>
        <img
          src={tournament.banner}
          alt={tournament.title}
          className="w-full max-h-[850px] object-contain bg-black"
        />
      </section>

      {/* Content */}

      <section className="py-20">
        <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            {tournament.title}
          </h1>

          <p className="text-zinc-300 text-lg leading-9">
            {tournament.description}
          </p>
        </div>
      </section>

      {/* Stats */}

      {tournament.stats && (
        <section className="pb-20">
          <div className="px-6 md:px-12 lg:px-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tournament.stats.map((stat) => (
                <div
                  key={stat}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center"
                >
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tournament.id === "pickleball-tournament-season-2" && (
        <SuperscoreTournament />
      )}

      {/* Team Owners */}

      {tournament.hasTeamOwners && <TeamOwnersSection />}

      {/* Sponsors */}

      <SponsorsSection sponsors={tournament.sponsors} />

      {/* Gallery */}

      <GallerySection images={galleryImages} />

      {/* Back */}

      <section className="pb-20 text-center">
        <Link
          to="/"
          className="inline-flex px-8 py-4 rounded-xl border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition-all"
        >
          Back To Home
        </Link>
      </section>
    </>
  );
}

export default TournamentDetail;
