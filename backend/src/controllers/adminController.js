const {
  getHero,
  updateHero,
  albums,
  addAlbum,
  videos,
  addVideo,
  tours,
  addTour,
} = require("../data/dashboard");
const { getUploadSignature } = require("../services/cloudinary");

const normalizeTracks = (tracks) => {
  if (Array.isArray(tracks)) {
    return tracks.filter(Boolean).map((track) => track.trim());
  }
  if (typeof tracks === "string") {
    return tracks
      .split(/\r?\n/)
      .map((track) => track.trim())
      .filter(Boolean);
  }
  return [];
};

const extractVideoId = (url) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/,
  );
  return match ? match[1] : null;
};

const getHeroImage = (_req, res) => {
  res.json(getHero());
};

const saveHeroImage = (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ message: "imageUrl is required" });
  }
  const payload = updateHero({ imageUrl });
  res.json(payload);
};

const listAlbums = (_req, res) => {
  res.json({ albums });
};

const createAlbum = (req, res) => {
  const { title, year, coverUrl, tracks } = req.body;
  if (!title || !coverUrl) {
    return res.status(400).json({ message: "title and coverUrl are required" });
  }
  const album = addAlbum({
    title,
    year: year || "",
    coverUrl,
    tracks: normalizeTracks(tracks),
  });
  res.status(201).json(album);
};

const listVideos = (_req, res) => {
  res.json({ videos });
};

const createVideo = (req, res) => {
  const { title, youtubeUrl } = req.body;
  if (!title || !youtubeUrl) {
    return res.status(400).json({ message: "title and youtubeUrl are required" });
  }
  const videoId = extractVideoId(youtubeUrl);
  if (!videoId) {
    return res.status(400).json({ message: "Unable to extract video id from URL" });
  }
  const video = addVideo({ title, youtubeUrl, videoId });
  res.status(201).json(video);
};

const listTours = (_req, res) => {
  res.json({ tours });
};

const createTourHandler = (req, res) => {
  const { date, city, venue, ticketUrl } = req.body;
  if (!date || !city || !venue || !ticketUrl) {
    return res.status(400).json({ message: "date, city, venue and ticketUrl are required" });
  }
  const tour = addTour({ date, city, venue, ticketUrl });
  res.status(201).json(tour);
};

const getCloudinarySignature = (_req, res, next) => {
  try {
    const payload = getUploadSignature();
    res.json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHeroImage,
  saveHeroImage,
  listAlbums,
  createAlbum,
  listVideos,
  createVideo,
  listTours,
  createTourHandler,
  getCloudinarySignature,
};

