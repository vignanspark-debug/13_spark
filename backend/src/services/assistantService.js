import { isMongoConnected } from '../config/db.js';
import { AssistantIntent } from '../models/AssistantIntent.js';
import { Location } from '../models/Location.js';
import { inMemoryDB } from '../utils/seedData.js';
import { calculateRoute } from './dijkstraService.js';

export async function processAssistantQuery(query, currentLocationId = null) {
  if (!query || typeof query !== 'string') {
    return { success: false, message: 'Please provide a valid query string.' };
  }

  const queryLower = query.toLowerCase();
  let intents = [];
  let locations = [];

  if (isMongoConnected) {
    intents = await AssistantIntent.find({});
    locations = await Location.find({});
  } else {
    intents = inMemoryDB.intents;
    locations = inMemoryDB.locations;
  }

  const scoredIntents = intents.map(intent => {
    let score = 0;
    const kws = intent.keywords || [];
    kws.forEach(kw => {
      if (queryLower.includes(kw.toLowerCase())) {
        score += 2;
      }
    });
    return { score, intent };
  });

  scoredIntents.sort((a, b) => b.score - a.score);
  const topMatch = scoredIntents[0];

  let targetLoc;
  let detectedIntent;
  let confidenceScore;
  let explanation;

  if (!topMatch || topMatch.score === 0) {
    targetLoc = locations.find(l => l.id === 'loc_library') || locations[0];
    detectedIntent = 'general';
    confidenceScore = 0.70;
    explanation = 'I recommend Central Library for campus assistance, quiet study, or info desk services.';
  } else {
    targetLoc = locations.find(l => l.id === topMatch.intent.recommendedLocationId) || locations[0];
    detectedIntent = topMatch.intent.category;
    confidenceScore = Math.min(0.98, Number((0.65 + topMatch.score * 0.12).toFixed(2)));
    explanation = topMatch.intent.reason;
  }

  const response = {
    success: true,
    query,
    detectedIntent,
    confidenceScore,
    primaryRecommendation: targetLoc,
    explanation,
    destination: targetLoc
  };

  if (currentLocationId && targetLoc && currentLocationId !== targetLoc.id) {
    try {
      const routeRes = await calculateRoute(currentLocationId, targetLoc.id);
      if (routeRes.success) {
        response.distance = routeRes.totalDistance;
        response.estimatedTimeMinutes = routeRes.estimatedTimeMinutes;
        response.routeInstructions = routeRes.instructions;
      }
    } catch (e) {
      // Ignore route errors in assistant response
    }
  }

  return response;
}
