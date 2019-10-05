/* Loads the event model */
const Events = require('../models/Events');

/* Arrange events data */
const orderEvents = events => {
  const eventsList = events;
  return eventsList.map(event => {
    const { id, type, actor_id, repo_id, created_at, login, avatar_url, name, url } = event;
    const actor = { id: actor_id, login, avatar_url };
    const repo = { id: repo_id, name, url };
    return { id, type, actor, repo, created_at };
  });
};

/* Get all events middleware */
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Events.getAll();
    return res.status(200).json(orderEvents(events));
  } catch (error) {
    next(error);
  }
};

/* Add event middleware */
const addEvent = async (req, res, next) => {
  try {
    const data = req.body;
    const event = await Events.add(data);
    if (event) return res.status(201).json({ ...data });
  } catch (error) {
    // Returns error response when event with the same id already exists
    if (error.code == 'SQLITE_CONSTRAINT')
      return res.status(400).json({ message: 'Event already exists' });
    next(error);
  }
};

const getByActor = async (req, res, next) => {
  try {
    const { actorId } = req.params;
    const events = await Events.getEventsByActorID(actorId);
    const code = events.length < 1 ? 404 : 200;
    return res.status(code).json(orderEvents(events));
  } catch (error) {
    next(error);
  }
};

const eraseEvents = async (req, res, next) => {
  try {
    await Events.deleteAll();
    res.status(200).json([]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents: getAllEvents,
  addEvent: addEvent,
  getByActor: getByActor,
  eraseEvents: eraseEvents
};
