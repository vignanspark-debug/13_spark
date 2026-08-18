import React from 'react';
import CampusMap from '../components/CampusMap';
import LocationDetailsModal from '../components/LocationDetailsModal';
import NavigationView from '../components/NavigationView';
import NeedAssistant from '../components/NeedAssistant';
import { useCampus } from '../context/CampusContext';
import { MapPin, Navigation } from 'lucide-react';

export default function MapPage() {
  const { 
    locations, nodes, edges, startLocation, setStartLocation, 
    endLocation, setEndLocation, activeRoute, inspectLocation, 
    setInspectLocation, calculateRoute, setShowQRScanner 
  } = useCampus();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-4 min-h-[75vh]">
      {/* Left Control Column */}
      <div className="lg:col-span-4 space-y-4">
        {/* QR Anchor Selector Card */}
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              QR Location Anchor
            </span>

            <button
              onClick={() => setShowQRScanner(true)}
              className="text-[11px] text-sky-400 hover:underline font-bold"
            >
              Scan QR Anchor
            </button>
          </div>

          {startLocation ? (
            <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-white">{startLocation.name}</h3>
                <p className="text-[11px] text-slate-400">{startLocation.category} • {startLocation.floor}</p>
              </div>
              <span className="px-2 py-1 rounded-lg bg-purple-950 border border-purple-800 text-purple-300 font-mono text-[10px] font-bold">
                {startLocation.qrCodeId || startLocation.qrCode}
              </span>
            </div>
          ) : (
            <div className="p-3 text-xs text-slate-400 italic">No starting QR anchor set.</div>
          )}

          {/* Destination Picker */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Target Destination:</label>
            <select
              value={endLocation?.id || ''}
              onChange={(e) => {
                const loc = locations.find(l => l.id === e.target.value);
                setEndLocation(loc);
                if (startLocation && loc) {
                  calculateRoute(startLocation, loc);
                }
              }}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 outline-none"
            >
              <option value="">-- Pick a target location --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Turn-By-Turn Navigation View */}
        {activeRoute && <NavigationView />}

        {/* Assistant Widget */}
        <NeedAssistant />
      </div>

      {/* Right Column: Campus Interactive Map */}
      <div className="lg:col-span-8 min-h-[500px]">
        <CampusMap 
          locations={locations}
          nodes={nodes}
          edges={edges}
          startLocation={startLocation}
          endLocation={endLocation}
          activeRoute={activeRoute}
          onSelectLocation={(loc) => setInspectLocation(loc)}
        />
      </div>

      {/* Inspection Modal */}
      {inspectLocation && (
        <LocationDetailsModal 
          location={inspectLocation}
          onClose={() => setInspectLocation(null)}
          onSetAsCurrentLocation={(loc) => setStartLocation(loc)}
          onNavigateTo={(loc) => {
            setEndLocation(loc);
            if (startLocation) calculateRoute(startLocation, loc);
          }}
        />
      )}
    </div>
  );
}
