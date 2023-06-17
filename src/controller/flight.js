import { booking } from "../models/booking.js";
import { flight } from "../models/flight.js";

function checkAdmin(req, res) {
  const isAdmin = req.user.admin;
  if (!isAdmin) {
    res.send({
      message: "Unauthorized user! you don't have sufficient permission to access this route",
    });
    return;
  }
}

export async function addFlights(req, res, next) {
  checkAdmin(req, res)
  const { number, seats } = req.body;
  console.log(req.body);

  const booked = await flight.addFlightsToDB(number, new Date(), seats);
  res.send({
    message: "Flight added",
    booking: booked
  });
}

export async function cancelFlights(req, res, next) {
  checkAdmin(req);
  const { flight_id } = req.body;
  console.log(req.body);

  const removed = await flight.removeFlightFromDB(flight_id);
  const bookings = await booking.cancelBookingsByFlight(flight_id);
  res.send({
    message: "flight and bookings cancelled",
    flight: removed,
    bookings
  });
}
