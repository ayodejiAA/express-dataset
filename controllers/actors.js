const Actors = require('../models/Actors');

const getAllActors = async (req, res, next) => {
  try {
    const actors = await Actors.getAllActors();
    res.status(200).json(actors);
  } catch (error) {
    next(error);
  }
};

const updateActor = async (req, res, next) => {
  try {
    const data = req.body;
    const actor = await Actors.getById(data.id);
    if (!actor) return res.status(404).json({});
    if (actor && actor.login !== data.login) return res.status(400).json({});
    await Actors.updateAvatar(data.avatar_url, actor.actor_id);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

var getStreak = async (req, res, next) => {
  try {
    let actors = await Actors.getStreak();
    actors.forEach(actor => {
      delete actor.pushevents;
    });
    res.status(200).json(actors);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateActor: updateActor,
  getAllActors: getAllActors,
  getStreak: getStreak
};
