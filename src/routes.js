import express from 'express';
import { authenticate } from './middlewares/auth.js';
import {
  health,
  addFlights,
  listBookings,
  bookFlight,
  userBookings,
  cancelFlights,
  signup,
  login
} from './controller/index.js';

const router = express.Router();

router.get('/health', health);

router.post('/user/login', login);
router.post('/user/signup', signup);
// router.post('/user/flights/search', searchFlights);
router.post('/user/flights/book', authenticate, bookFlight);
router.post('/user/flights/bookings', authenticate, userBookings);

router.post('/admin/flights/add', authenticate, addFlights);
router.delete('/admin/flights/cancel', authenticate, cancelFlights);
router.post('/admin/flights/bookings', authenticate, listBookings);

export default router;