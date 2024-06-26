const express = require('express');
const router = express.Router();
const {
  getIgdbGameById,
  getIgdbGames,
  searchIgdbGames,
  getGameById,
  getGames,
  createGames,
  updateGameById,
  deleteGameById,
} = require('../controllers/gameController');

// DIRECT to IGDB's API  ===============================================
router.post('/igdb/', getIgdbGames);
router.get('/search', searchIgdbGames); //by query

// Games collection  ===============================================
router.get('/:igdbId/', getGameById);
router.post('/list', getGames);  //TODO change the endpoint to /games/igdbIds ? Change to GET and use path params
router.put('/:igdbId', updateGameById);
router.delete('/:igdbId', deleteGameById);

// router.delete('/:_id', ()) // for dev and testing only

module.exports = router;
