import db from "../database/database.connection.js";

export async function getGames(req, res) {
  try {
    const answer = await db.query(`SELECT * FROM games;`);
    res.send(answer.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;
  try {
    const validation = await db.query(`SELECT * FROM games WHERE name = $1;`, [
      name,
    ]);
    if (validation.rowCount > 0)
      return res.status(409).send("Game already exists");
    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`,
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
