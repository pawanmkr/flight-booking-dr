import db from "../config/db.js";

class UserModel {
  async createUserTable() {
    const table = await db.query(`
      CREATE TABLE IF NOT EXISTS user_table (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    return table.rows[0];
  }

  async createUser(name, email, password, admin) {
    const query = 'INSERT INTO user_table (full_name, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, password, admin];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async findUserByEmail(email) {
    const query = 'SELECT * FROM user_table WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }
}

export const user = new UserModel();