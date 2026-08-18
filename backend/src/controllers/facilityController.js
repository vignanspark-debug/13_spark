import { isMongoConnected } from '../config/db.js';
import { Facility } from '../models/Facility.js';
import { inMemoryDB } from '../utils/seedData.js';

export const getFacilities = async (req, res) => {
  if (isMongoConnected) {
    const facilities = await Facility.find({});
    return res.json({ success: true, count: facilities.length, data: facilities });
  } else {
    return res.json({ success: true, count: inMemoryDB.facilities.length, data: inMemoryDB.facilities });
  }
};

export const getFacilityById = async (req, res) => {
  const { id } = req.params;
  let facility;
  if (isMongoConnected) {
    facility = await Facility.findOne({ id });
  } else {
    facility = inMemoryDB.facilities.find(f => f.id === id);
  }
  if (!facility) return res.status(404).json({ success: false, message: 'Facility not found' });
  res.json({ success: true, data: facility });
};

export const createFacility = async (req, res) => {
  const data = req.body;
  if (isMongoConnected) {
    const facility = await Facility.create(data);
    return res.json({ success: true, data: facility });
  } else {
    inMemoryDB.facilities.push(data);
    return res.json({ success: true, data });
  }
};

export const updateFacility = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (isMongoConnected) {
    const updated = await Facility.findOneAndUpdate({ id }, updates, { new: true });
    return res.json({ success: true, data: updated });
  } else {
    const idx = inMemoryDB.facilities.findIndex(f => f.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Facility not found' });
    inMemoryDB.facilities[idx] = { ...inMemoryDB.facilities[idx], ...updates };
    return res.json({ success: true, data: inMemoryDB.facilities[idx] });
  }
};

export const deleteFacility = async (req, res) => {
  const { id } = req.params;
  if (isMongoConnected) {
    await Facility.deleteOne({ id });
  } else {
    inMemoryDB.facilities = inMemoryDB.facilities.filter(f => f.id !== id);
  }
  res.json({ success: true, message: `Facility ${id} deleted.` });
};
