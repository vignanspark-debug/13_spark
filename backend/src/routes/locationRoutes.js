import express from 'express';
import { 
  getLocations, getLocationById, createLocation, 
  updateLocation, deleteLocation 
} from '../controllers/locationController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getLocations);
router.get('/:id', getLocationById);
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.delete('/:id', protectAdmin, deleteLocation);

export default router;
