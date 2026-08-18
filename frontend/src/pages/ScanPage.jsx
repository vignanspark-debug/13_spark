import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, CheckCircle2, ArrowRight, Camera } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function ScanPage() {
  const { locations, handleScanQRSuccess, startLocation } = useCampus();
  const [selectedQR, setSelectedQR] = useState('');
  const navigate = useNavigate();

  const handleConfirm = (qrCodeId) => {
    if (qrCodeId) {
      handleScanQRSuccess(qrCodeId);
      navigate('/map');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 py-8">
      <div className="glass-card p-8 rounded-3xl border border-emerald-200 space-y-5 text-center shadow-sm">
        <div className="p-4 w-fit mx-auto rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
          <QrCode className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900">Scan Campus QR Placement Tag</h1>
          <p className="text-xs text-slate-600 font-medium">
            Scan physical QR code tags on building entrances, library pillars, or corridor junctions to anchor your starting point.
          </p>
        </div>

        {startLocation && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Current Anchor: {startLocation.name}
            </span>
            <span className="font-mono text-[10px] bg-white px-2.5 py-0.5 rounded border border-emerald-300 text-emerald-700">
              {startLocation.qrCodeId || startLocation.qrCode}
            </span>
          </div>
        )}

        <div className="p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-emerald-300 space-y-3">
          <div className="w-28 h-28 mx-auto bg-emerald-100/80 rounded-2xl flex flex-col items-center justify-center text-emerald-700 font-mono text-[10px] border border-emerald-300 animate-pulse">
            <Camera className="w-12 h-12 mb-1" />
            <span className="font-bold uppercase">ALIGNED QR TAG</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Point phone camera at tag or select from simulator list below.</p>
        </div>

        <div className="space-y-2 text-left pt-2">
          <label className="text-[10px] font-black uppercase text-emerald-800">
            Simulator Placement Tag Selector:
          </label>
          <select
            value={selectedQR}
            onChange={(e) => {
              setSelectedQR(e.target.value);
              handleConfirm(e.target.value);
            }}
            className="w-full bg-white border border-slate-300 rounded-2xl p-3.5 text-xs text-slate-900 outline-none focus:border-emerald-500 font-medium shadow-xs"
          >
            <option value="">-- Select a campus placement tag --</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.qrCodeId || loc.qrCode || loc.id}>
                📷 {loc.name} ({loc.qrCodeId || loc.qrCode})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={() => navigate('/map')}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
          >
            <span>Proceed to Interactive Campus Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
