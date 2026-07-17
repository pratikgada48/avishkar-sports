const galleryData = {
  bigbash: Array.from(
    { length: 20 },
    (_, i) => `/tournaments/bigbash/bigbash-${i + 1}.jpeg`
  ),

  destinationCup: Array.from({ length: 115 }, (_, i) => i + 1)
    .filter((number) => number !== 49)
    .map((number) => `/tournaments/destination-cup/destination-${number}.jpeg`),

  pickleball: Array.from(
    { length: 33 },
    (_, i) => `/tournaments/pickleball-one-day/pickleball-${i + 1}.jpeg`
  ),

  pickleballLeagueSeason1: Array.from(
    { length: 93 },
    (_, i) =>
      `/tournaments/pickleball-league/pickleball-league1-${i + 1}.jpeg`
  ),
};

export default galleryData;
