import { isMongoConnected } from '../config/db.js';
import { Location } from '../models/Location.js';
import { PathModel } from '../models/Path.js';
import { inMemoryDB } from '../utils/seedData.js';

export async function calculateRoute(startId, endId, mode = 'normal') {
  let locations = [];
  let paths = [];

  if (isMongoConnected) {
    locations = await Location.find({});
    paths = await PathModel.find({});
  } else {
    locations = inMemoryDB.locations;
    paths = inMemoryDB.paths;
  }

  // Support both Location ID and QR Code ID
  const startLoc = locations.find(l => l.id === startId || l.qrCodeId === startId);
  const endLoc = locations.find(l => l.id === endId || l.qrCodeId === endId);

  if (!startLoc || !endLoc) {
    return {
      success: false,
      error: `Invalid location selection: Start (${startId}), End (${endId})`
    };
  }

  if (startLoc.id === endLoc.id) {
    return {
      success: true,
      startLocation: startLoc,
      destination: endLoc,
      totalDistance: 0,
      estimatedTimeMinutes: 0,
      pathNodes: [startLoc],
      pathEdges: [],
      instructions: [{ step: 1, text: `You are already at ${endLoc.name}.`, distance: 0, type: 'destination' }],
      warnings: [],
      mode
    };
  }

  // Gather ALL nodes (both location IDs and junction IDs)
  const nodeSet = new Set(locations.map(l => l.id));
  paths.forEach(edge => {
    nodeSet.add(edge.startLocationId);
    nodeSet.add(edge.endLocationId);
  });
  const nodes = Array.from(nodeSet);

  const graph = {};
  nodes.forEach(id => { graph[id] = []; });
  const warnings = [];

  const isAccessibleMode = mode === 'accessible';

  paths.forEach(edge => {
    // Exclude closed paths
    if (edge.status === 'closed') {
      warnings.push(`Path closed: ${edge.name} (${edge.closureReason || 'Maintenance'})`);
      return;
    }

    // Accessible mode filtering & weighting
    if (isAccessibleMode && edge.hasStairs) {
      warnings.push(`Avoided stairs on ${edge.name}`);
      return; // Skip stair paths in accessible mode
    }

    let weight = edge.distance;
    if (isAccessibleMode && (edge.accessible || edge.hasElevator)) {
      weight *= 0.85; // Favor accessible routes
    }

    graph[edge.startLocationId] = graph[edge.startLocationId] || [];
    graph[edge.endLocationId] = graph[edge.endLocationId] || [];

    graph[edge.startLocationId].push({ node: edge.endLocationId, weight, edge });
    graph[edge.endLocationId].push({ node: edge.startLocationId, weight, edge });
  });

  const distances = {};
  const previous = {};
  const previousEdge = {};
  const unvisited = new Set(nodes);

  nodes.forEach(id => {
    distances[id] = Infinity;
    previous[id] = null;
    previousEdge[id] = null;
  });

  distances[startLoc.id] = 0;

  while (unvisited.size > 0) {
    let currId = null;
    let minDist = Infinity;

    for (const nId of unvisited) {
      if (distances[nId] < minDist) {
        minDist = distances[nId];
        currId = nId;
      }
    }

    if (currId === null || minDist === Infinity || currId === endLoc.id) break;

    unvisited.delete(currId);

    const neighbors = graph[currId] || [];
    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor.node)) continue;
      const alt = distances[currId] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = currId;
        previousEdge[neighbor.node] = neighbor.edge;
      }
    }
  }

  if (distances[endLoc.id] === Infinity) {
    return {
      success: false,
      error: `No open ${isAccessibleMode ? 'accessible ' : ''}route available between ${startLoc.name} and ${endLoc.name} due to corridor closures.`
    };
  }

  const pathNodeIds = [];
  const pathEdges = [];
  let curr = endLoc.id;

  while (curr !== null) {
    pathNodeIds.unshift(curr);
    if (previousEdge[curr]) {
      pathEdges.unshift(previousEdge[curr]);
    }
    curr = previous[curr];
  }

  const pathNodes = pathNodeIds.map(nid => locations.find(l => l.id === nid) || { id: nid, name: nid.replace('junc_', 'Junction: ') });
  const totalDistance = pathEdges.reduce((sum, e) => sum + e.distance, 0);
  const estimatedTimeMinutes = Math.max(1, Math.round(totalDistance / 65));

  const instructions = [
    { step: 1, text: `Start navigation from ${startLoc.name}.`, distance: 0, type: 'start' }
  ];

  pathEdges.forEach((edge, idx) => {
    let note = `Walk along ${edge.name} (${edge.distance}m, ~${edge.walkingTime} min)`;
    if (edge.hasStairs) note += ' • [Stairs Involved]';
    if (edge.accessible) note += ' • [Wheelchair Accessible Ramp]';
    if (edge.hasElevator) note += ' • [Elevator Available]';

    instructions.push({
      step: idx + 2,
      text: note,
      distance: edge.distance,
      type: 'walk',
      edgeId: edge.id
    });
  });

  instructions.push({
    step: instructions.length + 1,
    text: `Arrived at destination: ${endLoc.name} (${endLoc.floor}).`,
    distance: 0,
    type: 'destination'
  });

  return {
    success: true,
    startLocation: startLoc,
    destination: endLoc,
    totalDistance,
    estimatedTimeMinutes,
    pathNodes,
    pathEdges,
    instructions,
    warnings: Array.from(new Set(warnings)),
    mode
  };
}
