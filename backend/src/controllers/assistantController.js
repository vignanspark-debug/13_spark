import { processAssistantQuery } from '../services/assistantService.js';

export const recommendAssistantFacility = async (req, res) => {
  try {
    const { query, currentLocationId } = req.body;
    const result = await processAssistantQuery(query, currentLocationId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
