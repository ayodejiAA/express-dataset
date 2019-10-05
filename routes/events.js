var express = require('express');
var router = express.Router();
var events = require('../controllers/events');

// Routes related to event
router
  .route('/')
  .post(events.addEvent)
  .get(events.getAllEvents);

router.get('/actors/:actorId', events.getByActor);

module.exports = router;
