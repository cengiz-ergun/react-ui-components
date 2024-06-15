export const mockBaseUrl = "https://example.com/api";
export const mockEndpoint = "/rock-bands";

export const mockFirstPage = {
  info: {
    next: "https://example.com/api/rock-bands?page=2",
  },
  rockBands: [
    {
      id: 1,
      name: "Led Zeppelin",
      logoUrl: "https://example.com/logos/led-zeppelin.jpg",
      members: 4,
      songCount: 87,
      topSongs: ["Stairway to Heaven", "Whole Lotta Love"],
    },
    {
      id: 2,
      name: "The Beatles",
      logoUrl: "https://example.com/logos/the-beatles.jpg",
      members: 4,
      songCount: 213,
      topSongs: ["Hey Jude", "Let It Be"],
    },
    {
      id: 3,
      name: "Queen",
      logoUrl: "https://example.com/logos/queen.jpg",
      members: 4,
      songCount: 177,
      topSongs: ["Bohemian Rhapsody", "We Will Rock You"],
    },
    {
      id: 4,
      name: "Pink Floyd",
      logoUrl: "https://example.com/logos/pink-floyd.jpg",
      members: 5,
      songCount: 152,
      topSongs: ["Comfortably Numb", "Wish You Were Here"],
    },
    {
      id: 5,
      name: "AC/DC",
      logoUrl: "https://example.com/logos/acdc.jpg",
      members: 5,
      songCount: 197,
      topSongs: ["Highway to Hell", "Back in Black"],
    },
    {
      id: 6,
      name: "The Rolling Stones",
      logoUrl: "https://example.com/logos/the-rolling-stones.jpg",
      members: 5,
      songCount: 242,
      topSongs: ["(I Can't Get No) Satisfaction", "Paint It Black"],
    },
    {
      id: 7,
      name: "Metallica",
      logoUrl: "https://example.com/logos/metallica.jpg",
      members: 4,
      songCount: 120,
      topSongs: ["Enter Sandman", "Master of Puppets"],
    },
    {
      id: 8,
      name: "Nirvana",
      logoUrl: "https://example.com/logos/nirvana.jpg",
      members: 3,
      songCount: 75,
      topSongs: ["Smells Like Teen Spirit", "Come as You Are"],
    },
    {
      id: 9,
      name: "Guns N' Roses",
      logoUrl: "https://example.com/logos/guns-n-roses.jpg",
      members: 5,
      songCount: 104,
      topSongs: ["Sweet Child o' Mine", "November Rain"],
    },
    {
      id: 10,
      name: "The Who",
      logoUrl: "https://example.com/logos/the-who.jpg",
      members: 4,
      songCount: 162,
      topSongs: ["Baba O'Riley", "My Generation"],
    },
  ],
};

export const mockSecondPage = {
  info: {
    next: null,
  },
  rockBands: [
    {
      id: 11,
      name: "Deep Purple",
      logoUrl: "https://example.com/logos/deep-purple.jpg",
      members: 5,
      songCount: 187,
      topSongs: ["Smoke on the Water", "Highway Star"],
    },
    {
      id: 12,
      name: "The Doors",
      logoUrl: "https://example.com/logos/the-doors.jpg",
      members: 4,
      songCount: 94,
      topSongs: ["Light My Fire", "Riders on the Storm"],
    },
    {
      id: 13,
      name: "Black Sabbath",
      logoUrl: "https://example.com/logos/black-sabbath.jpg",
      members: 4,
      songCount: 134,
      topSongs: ["Paranoid", "Iron Man"],
    },
    {
      id: 14,
      name: "Def Leppard",
      logoUrl: "https://example.com/logos/def-leppard.jpg",
      members: 5,
      songCount: 96,
      topSongs: ["Pour Some Sugar on Me", "Photograph"],
    },
    {
      id: 15,
      name: "Journey",
      logoUrl: "https://example.com/logos/journey.jpg",
      members: 5,
      songCount: 98,
      topSongs: ["Don't Stop Believin'", "Wheel in the Sky"],
    },
  ],
};

export const mockNotFound = { error: "There is nothing here" };

export const mockFilterApi = (input: string) => {
  const filtered = {
    info: {
      next: null,
    },
    rockBands: [
      ...mockFirstPage.rockBands.filter((rb) =>
        rb.name.toUpperCase().includes(input.toUpperCase())
      ),
    ],
  };
  return filtered;
};
