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

router.put('/users/:id', auth, adminAuth, async (req, res) => {
  try {
    const { name, email, contactNumber, address, role } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (email !== undefined) {
      const existing = await User.findOne({ email, _id: { $ne: req.params.id } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
      updates.email = email;
    }
    if (contactNumber !== undefined) updates.contactNumber = contactNumber;
    if (address !== undefined) updates.address = address;
    if (role !== undefined) updates.role = role;

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user, message: 'User updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
