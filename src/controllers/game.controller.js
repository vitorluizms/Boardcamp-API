import db from "../database/database.connection.js";

export async function getGames(req, res) {
  try {
    const answer = await db.query(`SELECT * FROM games`);
    res.send(answer.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postGame(req, res) {
  res.send("okay")
}
