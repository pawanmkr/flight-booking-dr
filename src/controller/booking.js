import { booking } from "../models/booking.js";

function checkAdmin(req) {
  const isAdmin = req.user.admin;
  if (!isAdmin) {
    res.send({
      message: "Unauthorized user! you don't have sufficient permission to access this route",
    });
  }
}

export async function listBookings(req, res, next) {
  checkAdmin(req);
  console.log(req.body);
  const flightId = req.body.flight_id;

  const bookings = await booking.listBookings(flightId);
  res.send({
    message: "Bookings Retrieved",
    bookings
  });
}

export async function bookFlight(req, res, next) {
  console.log(req.body);
  const { flight_id, user_id } = req.body;

  const ticket = await booking.createBooking(user_id, flight_id);
  res.send({
    message: "flight booked",
    ticket
  });
}

export async function userBookings(req, res, next) {
  const { user_id } = req.body;
  console.log(req.body)
  const bookings = await booking.getBookingsByUserId(user_id);
  res.send({
    message: "user bookings fetched",
    bookings
  });
}