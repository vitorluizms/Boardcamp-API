import db from "../database/database.connection.js";

export async function getCustomers(req, res) {
  try {
    const customers = await db.query(
      `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY - MM - DD') AS birthday FROM customers`
    );
    res.status(200).send(customers.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
