const { Router } = require("express");
const {
  getHeroImage,
  saveHeroImage,
  listAlbums,
  createAlbum,
  listVideos,
  createVideo,
  listTours,
  createTourHandler,
  getCloudinarySignature,
} = require("../controllers/adminController");

const router = Router();

router.get("/hero", getHeroImage);
router.post("/hero", saveHeroImage);

router.get("/albums", listAlbums);
router.post("/albums", createAlbum);

router.get("/videos", listVideos);
router.post("/videos", createVideo);

router.get("/tours", listTours);
router.post("/tours", createTourHandler);

router.get("/uploads/signature", getCloudinarySignature);

module.exports = router;

