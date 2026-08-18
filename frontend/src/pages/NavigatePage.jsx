import React from 'react';
import { useCampus } from '../context/CampusContext';
import CampusMap from '../components/CampusMap';
import NavigationView from '../components/NavigationView';
import { Navigation, MapPin } from 'lucide-react';

export default function NavigatePage() {
  const { 
    locations, nodes, edges, startLocation, setStartLocation, 
    endLocation, setEndLocation, activeRoute, calculateRoute 
  } = useCampus();

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-white">Campus Navigation Dashboard</h1>
        <p className="text-xs text-slate-400">Calculate shortest Dijkstra paths, handle wheelchair accessibility, and dynamically bypass closed corridors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Controls & Step by Step */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-4 rounded-2xl border border-sky-500/30 space-y-3">
            {/* Start Anchor */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-emerald-400">Current Start Anchor Location:</label>
              <select
                value={startLocation?.id || ''}
                onChange={(e) => {
                  const loc = locations.find(l => l.id === e.target.value);
                  setStartLocation(loc);
                  if (loc && endLocation) calculateRoute(loc, endLocation);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-emerald-400 outline-none"
              >
                <option value="">-- Pick starting location --</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>📍 {loc.name}</option>
                ))}
              </select>
            </div>

            {/* Target Destination */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-sky-400">Target Destination Location:</label>
              <select
                value={endLocation?.id || ''}
                onChange={(e) => {
                  const loc = locations.find(l => l.id === e.target.value);
                  setEndLocation(loc);
                  if (startLocation && loc) calculateRoute(startLocation, loc);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 outline-none"
              >
                <option value="">-- Pick destination --</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>🎯 {loc.name}</option>
                ))}
              </select>
            </div>
          </div>

          {activeRoute && <NavigationView />}
        </div>

        {/* Right Column: Campus Map */}
        <div className="lg:col-span-8 min-h-[480px]">
          <CampusMap
            locations={locations}
            nodes={nodes}
            edges={edges}
            startLocation={startLocation}
            endLocation={endLocation}
            activeRoute={activeRoute}
          />
        </div>
      </div>
    </div>
  );
}
