const Video = require("../models/Video");

const listVideos = async (_req, res, next) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    next(error);
  }
};

const createVideo = async (req, res, next) => {
  try {
    const { title, youtubeId, description } = req.body;
    if (!title || !youtubeId) {
      return res.status(400).json({ message: "title and youtubeId are required" });
    }
    const video = await Video.create({ title, youtubeId, description });
    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, youtubeId, description } = req.body;
    const video = await Video.findByIdAndUpdate(id, { title, youtubeId, description }, { new: true });
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (error) {
    next(error);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listVideos,
  createVideo,
  updateVideo,
  deleteVideo,
};

