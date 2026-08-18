import { calculateRoute } from '../services/dijkstraService.js';

export const getNavigationRoute = async (req, res) => {
  try {
    const { currentLocation, destination, mode = 'normal', startLocationId, endLocationId } = req.body;
    const start = currentLocation || startLocationId;
    const end = destination || endLocationId;

    if (!start || !end) {
      return res.status(400).json({ success: false, message: 'currentLocation and destination are required' });
    }

    const result = await calculateRoute(start, end, mode);
    if (!result.success) {
      return res.status(400).json(result);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
