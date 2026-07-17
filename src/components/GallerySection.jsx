function GallerySection({ images = [] }) {
  if (!images.length) {
    return (
      <section className="py-20">
        <div className="w-[95%] mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-10">
            Gallery
          </h2>

          <p className="text-zinc-400">
            Gallery will be updated soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="w-[95%] mx-auto">

        <h2 className="text-center text-4xl md:text-6xl font-bold mb-14">
          Gallery
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-[220px] overflow-hidden rounded-2xl bg-zinc-900"
            >
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-50"
              />
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="relative h-full w-full object-contain"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default GallerySection;
