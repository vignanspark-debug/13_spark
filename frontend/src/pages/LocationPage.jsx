import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building, MapPin, Clock, Phone, QrCode, Navigation, ArrowLeft } from 'lucide-react';
import { locationsAPI } from '../services/api';
import { useCampus } from '../context/CampusContext';

export default function LocationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setStartLocation, setEndLocation, calculateRoute, startLocation } = useCampus();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    locationsAPI.getById(id)
      .then(res => {
        if (res.success) setLocation(res.data);
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center text-xs text-slate-400">Loading location specs...</div>;
  if (!location) return <div className="p-8 text-center text-xs text-rose-400">Location not found.</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="glass-panel p-6 rounded-3xl border border-sky-500/30 space-y-5">
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Building className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">{location.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                  {location.status || 'Open'}
                </span>
              </div>
              <p className="text-xs text-sky-400 font-bold">{location.category} • {location.floor}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {location.description || 'Primary campus facility equipped with modern infrastructure and student services.'}
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Operating Hours
            </span>
            <span className="text-white font-bold">{location.openingHours || location.hours || '8:00 AM – 8:00 PM'}</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 mb-1">
              <QrCode className="w-3.5 h-3.5 text-purple-400" /> Placement Tag Code
            </span>
            <span className="font-mono text-purple-300 font-bold">{location.qrCodeId || location.qrCode}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => {
              setStartLocation(location);
              navigate('/map');
            }}
            className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Set as Start Anchor</span>
          </button>

          <button
            onClick={() => {
              setEndLocation(location);
              if (startLocation) calculateRoute(startLocation, location);
              navigate('/navigate');
            }}
            className="flex-1 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-sky-500/25 transition"
          >
            <Navigation className="w-4 h-4" />
            <span>Navigate Here</span>
          </button>
        </div>
      </div>
    </div>
  );
}
