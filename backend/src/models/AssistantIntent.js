import mongoose from 'mongoose';

const assistantIntentSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  keywords: [{ type: String }],
  recommendedLocationId: { type: String, required: true },
  reason: { type: String, required: true }
});

export const AssistantIntent = mongoose.model('AssistantIntent', assistantIntentSchema);
