import React from 'react';
import { X, MapPin, Clock, Phone, QrCode, CheckCircle2, Navigation, Building } from 'lucide-react';

export default function LocationDetailsModal({ 
  location, 
  onClose, 
  onSetAsCurrentLocation, 
  onNavigateTo 
}) {
  if (!location) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">{location.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                  {location.status || 'Open'}
                </span>
              </div>
              <p className="text-xs text-sky-400 font-bold">{location.category} • {location.floor}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
          {location.description || 'Primary campus facility providing services to students and faculty.'}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Operating Hours
            </span>
            <span className="text-white font-bold">{location.openingHours || location.hours || '8:00 AM – 8:00 PM'}</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 mb-1">
              <QrCode className="w-3.5 h-3.5 text-purple-400" /> QR Placement Code
            </span>
            <span className="font-mono text-purple-300 font-bold">{location.qrCodeId || location.qrCode}</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 col-span-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 mb-1">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> Contact & Helpdesk
            </span>
            <span className="text-slate-200">{location.contact || 'Help Desk: Ext 101'}</span>
          </div>
        </div>

        {/* Facilities & Accessibility */}
        <div className="space-y-2 text-xs">
          <div>
            <h4 className="text-[10px] text-slate-400 font-bold uppercase mb-1">Available Facilities</h4>
            <div className="flex flex-wrap gap-1.5">
              {(location.facilities || []).map((fac, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-[11px]">
                  ✓ {fac}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] text-slate-400 font-bold uppercase mb-1">Accessibility Features</h4>
            <div className="flex flex-wrap gap-1.5">
              {(location.accessibility || []).map((acc, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-[11px] font-bold">
                  ♿ {acc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={() => {
              if (onSetAsCurrentLocation) onSetAsCurrentLocation(location);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-slate-700"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Set as Start Anchor</span>
          </button>

          <button
            onClick={() => {
              if (onNavigateTo) onNavigateTo(location);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-sky-500/25 transition"
          >
            <Navigation className="w-4 h-4" />
            <span>Navigate Here</span>
          </button>
        </div>
      </div>
    </div>
  );
}
