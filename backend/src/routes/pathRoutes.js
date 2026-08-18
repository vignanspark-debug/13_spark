import express from 'express';
import { getPaths, createPath, updatePath, deletePath } from '../controllers/pathController.js';

const router = express.Router();

router.get('/', getPaths);
router.post('/', createPath);
router.put('/:id', updatePath);
router.delete('/:id', deletePath);

export default router;
