import assert from 'assert';
import { connectDB, isMongoConnected } from './src/config/db.js';
import { calculateRoute } from './src/services/dijkstraService.js';
import { processAssistantQuery } from './src/services/assistantService.js';

async function runTests() {
  console.log('--- RUNNING CAMPUS PULSE MONOREPO BACKEND TESTS ---');
  await connectDB();

  // Test 1: Dijkstra Route
  const route = await calculateRoute('loc_main_gate', 'loc_library', 'normal');
  assert.strictEqual(route.success, true, 'Normal Dijkstra route should succeed');
  assert.strictEqual(route.startLocation.id, 'loc_main_gate');
  assert.strictEqual(route.destination.id, 'loc_library');
  assert.ok(route.totalDistance > 0, 'Distance should be greater than 0');
  console.log(`✓ Test 1 Passed: Normal Route (${route.totalDistance}m, ~${route.estimatedTimeMinutes} min)`);

  // Test 2: Accessible Mode Routing
  const accessRoute = await calculateRoute('loc_main_gate', 'loc_library', 'accessible');
  assert.strictEqual(accessRoute.success, true);
  assert.strictEqual(accessRoute.mode, 'accessible');
  console.log('✓ Test 2 Passed: Accessible Mode Navigation');

  // Test 3: QR Anchor Code Route
  const qrRoute = await calculateRoute('QR_MAIN_GATE_01', 'QR_LIBRARY_04', 'normal');
  assert.strictEqual(qrRoute.success, true);
  assert.strictEqual(qrRoute.startLocation.id, 'loc_main_gate');
  console.log('✓ Test 3 Passed: QR Anchor Code Resolution in Navigation');

  // Test 4: AI Need-Based Assistant Query
  const assistRes = await processAssistantQuery('I need a quiet place to study', 'loc_main_gate');
  assert.strictEqual(assistRes.success, true);
  assert.strictEqual(assistRes.primaryRecommendation.id, 'loc_library');
  assert.ok(assistRes.distance > 0);
  console.log(`✓ Test 4 Passed: AI Assistant Intent Match ('quiet study' -> ${assistRes.primaryRecommendation.name})`);

  console.log('====================================================');
  console.log(' ALL BACKEND TESTS PASSED (100%)');
  console.log('====================================================');
}

runTests().catch(err => {
  console.error('❌ Backend test failed:', err);
  process.exit(1);
});
