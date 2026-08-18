import mongoose from 'mongoose';

const pathSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  startLocationId: { type: String, required: true },
  endLocationId: { type: String, required: true },
  distance: { type: Number, required: true },
  walkingTime: { type: Number, required: true },
  hasStairs: { type: Boolean, default: false },
  accessible: { type: Boolean, default: true },
  hasElevator: { type: Boolean, default: false },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  closureReason: { type: String, default: '' },
  description: { type: String, default: '' }
});

export const PathModel = mongoose.model('Path', pathSchema);
