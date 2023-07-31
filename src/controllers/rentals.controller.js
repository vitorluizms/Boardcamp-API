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
      `INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, CURRENT_DATE, null, $4, null);`,
      [customerId, gameId, daysRented, game.pricePerDay * daysRented]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getRentals(req, res) {
  try {
    const result = await db.query(
      `SELECT rentals.*, customers.id AS customer_id, customers.name AS customer_name, games.id AS game_id, games.name AS game_name FROM rentals
        JOIN customers ON rentals."customerId" = customers.id 
        JOIN games ON rentals."gameId" = games.id;`
    );
    const rentals = result.rows.map((element) => {
      const date = new Date(element.rentDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1)
      const day = String(date.getDate())
      return {
        id: element.id,
        customerId: element.customerId,
        gameId: element.daysRented,
        rentDate: `${year}-${month}-${day}`,
        returnDate: element.returnDate,
        originalPrice: element.originalPrice,
        delayFee: element.delayFee,
        customer: {
          id: element.customer_id,
          name: element.customer_name,
        },
        game: {
          id: element.game_id,
          name: element.game_name,
        },
      };
    });
    res.status(200).send(rentals);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
