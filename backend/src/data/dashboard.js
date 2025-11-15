const createId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

const hero = {
  imageUrl: "/hero.jpeg",
  updatedAt: new Date().toISOString(),
};

const albums = [
  {
    id: createId("album"),
    title: "LATEST ALBUM",
    year: "2024",
    coverUrl: "/Album.jpeg",
    tracks: ["Intro", "Vibranium", "Moonlight"],
    createdAt: new Date().toISOString(),
  },
];

const videos = [
  {
    id: createId("video"),
    title: "Vibranium (Official Visualizer)",
    youtubeUrl: "https://www.youtube.com/watch?v=lBnokNKI38I",
    videoId: "lBnokNKI38I",
    createdAt: new Date().toISOString(),
  },
];

const tours = [
  {
    id: createId("tour"),
    date: "2025-02-15",
    city: "Kigali",
    venue: "BK Arena",
    ticketUrl: "https://tickets.nelngabo.com/kigali",
    createdAt: new Date().toISOString(),
  },
];

const updateHero = ({ imageUrl }) => {
  hero.imageUrl = imageUrl;
  hero.updatedAt = new Date().toISOString();
  return hero;
};

const addAlbum = ({ title, year, coverUrl, tracks }) => {
  const album = {
    id: createId("album"),
    title,
    year,
    coverUrl,
    tracks,
    createdAt: new Date().toISOString(),
  };
  albums.unshift(album);
  return album;
};

const addVideo = ({ title, youtubeUrl, videoId }) => {
  const video = {
    id: createId("video"),
    title,
    youtubeUrl,
    videoId,
    createdAt: new Date().toISOString(),
  };
  videos.unshift(video);
  return video;
};

const addTour = ({ date, city, venue, ticketUrl }) => {
  const tour = {
    id: createId("tour"),
    date,
    city,
    venue,
    ticketUrl,
    createdAt: new Date().toISOString(),
  };
  tours.unshift(tour);
  return tour;
};

module.exports = {
  hero,
  getHero: () => hero,
  updateHero,
  albums,
  addAlbum,
  videos,
  addVideo,
  tours,
  addTour,
};

