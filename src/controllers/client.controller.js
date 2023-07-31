import db from "../database/database.connection.js";

export async function getCustomers(req, res) {
  try {
    const customers = await db.query(
      `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers;`
    );
    res.status(200).send(customers.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;

  try {
    const customer = await db.query(
      `SELECT id,
       name,
       phone,
       cpf,
       TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday
       FROM customers WHERE id = $1;`,
      [id]
    );
    if (customer.rowCount === 0)
      return res.status(404).send("User doesn't exists!" + id);
    res.status(200).send(customer.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  try {
    await db.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`,
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
