import { auth } from './authMiddleware.js';

export const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};