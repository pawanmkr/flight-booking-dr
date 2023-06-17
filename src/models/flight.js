import db from "../config/db.js";

class FlightModel {
  async createFlightTable() {
    const table = await db.query(`
      CREATE TABLE IF NOT EXISTS flight (
        id SERIAL PRIMARY KEY,
        flight_number INTEGER NOT NULL,
        time TIMESTAMP NOT NULL,
        seats INTEGER NOT NULL
      );
    `);
    return table.rows[0];
  }

  async addFlightsToDB(flightNumber, time, seatCount) {
    const query = `
      INSERT INTO flight (flight_number, time, seats) 
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [flightNumber, time, seatCount];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async removeFlightFromDB(flightId) {
    const query = 'DELETE FROM flight WHERE id = $1 RETURNING *';
    const result = await db.query(query, [flightId]);
    return result.rows[0];
  }

  async getFlightById(flightId) {
    const query = 'SELECT * FROM flight WHERE id = $1';
    const values = [flightId];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Add more methods as per your requirements
}

export const flight = new FlightModel();
