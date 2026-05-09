import express from 'express';
import { register, login, me, updateMe } from '../controllers/userController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);
router.put('/me', auth, updateMe);

export default router;
