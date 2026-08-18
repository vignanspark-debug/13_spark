import express from 'express';
import { recommendAssistantFacility } from '../controllers/assistantController.js';

const router = express.Router();

router.post('/recommend', recommendAssistantFacility);
router.post('/', recommendAssistantFacility); // Alias for backwards compatibility

export default router;
