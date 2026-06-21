import teamOwners from "../data/teamOwnersData";

function TeamOwnersSection() {
  return (
    <section className="py-20">
      <div className="w-[95%] mx-auto">
        <h2 className="text-center text-4xl md:text-6xl font-bold mb-16">
          Franchise Teams
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamOwners.map((team) => (
            <div
              key={team.id}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-pink-500 transition-all duration-300"
            >
              <img
                src={team.image}
                alt={team.teamName}
                className="w-full h-[500px] object-contain bg-zinc-950 p-4"
              />

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{team.teamName}</h3>

                <p className="text-pink-400 font-semibold">{team.ownerName}</p>

                <p className="text-zinc-400 mt-2">{team.village}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamOwnersSection;
