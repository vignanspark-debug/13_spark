import { isMongoConnected } from '../config/db.js';
import { CampusCondition } from '../models/CampusCondition.js';
import { PathModel } from '../models/Path.js';
import { inMemoryDB } from '../utils/seedData.js';

export const getConditions = async (req, res) => {
  if (isMongoConnected) {
    const conditions = await CampusCondition.find({});
    return res.json({ success: true, count: conditions.length, data: conditions });
  } else {
    return res.json({ success: true, count: inMemoryDB.conditions.length, data: inMemoryDB.conditions });
  }
};

export const createCondition = async (req, res) => {
  const data = req.body;
  if (!data.id) data.id = `cond_${Date.now()}`;

  if (isMongoConnected) {
    const cond = await CampusCondition.create(data);
    if (data.affectedPathId) {
      await PathModel.findOneAndUpdate(
        { id: data.affectedPathId },
        { status: 'closed', closureReason: data.description || data.title }
      );
    }
    return res.json({ success: true, data: cond });
  } else {
    inMemoryDB.conditions.push(data);
    if (data.affectedPathId) {
      const pathIdx = inMemoryDB.paths.findIndex(p => p.id === data.affectedPathId);
      if (pathIdx !== -1) {
        inMemoryDB.paths[pathIdx].status = 'closed';
        inMemoryDB.paths[pathIdx].closureReason = data.description || data.title;
      }
    }
    return res.json({ success: true, data });
  }
};

export const updateCondition = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (isMongoConnected) {
    const updated = await CampusCondition.findOneAndUpdate({ id }, updates, { new: true });
    return res.json({ success: true, data: updated });
  } else {
    const idx = inMemoryDB.conditions.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Condition not found' });
    inMemoryDB.conditions[idx] = { ...inMemoryDB.conditions[idx], ...updates };
    return res.json({ success: true, data: inMemoryDB.conditions[idx] });
  }
};

export const deleteCondition = async (req, res) => {
  const { id } = req.params;
  if (isMongoConnected) {
    await CampusCondition.deleteOne({ id });
  } else {
    inMemoryDB.conditions = inMemoryDB.conditions.filter(c => c.id !== id);
  }
  res.json({ success: true, message: `Condition ${id} deleted.` });
};

export const closePathCondition = async (req, res) => {
  const { id } = req.params; // path ID or condition ID
  const { closureReason = 'Temporarily closed for maintenance' } = req.body;

  if (isMongoConnected) {
    await PathModel.findOneAndUpdate({ id }, { status: 'closed', closureReason });
    await CampusCondition.findOneAndUpdate(
      { affectedPathId: id },
      { status: 'Active', description: closureReason },
      { upsert: true }
    );
  } else {
    const pathIdx = inMemoryDB.paths.findIndex(p => p.id === id);
    if (pathIdx !== -1) {
      inMemoryDB.paths[pathIdx].status = 'closed';
      inMemoryDB.paths[pathIdx].closureReason = closureReason;
    }
  }

  res.json({ success: true, pathId: id, status: 'closed', closureReason });
};

export const reopenPathCondition = async (req, res) => {
  const { id } = req.params; // path ID or condition ID

  if (isMongoConnected) {
    await PathModel.findOneAndUpdate({ id }, { status: 'open', closureReason: '' });
    await CampusCondition.findOneAndUpdate({ affectedPathId: id }, { status: 'Resolved' });
  } else {
    const pathIdx = inMemoryDB.paths.findIndex(p => p.id === id);
    if (pathIdx !== -1) {
      inMemoryDB.paths[pathIdx].status = 'open';
      inMemoryDB.paths[pathIdx].closureReason = '';
    }
  }

  res.json({ success: true, pathId: id, status: 'open' });
};
