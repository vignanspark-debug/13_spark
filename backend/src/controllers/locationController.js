import { isMongoConnected } from '../config/db.js';
import { Location } from '../models/Location.js';
import { inMemoryDB } from '../utils/seedData.js';

export const getLocations = async (req, res) => {
  if (isMongoConnected) {
    const locations = await Location.find({});
    return res.json({ success: true, count: locations.length, data: locations });
  } else {
    return res.json({ success: true, count: inMemoryDB.locations.length, data: inMemoryDB.locations });
  }
};

export const getLocationById = async (req, res) => {
  const { id } = req.params;
  let location;
  if (isMongoConnected) {
    location = await Location.findOne({ $or: [{ id }, { qrCodeId: id }] });
  } else {
    location = inMemoryDB.locations.find(l => l.id === id || l.qrCodeId === id);
  }

  if (!location) {
    return res.status(404).json({ success: false, message: 'Location not found' });
  }
  res.json({ success: true, data: location });
};

export const createLocation = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.id) {
    return res.status(400).json({ success: false, message: 'ID and Name are required' });
  }

  if (isMongoConnected) {
    const location = await Location.create(data);
    return res.json({ success: true, data: location });
  } else {
    inMemoryDB.locations.push(data);
    return res.json({ success: true, data });
  }
};

export const updateLocation = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (isMongoConnected) {
    const updated = await Location.findOneAndUpdate({ id }, updates, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Location not found' });
    return res.json({ success: true, data: updated });
  } else {
    const idx = inMemoryDB.locations.findIndex(l => l.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Location not found' });
    inMemoryDB.locations[idx] = { ...inMemoryDB.locations[idx], ...updates, updatedAt: new Date() };
    return res.json({ success: true, data: inMemoryDB.locations[idx] });
  }
};

export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  if (isMongoConnected) {
    await Location.deleteOne({ id });
  } else {
    inMemoryDB.locations = inMemoryDB.locations.filter(l => l.id !== id);
  }
  res.json({ success: true, message: `Location ${id} deleted successfully.` });
};
