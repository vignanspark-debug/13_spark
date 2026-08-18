import mongoose from 'mongoose';
import { seedInitialData } from '../utils/seedData.js';

export let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_pulse';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected to database server: ${conn.connection.host}/${conn.connection.name}`);
    await seedInitialData();
  } catch (err) {
    isMongoConnected = false;
    console.warn(`[MongoDB Notice] Connection status (${err.message}).`);
    console.warn(`[Fallback Datastore] Activating high-performance in-memory datastore fallback.`);
  }
};
