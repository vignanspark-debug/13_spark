import { isMongoConnected } from '../config/db.js';
import { QRLocation } from '../models/QRLocation.js';
import { Location } from '../models/Location.js';
import { inMemoryDB } from '../utils/seedData.js';

export const getQRCodes = async (req, res) => {
  if (isMongoConnected) {
    const qrs = await QRLocation.find({});
    return res.json({ success: true, count: qrs.length, data: qrs });
  } else {
    return res.json({ success: true, count: inMemoryDB.qrs.length, data: inMemoryDB.qrs });
  }
};

export const getQRCodeById = async (req, res) => {
  const { qrCodeId } = req.params;
  let qr;
  if (isMongoConnected) {
    qr = await QRLocation.findOne({ qrCodeId });
  } else {
    qr = inMemoryDB.qrs.find(q => q.qrCodeId === qrCodeId);
  }

  if (!qr) return res.status(404).json({ success: false, message: 'QR Code anchor not found' });
  res.json({ success: true, data: qr });
};

export const getQRAnchoredLocation = async (req, res) => {
  const { qrCodeId } = req.params;
  let loc;
  if (isMongoConnected) {
    const qr = await QRLocation.findOne({ qrCodeId });
    if (qr) {
      loc = await Location.findOne({ id: qr.locationId });
    }
    if (!loc) {
      loc = await Location.findOne({ qrCodeId });
    }
  } else {
    const qr = inMemoryDB.qrs.find(q => q.qrCodeId === qrCodeId);
    if (qr) {
      loc = inMemoryDB.locations.find(l => l.id === qr.locationId);
    }
    if (!loc) {
      loc = inMemoryDB.locations.find(l => l.qrCodeId === qrCodeId || l.id === qrCodeId);
    }
  }

  if (!loc) {
    return res.status(404).json({ success: false, message: `No target campus location found for QR: ${qrCodeId}` });
  }

  res.json({ success: true, qrCodeId, currentLocation: loc, data: loc });
};

export const createQRCode = async (req, res) => {
  const data = req.body;
  if (!data.qrCodeId || !data.locationId) {
    return res.status(400).json({ success: false, message: 'qrCodeId and locationId are required' });
  }

  if (isMongoConnected) {
    const qr = await QRLocation.create(data);
    return res.json({ success: true, data: qr });
  } else {
    inMemoryDB.qrs.push(data);
    return res.json({ success: true, data });
  }
};

export const updateQRCode = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (isMongoConnected) {
    const updated = await QRLocation.findOneAndUpdate({ qrCodeId: id }, updates, { new: true });
    return res.json({ success: true, data: updated });
  } else {
    const idx = inMemoryDB.qrs.findIndex(q => q.qrCodeId === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'QR Code not found' });
    inMemoryDB.qrs[idx] = { ...inMemoryDB.qrs[idx], ...updates };
    return res.json({ success: true, data: inMemoryDB.qrs[idx] });
  }
};

export const deleteQRCode = async (req, res) => {
  const { id } = req.params;
  if (isMongoConnected) {
    await QRLocation.deleteOne({ qrCodeId: id });
  } else {
    inMemoryDB.qrs = inMemoryDB.qrs.filter(q => q.qrCodeId !== id);
  }
  res.json({ success: true, message: `QR Code ${id} deleted.` });
};
