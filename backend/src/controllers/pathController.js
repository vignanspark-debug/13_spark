import { isMongoConnected } from '../config/db.js';
import { PathModel } from '../models/Path.js';
import { inMemoryDB } from '../utils/seedData.js';

export const getPaths = async (req, res) => {
  if (isMongoConnected) {
    const paths = await PathModel.find({});
    return res.json({ success: true, count: paths.length, data: paths });
  } else {
    return res.json({ success: true, count: inMemoryDB.paths.length, data: inMemoryDB.paths });
  }
};

export const createPath = async (req, res) => {
  const data = req.body;
  if (!data.id || !data.startLocationId || !data.endLocationId) {
    return res.status(400).json({ success: false, message: 'id, startLocationId and endLocationId are required' });
  }

  if (isMongoConnected) {
    const path = await PathModel.create(data);
    return res.json({ success: true, data: path });
  } else {
    inMemoryDB.paths.push(data);
    return res.json({ success: true, data });
  }
};

export const updatePath = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (isMongoConnected) {
    const updated = await PathModel.findOneAndUpdate({ id }, updates, { new: true });
    return res.json({ success: true, data: updated });
  } else {
    const idx = inMemoryDB.paths.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Path not found' });
    inMemoryDB.paths[idx] = { ...inMemoryDB.paths[idx], ...updates };
    return res.json({ success: true, data: inMemoryDB.paths[idx] });
  }
};

export const deletePath = async (req, res) => {
  const { id } = req.params;
  if (isMongoConnected) {
    await PathModel.deleteOne({ id });
  } else {
    inMemoryDB.paths = inMemoryDB.paths.filter(p => p.id !== id);
  }
  res.json({ success: true, message: `Path ${id} deleted.` });
};
