import express from 'express';
import { 
  getFacilities, getFacilityById, createFacility, 
  updateFacility, deleteFacility 
} from '../controllers/facilityController.js';

const router = express.Router();

router.get('/', getFacilities);
router.get('/:id', getFacilityById);
router.post('/', createFacility);
router.put('/:id', updateFacility);
router.delete('/:id', deleteFacility);

export default router;
