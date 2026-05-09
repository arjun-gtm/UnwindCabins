import express from 'express';
import {
  createBooking,
  deleteBookingAdmin,
  getAllBookingsAdmin,
  getMyBookings,
  updateBookingStatusAdmin,
} from '../controllers/bookingController.js';
import { auth } from '../middleware/authMiddleware.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/my', auth, getMyBookings);
router.get('/admin/all', auth, adminAuth, getAllBookingsAdmin);
router.patch('/admin/:id/status', auth, adminAuth, updateBookingStatusAdmin);
router.delete('/admin/:id', auth, adminAuth, deleteBookingAdmin);

export default router;
