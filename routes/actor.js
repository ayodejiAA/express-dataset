var express = require('express');
var router = express.Router();
var actors = require('../controllers/actors');

// Routes related to actor.
router
  .route('/')
  .put(actors.updateActor)
  .get(actors.getAllActors);

router.get('/streak', actors.getStreak);

module.exports = router;
