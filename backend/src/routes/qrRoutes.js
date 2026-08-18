import express from 'express';
import { 
  getQRCodes, getQRCodeById, getQRAnchoredLocation, 
  createQRCode, updateQRCode, deleteQRCode 
} from '../controllers/qrController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getQRCodes);
router.get('/:qrCodeId/location', getQRAnchoredLocation);
router.get('/:qrCodeId', getQRCodeById);
router.post('/', createQRCode);
router.put('/:id', updateQRCode);
router.delete('/:id', protectAdmin, deleteQRCode);

export default router;
