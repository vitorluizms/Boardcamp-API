import db from "../database/database.connection.js";

export default async function validateCPF(req, res, next) {
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
