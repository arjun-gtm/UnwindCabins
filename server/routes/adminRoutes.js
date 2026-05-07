import express from 'express';
import { register, login } from '../controllers/adminController.js';
import User from '../models/User.js';
import { auth } from '../middleware/authMiddleware.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected admin routes
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/users/:id', auth, adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;