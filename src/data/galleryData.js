const galleryData = {
  bigbash: Array.from(
    { length: 20 },
    (_, i) => `/tournaments/bigbash/bigbash-${i + 1}.jpeg`
  ),

  destinationCup: Array.from(
    { length: 48 },
    (_, i) => `/tournaments/destination-cup/destination-${i + 1}.jpeg`
  ),

  pickleball: Array.from(
    { length: 33 },
    (_, i) => `/tournaments/pickleball-one-day/pickleball-${i + 1}.jpeg`
  ),
};

export default galleryData;