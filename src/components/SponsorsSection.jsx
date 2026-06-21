function SponsorsSection({ sponsors = [] }) {
  if (!sponsors?.length) return null;

  return (
    <section className="py-20 bg-black">
      <div className="w-[95%] mx-auto">

        <h2 className="text-center text-4xl md:text-6xl font-bold mb-14">
          Sponsors & Partners
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {sponsors.map((sponsor) => (
            <div
              key={sponsor}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center hover:border-pink-500 hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-bold text-xl">
                {sponsor}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default SponsorsSection;