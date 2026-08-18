import express from 'express';
import { loginUser, registerUser, getMe } from '../controllers/authController.js';
import { protectUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', protectUser, getMe);

export default router;
