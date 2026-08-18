import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  locationId: { type: String, required: true },
  description: { type: String, default: '' },
  facilities: [{ type: String }],
  openingHours: { type: String, default: '8:00 AM - 8:00 PM' },
  accessibility: [{ type: String }],
  status: { type: String, default: 'Open' },
  contact: { type: String, default: '' }
});

export const Facility = mongoose.model('Facility', facilitySchema);
