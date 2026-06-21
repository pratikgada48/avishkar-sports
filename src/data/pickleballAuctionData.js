// src/data/tournaments.js

export const tournaments = [
  {
    id: "big-bash",
    title: "Avishkar Big Bash",
    sport: "Cricket",
    type: "Tournament",
    seasons: 7,
    description: "One of Avishkar Sports' flagship cricket tournaments conducted successfully over 7 seasons.",
    stats: {
      seasons: 7,
      players: null,
      venues: []
    },
    images: []
  },

  {
    id: "hundred-ball",
    title: "100 Ball Tournament",
    sport: "Cricket",
    type: "Tournament",
    seasons: 2,
    description: "Fast-paced 100-ball cricket tournament organized by Avishkar Sports.",
    stats: {
      seasons: 2,
      players: null,
      venues: []
    },
    images: []
  },

  {
    id: "tennis-ball",
    title: "Tennis Ball Tournament",
    sport: "Cricket",
    type: "Tournament",
    seasons: 3,
    description: "Tennis ball cricket tournaments conducted over 3 successful seasons.",
    stats: {
      seasons: 3,
      players: 5800,
      venues: []
    },
    images: []
  },

  {
    id: "destination-cup",
    title: "Destination Cup",
    sport: "Cricket",
    type: "Destination Tournament",
    seasons: 3,
    description: "Destination cricket tournaments hosted across premium locations.",
    stats: {
      seasons: 3,
      players: null,
      venues: [
        "Goa",
        "Dehradun",
        "Hyderabad"
      ]
    },
    images: []
  },

  {
    id: "summer-camp",
    title: "Cricket Summer Camp",
    sport: "Cricket",
    type: "Training Camp",
    seasons: 10,
    description: "Summer cricket camps conducted for Under-16 players for more than 10 years.",
    stats: {
      seasons: 10,
      ageGroup: "Under 16"
    },
    images: []
  },

  {
    id: "pickleball",
    title: "Pickleball Tournament",
    sport: "Pickleball",
    type: "Tournament",
    seasons: 2,
    description: "Two successful seasons of Pickleball tournaments.",
    stats: {
      seasons: 2
    },
    images: []
  },

  {
    id: "football",
    title: "Football Tournament",
    sport: "Football",
    type: "Tournament",
    seasons: 3,
    description: "Football tournaments organized successfully over 3 seasons.",
    stats: {
      seasons: 3
    },
    images: []
  }
];