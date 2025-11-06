const express = require('express');
const app = express();
const port = process.env.PORT || 4002;
const cors = require("cors");
app.use(express.json());
app.use(cors());
const model = require('./model');
const authenticateToken = require('./authenticate');

app.get('/game/health', (req, res) => {
  res.json({ message: 'Game Service is alive!' });
});

app.get('/game/list', async (req, res) => {
  try {
    let games = await model.GetAllGames();
    games=games.map(game=>({
      id:game.GameId,
      title:game.Title,
      genre:game.Genre,
      description:game.Description,
      rating:game.Rating
    }));
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'+ error});
  }
});
app.post('/game/rate', authenticateToken(), async (req, res) => {
  const { gameId, rating, userId } = req.body;
  try {
    await model.RateGame(gameId, rating, userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'+ error});
  }
});
app.post('/game/add', authenticateToken("ADMIN"), async (req, res) => {
  const { title, genre, description } = req.body;
  try {
    await model.AddGame(title, genre, description);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'+ error});
  }
});
app.listen(port, () => console.log(`Game Service running on port ${port}`));
