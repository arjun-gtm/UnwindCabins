import Booking from '../models/Booking.js';
import Package from '../models/Package.js';

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export const createBooking = asyncHandler(async (req, res) => {
  const { packageId, checkIn, checkOut, guests } = req.body;

  if (!packageId || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ success: false, message: 'Package, dates, and guests are required' });
  }

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate <= startDate) {
    return res.status(400).json({ success: false, message: 'Please choose a valid check-in and check-out date' });
  }

  const packageItem = await Package.findOne({ _id: packageId, isPublished: true });
  if (!packageItem) {
    return res.status(404).json({ success: false, message: 'Package not found' });
  }

  const booking = await Booking.create({
    user: req.user.id,
    package: packageItem._id,
    packageSlug: packageItem.slug,
    packageTitle: packageItem.title,
    packageLocation: packageItem.location,
    packageCoverImage: packageItem.coverImage,
    checkIn: startDate,
    checkOut: endDate,
    guests,
    totalPrice: packageItem.price,
    currency: packageItem.currency,
  });

  res.status(201).json({ success: true, data: booking, message: 'Booking created' });
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({
    success: true,
    count: bookings.length,
    data: bookings,
    message: 'Bookings fetched',
  });
});

export const getAllBookingsAdmin = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: bookings.length,
    data: bookings,
    message: 'All bookings fetched',
  });
});

export const updateBookingStatusAdmin = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowedStatuses = ['pending', 'confirmed', 'cancelled'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid booking status' });
  }

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  ).populate('user', 'name email');

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  res.json({ success: true, data: booking, message: 'Booking status updated' });
});

export const deleteBookingAdmin = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  res.json({ success: true, data: booking, message: 'Booking deleted' });
});
