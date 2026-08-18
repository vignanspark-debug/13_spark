import express from 'express';
import { getNavigationRoute } from '../controllers/navigationController.js';

const router = express.Router();

router.post('/route', getNavigationRoute);
router.post('/navigate', getNavigationRoute); // Alias for backwards compatibility

export default router;
