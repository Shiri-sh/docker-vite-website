const con = require('./db.js');

const GetAllGames = async () => {
    try {
        const sql = 'SELECT g.GameId, g.Title, g.Description, avg(r.Score) as Rating FROM Games g left join Ratings r on g.GameId = r.GameId group by g.GameId, g.Title, g.Description';
        const [rows] = await con.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}
const RateGame = async (gameId, rating, userId) => {
    try {
        const sql = 'Insert INTO Ratings (GameId, Score, UserId, CreatedAt) VALUES (?, ?, ?, ?)';
        const [rows] = await con.query(sql, [gameId, rating, userId, new Date()]);
        return rows;
    } catch (err) {
        throw err;
    }
}
const AddGame = async (title, genre, description) => {
    try {
        const sql = 'INSERT INTO Games (Title, Genre, Description) VALUES (?, ?, ?)';
        const [rows] = await con.query(sql, [title, genre, description]);
        return rows;
    } catch (err) {
        throw err;
    }
}
module.exports = {
    GetAllGames,
    RateGame,
    AddGame
};