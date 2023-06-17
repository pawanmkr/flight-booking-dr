import db from "../config/db.js";

class BookingModel {
  async createBookingTable() {
    const table = await db.query(`
      CREATE TABLE IF NOT EXISTS booking (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        flight_id INTEGER NOT NULL,
        booking_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user_table (id),
        FOREIGN KEY (flight_id) REFERENCES flight (id)
      );
    `);
    return table.rows[0];
  }

  async createBooking(userId, flightId) {
    const query = 'INSERT INTO booking (user_id, flight_id) VALUES ($1, $2) RETURNING *';
    const values = [userId, flightId];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async cancelBookingsByFlight(flightId) {
    const query = 'DELETE FROM booking WHERE flight_id = $1 RETURNING *';
    const result = await db.query(query, [flightId]);
    return result.rows;
  }

  async getBookingsByUserId(userId) {
    const query = 'SELECT * FROM booking WHERE user_id = $1';
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  async listBookings(flightId) {
    const query = 'SELECT * FROM booking WHERE flight_id = $1';
    const result = await db.query(query, [flightId]);
    return result.rows;
  }

  // Add more methods as per your requirements
}

export const booking = new BookingModel();
