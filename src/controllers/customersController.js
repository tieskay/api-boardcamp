import connection from "../database/database.js"

export async function getCustomers(req, res) {
  let { cpf } = req.query;

  if (!cpf) {
    cpf = "";
  }

  try {
    const result = await connection.query(`
      SELECT * FROM customers
        WHERE cpf LIKE $1    
    `, [`${cpf}%`]);

    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addCustomer(req, res) {
  const { name, cpf, phone, birthday } = req.body;

  try {
    await connection.query(`
      INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4) 
    `, [name, phone, cpf, birthday]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;

  try {
    const { rows: customer } = await connection.query(`
      SELECT * FROM customers
        WHERE id=$1    
    `, [id]);

    if (customer.length === 0) {
      return res.sendStatus(404);
    }

    res.send(customer[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}