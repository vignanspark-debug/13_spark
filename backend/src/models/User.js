import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user', 'student', 'faculty'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
