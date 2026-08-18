import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB, isMongoConnected } from '../backend/src/config/db.js';
import { User } from '../backend/src/models/User.js';
import { Location } from '../backend/src/models/Location.js';
import { QRLocation } from '../backend/src/models/QRLocation.js';
import { PathModel } from '../backend/src/models/Path.js';
import { Facility } from '../backend/src/models/Facility.js';
import { CampusCondition } from '../backend/src/models/CampusCondition.js';
import { AssistantIntent } from '../backend/src/models/AssistantIntent.js';
import { 
  INITIAL_LOCATIONS, INITIAL_QRS, INITIAL_PATHS, 
  INITIAL_INTENTS, INITIAL_FACILITIES, INITIAL_CONDITIONS, inMemoryDB 
} from '../backend/src/utils/seedData.js';

dotenv.config({ path: '../backend/.env' });

async function runSeed() {
  console.log('--- CAMPUS PULSE DATABASE SEED SCRIPT ---');
  await connectDB();

  if (isMongoConnected) {
    console.log('[MongoDB] Clearing existing collections...');
    await User.deleteMany({});
    await Location.deleteMany({});
    await QRLocation.deleteMany({});
    await PathModel.deleteMany({});
    await Facility.deleteMany({});
    await CampusCondition.deleteMany({});
    await AssistantIntent.deleteMany({});

    console.log('[MongoDB] Seeding admin user...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'System Administrator',
      email: 'admin@campus.edu',
      passwordHash,
      role: 'admin'
    });

    console.log(`[MongoDB] Inserting ${INITIAL_LOCATIONS.length} campus locations...`);
    await Location.insertMany(INITIAL_LOCATIONS);

    console.log(`[MongoDB] Inserting ${INITIAL_QRS.length} QR anchors...`);
    await QRLocation.insertMany(INITIAL_QRS);

    console.log(`[MongoDB] Inserting ${INITIAL_PATHS.length} navigation paths...`);
    await PathModel.insertMany(INITIAL_PATHS);

    console.log(`[MongoDB] Inserting ${INITIAL_FACILITIES.length} facilities...`);
    await Facility.insertMany(INITIAL_FACILITIES);

    console.log(`[MongoDB] Inserting ${INITIAL_CONDITIONS.length} campus conditions...`);
    await CampusCondition.insertMany(INITIAL_CONDITIONS);

    console.log(`[MongoDB] Inserting ${INITIAL_INTENTS.length} assistant intents...`);
    await AssistantIntent.insertMany(INITIAL_INTENTS);

    console.log('✅ [MongoDB] Database seeded successfully!');
  } else {
    inMemoryDB.reset();
    console.log('✅ [Fallback Datastore] In-Memory Campus Database initialized with hackathon default data!');
  }

  process.exit(0);
}

runSeed().catch(err => {
  console.error('❌ Seed script error:', err);
  process.exit(1);
});
