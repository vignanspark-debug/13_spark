import React from 'react';
import { Navigation, Accessibility, AlertTriangle, X } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function NavigationView() {
  const { activeRoute, setActiveRoute, accessibilityMode, setAccessibilityMode, calculateRoute, startLocation, endLocation } = useCampus();

  if (!activeRoute) return null;

  const handleToggleAccessibility = () => {
    const nextMode = !accessibilityMode;
    setAccessibilityMode(nextMode);
    if (startLocation && endLocation) {
      calculateRoute(startLocation, endLocation, nextMode);
    }
  };

  return (
    <div className="glass-card p-5 rounded-3xl border border-sky-200 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase">Live Turn-by-Turn Navigation</h3>
            <p className="text-[10px] text-slate-500 font-medium">Dijkstra Shortest Path Engine</p>
          </div>
        </div>

        <button
          onClick={() => setActiveRoute(null)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
        <div>
          <div className="text-slate-500 text-[10px] uppercase font-bold">Route Metrics:</div>
          <div className="text-slate-900 font-extrabold text-sm flex items-center gap-2">
            <span>{activeRoute.totalDistance} meters</span>
            <span className="text-slate-400">•</span>
            <span className="text-sky-700">~{activeRoute.estimatedTimeMinutes} min walk</span>
          </div>
        </div>

        <button
          onClick={handleToggleAccessibility}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
            accessibilityMode
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Accessibility className="w-4 h-4" />
          <span>{accessibilityMode ? '♿ Accessible Mode ON' : 'Normal Mode'}</span>
        </button>
      </div>

      {/* Warning Detour Alert */}
      {activeRoute.warnings && activeRoute.warnings.length > 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs space-y-1">
          <div className="font-extrabold flex items-center gap-1.5 text-amber-800">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>⚠️ Route Changed / Detour Applied</span>
          </div>
          {activeRoute.warnings.map((w, idx) => (
            <p key={idx} className="text-[11px] text-amber-800 font-medium pl-5">• {w}</p>
          ))}
        </div>
      )}

      {/* Step by Step Instructions List */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {activeRoute.instructions.map((inst) => (
          <div
            key={inst.step}
            className={`p-3 rounded-2xl border flex items-start gap-3 text-xs font-medium transition ${
              inst.type === 'start'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                : inst.type === 'destination'
                ? 'bg-sky-50 border-sky-200 text-sky-900 font-bold'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-extrabold text-[10px] shrink-0 mt-0.5">
              {inst.step}
            </span>
            <div className="flex-1">
              <div>{inst.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
