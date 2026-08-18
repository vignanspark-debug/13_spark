import React, { useState } from 'react';
import { X, QrCode, Camera } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function QRScannerModal({ locations = [], onClose, onScanSuccess }) {
  const { handleScanQRSuccess } = useCampus();
  const [selectedQR, setSelectedQR] = useState('');

  const handleSelectQR = (qrCodeId) => {
    if (onScanSuccess) onScanSuccess(qrCodeId);
    else handleScanQRSuccess(qrCodeId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-md p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Scan Campus Placement QR</h3>
              <p className="text-[11px] text-slate-500 font-medium">Anchor your starting location</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Scanner Mock */}
        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-emerald-300 text-center space-y-3">
          <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-2xl flex flex-col items-center justify-center text-emerald-700 font-mono text-[9px] border border-emerald-300 animate-pulse">
            <Camera className="w-10 h-10 mb-1" />
            <span className="font-bold uppercase">Align QR Code</span>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            Point phone camera at any QR tag installed on campus walls or entrance pillars.
          </p>
        </div>

        {/* Quick Demo Simulator QR Selector */}
        <div className="space-y-1.5 pt-2">
          <label className="block text-[10px] font-black uppercase text-emerald-700">
            Simulator QR Code Tag Placement Selector:
          </label>
          <select
            value={selectedQR}
            onChange={(e) => {
              setSelectedQR(e.target.value);
              if (e.target.value) handleSelectQR(e.target.value);
            }}
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-emerald-500 font-medium"
          >
            <option value="">-- Pick a location QR placement tag --</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.qrCodeId || loc.qrCode || loc.id}>
                📷 {loc.name} ({loc.qrCodeId || loc.qrCode})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
