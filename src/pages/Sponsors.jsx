function Sponsors() {
  const sponsors = [
    "Team Vagad",
    "SCS",
    "Cloud9",
    "Associate Partner Level 7",
    "Max Protein",
    "Pulse8",
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Sponsors & Partners
        </h1>

        <p className="text-zinc-400 max-w-3xl mx-auto">
          We are proud to collaborate with brands and organizations that share
          our passion for sports, community development, and creating memorable
          sporting experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {sponsors.map((sponsor) => (
          <div
            key={sponsor}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center hover:border-pink-500 transition"
          >
            <h3 className="text-xl font-semibold">
              {sponsor}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Sponsors;