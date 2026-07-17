import heroBanner from "/banners/hero.jpeg";

function Hero() {
  return (
    <section className="relative h-[65vh] md:h-[85vh] lg:h-screen w-full overflow-hidden">
      <img
        src={heroBanner}
        alt="Avishkar Sports"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 h-full flex items-center">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-7xl xl:text-8xl font-black leading-tight">
              Building Communities Through Sports
            </h1>

            <p className="text-zinc-300 text-base md:text-2xl mt-6 max-w-3xl">
              Cricket • Pickleball • Destination Events • Youth Development
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;