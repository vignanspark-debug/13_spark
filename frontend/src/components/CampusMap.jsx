import React from 'react';
import { MapPin, Navigation, Lock, AlertTriangle, Layers } from 'lucide-react';

export default function CampusMap({ 
  locations = [], 
  nodes = [], 
  edges = [], 
  startLocation, 
  endLocation, 
  activeRoute, 
  onSelectLocation 
}) {
  const activeEdgeIds = new Set(activeRoute?.pathEdges?.map(e => e.id) || []);

  const getNodeCoords = (locId) => {
    const loc = locations.find(l => l.id === locId);
    if (loc && loc.coordinates) return { x: loc.coordinates.x, y: loc.coordinates.y };

    const junctionCoords = {
      'junc_west_walkway': { x: 200, y: 470 },
      'junc_north_corridor': { x: 360, y: 260 },
      'junc_central_quad': { x: 440, y: 350 },
      'junc_east_corridor': { x: 620, y: 450 },
      'junc_south_avenue': { x: 500, y: 580 },
      'junc_sports_lane': { x: 700, y: 260 }
    };
    return junctionCoords[locId] || { x: 400, y: 400 };
  };

  return (
    <div className="glass-card p-4 rounded-3xl border border-slate-200 shadow-sm relative flex flex-col h-full min-h-[520px]">
      {/* Map Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Interactive Campus Network Map</h3>
            <p className="text-[10px] text-slate-500 font-medium">Real-time Dijkstra Navigation & Path Status Overlay</p>
          </div>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-700 font-extrabold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Open Path
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Closed Corridor
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping inline-block"></span> Active Route
          </span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="flex-1 relative w-full h-full min-h-[440px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 my-3">
        <svg viewBox="0 0 920 660" className="w-full h-full object-contain select-none">
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Render All Edges/Paths */}
          {edges.map((edge) => {
            const p1 = getNodeCoords(edge.from || edge.startLocationId);
            const p2 = getNodeCoords(edge.to || edge.endLocationId);
            const isClosed = edge.isClosed || edge.status === 'closed';
            const isActiveRouteEdge = activeEdgeIds.has(edge.id);

            return (
              <g key={edge.id}>
                {/* Base Edge Line */}
                <line
                  x1={p1.x} y1={p1.y}
                  x2={p2.x} y2={p2.y}
                  stroke={
                    isClosed
                      ? '#f43f5e'
                      : isActiveRouteEdge
                      ? '#38bdf8'
                      : '#334155'
                  }
                  strokeWidth={isActiveRouteEdge ? 6 : isClosed ? 3 : 2}
                  strokeDasharray={isClosed ? '6 4' : 'none'}
                  opacity={isClosed ? 0.8 : isActiveRouteEdge ? 1 : 0.6}
                />

                {/* Animated Glowing Active Route Edge */}
                {isActiveRouteEdge && (
                  <line
                    x1={p1.x} y1={p1.y}
                    x2={p2.x} y2={p2.y}
                    stroke="#00f0ff"
                    strokeWidth={4}
                    className="animate-route-pulse"
                  />
                )}

                {/* Closed Lock Icon Indicator */}
                {isClosed && (
                  <circle
                    cx={(p1.x + p2.x) / 2}
                    cy={(p1.y + p2.y) / 2}
                    r={9}
                    fill="#881337"
                    stroke="#f43f5e"
                    strokeWidth={1.5}
                  />
                )}
              </g>
            );
          })}

          {/* Render All Campus Location Nodes */}
          {locations.map((loc) => {
            const coords = loc.coordinates || { x: 100, y: 100 };
            const isStart = startLocation?.id === loc.id;
            const isEnd = endLocation?.id === loc.id;

            return (
              <g
                key={loc.id}
                transform={`translate(${coords.x}, ${coords.y})`}
                className="cursor-pointer group"
                onClick={() => onSelectLocation && onSelectLocation(loc)}
              >
                {/* Outer Glow Halo for Start / End Anchors */}
                {(isStart || isEnd) && (
                  <circle
                    r={22}
                    fill={isStart ? 'rgba(16, 185, 129, 0.3)' : 'rgba(56, 189, 248, 0.35)'}
                    className="animate-ping"
                  />
                )}

                {/* Node Main Circle */}
                <circle
                  r={isStart || isEnd ? 14 : 10}
                  fill={
                    isStart
                      ? '#10b981'
                      : isEnd
                      ? '#38bdf8'
                      : '#1e293b'
                  }
                  stroke={
                    isStart
                      ? '#34d399'
                      : isEnd
                      ? '#7dd3fc'
                      : '#475569'
                  }
                  strokeWidth={2.5}
                  className="transition group-hover:scale-125"
                />

                {/* Node Label Text */}
                <text
                  y={isStart || isEnd ? 26 : 22}
                  textAnchor="middle"
                  fill={isStart ? '#34d399' : isEnd ? '#7dd3fc' : '#cbd5e1'}
                  fontSize={isStart || isEnd ? 11 : 9}
                  fontWeight={isStart || isEnd ? '800' : '600'}
                  className="pointer-events-none drop-shadow-md"
                >
                  {(() => {
                    const name = loc.name || '';
                    if (name.includes('Main Gate')) return 'Main Gate';
                    if (name.includes('Administration')) return 'Admin Block';
                    if (name.includes('CSE')) return 'CSE Block';
                    if (name.includes('Library')) return 'Central Library';
                    if (name.includes('Canteen')) return 'Canteen';
                    if (name.includes('Hostel')) return 'Hostel';
                    if (name.includes('Auditorium')) return 'Auditorium';
                    if (name.includes('Health') || name.includes('Medical')) return 'Health Center';
                    if (name.includes('Sports')) return 'Sports Field';
                    if (name.includes('Parking')) return 'Parking';
                    return name.split(' ')[0];
                  })()}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Active Route Quick Info Banner */}
        {activeRoute && (
          <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 p-3 rounded-2xl border border-sky-500/40 shadow-xl flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                <Navigation className="w-4 h-4 animate-bounce" />
              </span>
              <div>
                <div className="font-extrabold text-white">Route: {activeRoute.startLocation.name} → {activeRoute.destination.name}</div>
                <div className="text-[11px] text-slate-300">Distance: <strong>{activeRoute.totalDistance}m</strong> • ETA: ~<strong>{activeRoute.estimatedTimeMinutes} min walk</strong></div>
              </div>
            </div>

            {activeRoute.warnings && activeRoute.warnings.length > 0 && (
              <div className="text-[10px] text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800 flex items-center gap-1 font-bold">
                <AlertTriangle className="w-3 h-3" />
                <span>Detour Applied</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
