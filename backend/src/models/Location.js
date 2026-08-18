import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  building: { type: String, default: '' },
  floor: { type: String, default: 'Ground Floor' },
  coordinates: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    lat: { type: Number, default: 12.9716 },
    lng: { type: Number, default: 77.5946 }
  },
  entrance: { type: String, default: 'Main Gate Entrance' },
  facilities: [{ type: String }],
  openingHours: { type: String, default: '9:00 AM – 5:00 PM' },
  accessibility: [{ type: String }],
  contact: { type: String, default: '' },
  status: { type: String, enum: ['Open', 'Closed', 'Maintenance'], default: 'Open' },
  qrCodeId: { type: String, default: '' },
  buildingCode: { type: String, default: '' },
  icon: { type: String, default: 'MapPin' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Location = mongoose.model('Location', locationSchema);
