import db from "../database/database.connection.js";

export async function createRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customerValidate = await db.query(
      `SELECT * FROM customers WHERE id = $1`,
      [customerId]
    );
    if (customerValidate.rowCount === 0)
      return res.status(400).send("Customer doesn't exists");

    const gameValidate = await db.query(`SELECT * FROM games WHERE id = $1`, [
      gameId,
    ]);
    if (gameValidate.rowCount === 0)
      return res.status(400).send("Game doesn't exists");

    const game = gameValidate.rows[0];
    const gamesRented = await db.query(
      `SELECT * FROM rentals WHERE "gameId" = $1`,
      [gameId]
    );
    if (gamesRented.rows.length >= game.stockTotal)
      return res.status(400).send("Game out of stock");

    await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, CURRENT_DATE, null, $4, null)`,
      [customerId, gameId, daysRented, game.pricePerDay * daysRented]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
