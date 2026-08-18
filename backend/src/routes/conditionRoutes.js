import express from 'express';
import { 
  getConditions, createCondition, updateCondition, 
  deleteCondition, closePathCondition, reopenPathCondition 
} from '../controllers/conditionController.js';

const router = express.Router();

router.get('/', getConditions);
router.post('/', createCondition);
router.put('/:id', updateCondition);
router.delete('/:id', deleteCondition);
router.post('/:id/close', closePathCondition);
router.post('/:id/reopen', reopenPathCondition);

export default router;
