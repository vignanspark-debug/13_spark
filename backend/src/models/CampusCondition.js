import mongoose from 'mongoose';

const campusConditionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // 'Closure', 'Maintenance', 'Event', 'Hazard'
  title: { type: String, required: true },
  description: { type: String, default: '' },
  affectedLocationId: { type: String, default: null },
  affectedPathId: { type: String, default: null },
  status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: null },
  createdBy: { type: String, default: 'Admin' },
  createdAt: { type: Date, default: Date.now }
});

export const CampusCondition = mongoose.model('CampusCondition', campusConditionSchema);
