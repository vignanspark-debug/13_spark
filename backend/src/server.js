import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, isMongoConnected } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import qrRoutes from './routes/qrRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import pathRoutes from './routes/pathRoutes.js';
import navigationRoutes from './routes/navigationRoutes.js';
import conditionRoutes from './routes/conditionRoutes.js';
import assistantRoutes from './routes/assistantRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { inMemoryDB, INITIAL_LOCATIONS, INITIAL_PATHS } from './utils/seedData.js';
import { Location } from './models/Location.js';
import { PathModel } from './models/Path.js';
import { calculateRoute } from './services/dijkstraService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/paths', pathRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/conditions', conditionRoutes);
app.use('/api/assistant', assistantRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Campus Pulse Express REST API',
    database: isMongoConnected ? 'MongoDB Mongoose' : 'In-Memory Fallback',
    timestamp: new Date().toISOString()
  });
});

// Legacy Network Graph Route Alias
app.get('/api/network', async (req, res) => {
  let locations = [];
  let paths = [];
  if (isMongoConnected) {
    locations = await Location.find({});
    paths = await PathModel.find({});
  } else {
    locations = inMemoryDB.locations;
    paths = inMemoryDB.paths;
  }

  const nodes = locations.map(l => ({
    id: `node_${l.id}`,
    locationId: l.id,
    label: l.name,
    x: l.coordinates?.x || 100,
    y: l.coordinates?.y || 100
  }));

  const edges = paths.map(p => ({
    id: p.id,
    from: p.startLocationId,
    to: p.endLocationId,
    distance: p.distance,
    name: p.name,
    hasStairs: Boolean(p.hasStairs),
    hasRamp: Boolean(p.accessible),
    hasElevator: Boolean(p.hasElevator),
    isClosed: p.status === 'closed',
    closureReason: p.closureReason || ''
  }));

  res.json({ success: true, nodes, edges, notices: [] });
});

// Legacy Route Aliases
app.post('/api/navigate', async (req, res) => {
  const { startLocationId, endLocationId, accessibilityMode = false } = req.body;
  const mode = accessibilityMode ? 'accessible' : 'normal';
  const result = await calculateRoute(startLocationId, endLocationId, mode);
  res.json(result);
});

app.patch('/api/admin/paths/:edgeId/toggle', async (req, res) => {
  const { edgeId } = req.params;
  const { isClosed, closureReason = '' } = req.body;
  const nextStatus = isClosed ? 'closed' : 'open';

  if (isMongoConnected) {
    await PathModel.findOneAndUpdate({ id: edgeId }, { status: nextStatus, closureReason: isClosed ? closureReason : '' });
  } else {
    const idx = inMemoryDB.paths.findIndex(p => p.id === edgeId);
    if (idx !== -1) {
      inMemoryDB.paths[idx].status = nextStatus;
      inMemoryDB.paths[idx].closureReason = isClosed ? closureReason : '';
    }
  }

  res.json({ success: true, edgeId, isClosed: Boolean(isClosed) });
});

app.put('/api/admin/locations/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (isMongoConnected) {
    const updated = await Location.findOneAndUpdate({ id }, updates, { new: true });
    return res.json({ success: true, data: updated });
  } else {
    const idx = inMemoryDB.locations.findIndex(l => l.id === id);
    if (idx !== -1) {
      inMemoryDB.locations[idx] = { ...inMemoryDB.locations[idx], ...updates };
      return res.json({ success: true, data: inMemoryDB.locations[idx] });
    }
    return res.status(404).json({ success: false, message: 'Location not found' });
  }
});

app.post('/api/admin/reset', async (req, res) => {
  inMemoryDB.reset();
  res.json({ success: true, message: 'Campus database reset to initial defaults.' });
});

// Error Middleware
app.use(errorHandler);

// Serve static frontend build in production
const publicDir = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(publicDir));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(publicDir, 'index.html'), (err) => {
    if (err) {
      res.json({ message: 'Campus Pulse Backend Running. API online at /api' });
    }
  });
});

async function startServer() {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`CAMPUS PULSE EXPRESS REST API ONLINE ON PORT ${PORT}`);
    console.log(`Open API: http://localhost:${PORT}/api/locations`);
    console.log(`====================================================`);
  });
  connectDB();
}

startServer();
