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
              className="overflow-hidden rounded-2xl bg-zinc-900"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-[220px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default GallerySection;