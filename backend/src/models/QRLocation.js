import mongoose from 'mongoose';

const qrLocationSchema = new mongoose.Schema({
  qrCodeId: { type: String, required: true, unique: true },
  locationId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export const QRLocation = mongoose.model('QRLocation', qrLocationSchema);
