import React, { createContext, useState, useEffect, useContext } from 'react';
import { locationsAPI, qrAPI, navigationAPI, assistantAPI, networkAPI, conditionsAPI } from '../services/api';

const CampusContext = createContext(null);

export function CampusProvider({ children }) {
  const [locations, setLocations] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [conditions, setConditions] = useState([]);

  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const [assistantResult, setAssistantResult] = useState(null);
  const [inspectLocation, setInspectLocation] = useState(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchNetworkData();
  }, []);

  const fetchNetworkData = async () => {
    try {
      setLoading(true);
      const [locRes, netRes, condRes] = await Promise.all([
        locationsAPI.getAll(),
        networkAPI.getNetwork(),
        conditionsAPI.getAll().catch(() => ({ data: [] }))
      ]);

      if (locRes.success) {
        setLocations(locRes.data);
        if (!startLocation && locRes.data.length > 0) {
          const mg = locRes.data.find(l => l.id === 'loc_main_gate') || locRes.data[0];
          setStartLocation(mg);
        }
      }

      if (netRes.success) {
        setNodes(netRes.nodes || []);
        setEdges(netRes.edges || []);
      }

      if (condRes.success) {
        setConditions(condRes.data || []);
      }
    } catch (e) {
      console.error('Failed to fetch network data:', e);
    } finally {
      setLoading(false);
    }
  };

  const calculateRoute = async (start, end, isAccessible = accessibilityMode) => {
    if (!start || !end) return;
    const startId = typeof start === 'string' ? start : start.id;
    const endId = typeof end === 'string' ? end : end.id;

    try {
      setLoading(true);
      const mode = isAccessible ? 'accessible' : 'normal';
      const data = await navigationAPI.getRoute(startId, endId, mode);
      if (data.success) {
        setActiveRoute(data);
        setStatusMessage(`Navigation calculated: ${data.totalDistance}m (~${data.estimatedTimeMinutes} min walk)`);
      } else {
        setActiveRoute(null);
        alert(`Navigation Notice: ${data.error}`);
      }
    } catch (e) {
      console.error('Route calculation error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleAskAssistant = async (queryText) => {
    try {
      setLoading(true);
      const data = await assistantAPI.recommend(queryText, startLocation?.id);
      setAssistantResult(data);
      if (data.success && data.primaryRecommendation) {
        const rec = data.primaryRecommendation;
        setEndLocation(rec);
        setStatusMessage(`Assistant recommended ${rec.name}`);
        const currentStart = startLocation || (locations.length > 0 ? locations[0] : null);
        if (currentStart) {
          if (!startLocation) setStartLocation(currentStart);
          await calculateRoute(currentStart, rec);
        }
      }
    } catch (e) {
      console.error('Assistant error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleScanQRSuccess = async (qrCode) => {
    setShowQRScanner(false);
    try {
      setLoading(true);
      const data = await qrAPI.getAnchoredLocation(qrCode);
      if (data.success && data.currentLocation) {
        setStartLocation(data.currentLocation);
        setStatusMessage(`QR Anchored to ${data.currentLocation.name}`);
        if (endLocation) calculateRoute(data.currentLocation, endLocation);
      } else {
        alert(`QR Code error: ${data.message || 'Unknown QR tag'}`);
      }
    } catch (e) {
      console.error('QR Scan error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePathClosed = async (edgeId, isClosed) => {
    try {
      setLoading(true);
      const data = await networkAPI.togglePath(edgeId, isClosed, isClosed ? 'Closed for maintenance' : '');
      if (data.success) {
        await fetchNetworkData();
        if (startLocation && endLocation) {
          calculateRoute(startLocation, endLocation);
        }
      }
    } catch (e) {
      console.error('Toggle error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleResetDatabase = async () => {
    try {
      setLoading(true);
      await networkAPI.resetDatabase();
      await fetchNetworkData();
      setActiveRoute(null);
      setEndLocation(null);
      setAssistantResult(null);
      setCurrentScene(0);
      setStatusMessage('Campus database reset to initial hackathon defaults.');
    } catch (e) {
      console.error('Reset error:', e);
    } finally {
      setLoading(false);
    }
  };

  // Hackathon 10-Scene Story Simulator
  const handleSelectScene = async (sceneId) => {
    setCurrentScene(sceneId);
    const mg = locations.find(l => l.id === 'loc_main_gate');
    const lib = locations.find(l => l.id === 'loc_library');
    const canteen = locations.find(l => l.id === 'loc_canteen');

    if (sceneId === 1) {
      if (mg) handleScanQRSuccess(mg.qrCodeId || 'QR_MAIN_GATE_01');
    } else if (sceneId === 2) {
      if (mg) { setStartLocation(mg); setInspectLocation(mg); }
    } else if (sceneId === 3) {
      handleAskAssistant("I need a quiet place to study");
    } else if (sceneId === 4) {
      if (lib) {
        setAssistantResult({
          success: true,
          query: "I need a quiet place to study",
          confidenceScore: 0.95,
          primaryRecommendation: lib,
          explanation: "Central Library features quiet reading halls, private study booths, and digital research terminals."
        });
      }
    } else if (sceneId === 5 || sceneId === 6) {
      if (mg && lib) { setStartLocation(mg); setEndLocation(lib); calculateRoute(mg, lib, false); }
    } else if (sceneId === 7) {
      if (mg && lib) { setStartLocation(mg); setEndLocation(lib); setAccessibilityMode(true); calculateRoute(mg, lib, true); }
    } else if (sceneId === 8 || sceneId === 9 || sceneId === 10) {
      if (lib && canteen) {
        setStartLocation(lib); setEndLocation(canteen);
        const eastEdge = edges.find(e => e.id === 'edge_east_corridor_library_canteen');
        if (eastEdge && !eastEdge.isClosed) {
          await handleTogglePathClosed(eastEdge.id, true);
        }
        calculateRoute(lib, canteen, false);
      }
    }
  };

  return (
    <CampusContext.Provider value={{
      locations, nodes, edges, conditions,
      startLocation, setStartLocation,
      endLocation, setEndLocation,
      activeRoute, setActiveRoute,
      accessibilityMode, setAccessibilityMode,
      assistantResult, setAssistantResult,
      inspectLocation, setInspectLocation,
      showQRScanner, setShowQRScanner,
      currentScene, setCurrentScene,
      loading, statusMessage, setStatusMessage,
      fetchNetworkData, calculateRoute,
      handleAskAssistant, handleScanQRSuccess,
      handleTogglePathClosed, handleResetDatabase,
      handleSelectScene
    }}>
      {children}
    </CampusContext.Provider>
  );
}

export function useCampus() {
  return useContext(CampusContext);
}
