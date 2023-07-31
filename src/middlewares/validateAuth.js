import db from "../database/database.connection.js";

export async function validateCPF(req, res, next) {
  const { cpf } = req.body;
  try {
    const cpfValidate = await db.query(
      `SELECT * FROM customers WHERE cpf = $1;`,
      [cpf]
    );
    if (cpfValidate.rowCount > 0)
      return res.status(409).send("CPF already exists");
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validateUpdate(req, res, next) {
  const { cpf } = req.body;
  const { id } = req.params;
  try {
    const cpfValidate = await db.query(
      `SELECT * FROM customers WHERE cpf = $1;`,
      [cpf]
    );
    if (cpfValidate.rowCount > 0) {
      if (cpfValidate.rows[0].id != id)
        return res.status(409).send("CPF already exists");
    }
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validateId(req, res, next) {
  const { id } = req.params;
  try {
    const rental = await db.query(
      `SELECT TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate", rentals."daysRented", rentals."returnDate", 
      rentals."delayFee", rentals."originalPrice"
      FROM rentals WHERE id = $1;`,
      [id]
    );

    if (rental.rowCount === 0)
      return res.status(404).send("Rental doesn't exists");

    res.locals.rental = rental;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
