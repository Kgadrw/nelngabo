const HeroSetting = require("../models/HeroSetting");

const getHeroSetting = async (_req, res, next) => {
  try {
    let hero = await HeroSetting.findOne();
    if (!hero) {
      hero = await HeroSetting.create({ backgroundImage: "" });
    }
    res.json(hero);
  } catch (error) {
    next(error);
  }
};

const updateHeroSetting = async (req, res, next) => {
  try {
    const { backgroundImage } = req.body;
    if (!backgroundImage) {
      return res.status(400).json({ message: "backgroundImage is required" });
    }
    const hero = await HeroSetting.findOneAndUpdate(
      {},
      { backgroundImage },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    res.json(hero);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHeroSetting,
  updateHeroSetting,
};

