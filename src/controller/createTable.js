import {
  booking,
  flight,
  user
} from '../models/index.js';

export default async function createTable() {
  await user.createUserTable();
  await flight.createFlightTable();
  await booking.createBookingTable();
  console.log("--> tables created");
}