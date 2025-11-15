const Album = require("../models/Album");

const listAlbums = async (_req, res, next) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (error) {
    next(error);
  }
};

const createAlbum = async (req, res, next) => {
  try {
    const { title, year, coverUrl, tracks } = req.body;
    if (!title || !year || !coverUrl) {
      return res.status(400).json({ message: "title, year and coverUrl are required" });
    }
    const album = await Album.create({
      title,
      year,
      coverUrl,
      tracks: Array.isArray(tracks) ? tracks : (tracks || "").split(",").map((t) => t.trim()).filter(Boolean),
    });
    res.status(201).json(album);
  } catch (error) {
    next(error);
  }
};

const updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, year, coverUrl, tracks } = req.body;
    const album = await Album.findByIdAndUpdate(
      id,
      {
        title,
        year,
        coverUrl,
        tracks: Array.isArray(tracks) ? tracks : (tracks || "").split(",").map((t) => t.trim()).filter(Boolean),
      },
      { new: true },
    );
    if (!album) return res.status(404).json({ message: "Album not found" });
    res.json(album);
  } catch (error) {
    next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndDelete(id);
    if (!album) return res.status(404).json({ message: "Album not found" });
    res.json({ message: "Album deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};

