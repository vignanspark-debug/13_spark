import React, { useState } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle2, Lock, Unlock, 
  Building2, QrCode, Printer, RefreshCw, Edit3, X 
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { locationsAPI } from '../services/api';

export default function AdminPortal() {
  const { locations, edges, fetchNetworkData, handleTogglePathClosed, handleResetDatabase } = useCampus();
  const [activeTab, setActiveTab] = useState('paths'); // 'paths' | 'locations' | 'qr_labels'
  const [editingLocation, setEditingLocation] = useState(null);

  const closedPathsCount = edges.filter(e => e.isClosed || e.status === 'closed').length;

  const handleSaveLocation = async () => {
    if (!editingLocation) return;
    try {
      await locationsAPI.update(editingLocation.id, editingLocation);
      await fetchNetworkData();
      setEditingLocation(null);
    } catch (e) {
      console.error('Failed to update location:', e);
    }
  };

  return (
    <div className="glass-card p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Campus Pulse Administrator Portal</h2>
            <p className="text-xs text-slate-500 font-medium">Manage real-time path closures, location status & printable QR anchors</p>
          </div>
        </div>

        <button
          onClick={handleResetDatabase}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1.5 border border-slate-200 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-slate-500 text-[10px] uppercase font-bold">Total Locations</div>
          <div className="text-slate-900 font-black text-xl">{locations.length}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-slate-500 text-[10px] uppercase font-bold">Active QR Tags</div>
          <div className="text-purple-700 font-black text-xl">{locations.length}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-slate-500 text-[10px] uppercase font-bold">Network Paths</div>
          <div className="text-sky-700 font-black text-xl">{edges.length}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-slate-500 text-[10px] uppercase font-bold">Closed Corridors</div>
          <div className="text-rose-600 font-black text-xl">{closedPathsCount}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs font-bold pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('paths')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
            activeTab === 'paths' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Path Closures & Hazards ({closedPathsCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('locations')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
            activeTab === 'locations' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Locations & Hours ({locations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('qr_labels')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
            activeTab === 'qr_labels' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Printable QR Tags</span>
        </button>
      </div>

      {/* TAB 1: PATH CLOSURES */}
      {activeTab === 'paths' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600 font-medium">
            Mark pathways or corridors as closed. The Dijkstra engine will automatically recalculate alternative detour routes for students.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
            {edges.map((edge) => {
              const isClosed = edge.isClosed || edge.status === 'closed';
              return (
                <div 
                  key={edge.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition ${
                    isClosed 
                      ? 'bg-rose-50 border-rose-200 text-rose-900' 
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-extrabold text-xs flex items-center gap-1.5">
                      {isClosed ? (
                        <Lock className="w-4 h-4 text-rose-600 shrink-0" />
                      ) : (
                        <Unlock className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      <span>{edge.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      Distance: {edge.distance}m • Stairs: {edge.hasStairs ? 'Yes' : 'No'}
                    </div>
                    {isClosed && edge.closureReason && (
                      <div className="text-[11px] text-rose-700 font-bold mt-1">
                        Reason: {edge.closureReason}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleTogglePathClosed(edge.id, !isClosed)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shrink-0 ${
                      isClosed
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-rose-600 hover:bg-rose-700 text-white'
                    }`}
                  >
                    {isClosed ? 'Re-open Path' : 'Close Path'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LOCATIONS MANAGEMENT */}
      {activeTab === 'locations' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {locations.map((loc) => (
              <div key={loc.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900">{loc.name}</h4>
                    <span className="text-[11px] text-emerald-700 font-bold">{loc.category}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    {loc.status || 'Open'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-0.5 font-medium">
                  <div>Floor: <strong className="text-slate-800">{loc.floor}</strong></div>
                  <div>Hours: <strong className="text-slate-800">{loc.openingHours || loc.hours}</strong></div>
                  <div>QR Tag: <strong className="text-purple-700 font-mono">{loc.qrCodeId || loc.qrCode}</strong></div>
                </div>

                <button
                  onClick={() => setEditingLocation(loc)}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Edit Facility Details</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRINTABLE QR GENERATOR */}
      {activeTab === 'qr_labels' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-600 font-medium">
              Printable Campus Placement QR Tags (Affix to Main Gate, Library Door, CSE Corridor, etc.)
            </p>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print All Labels</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
            {locations.map((loc) => (
              <div key={loc.id} className="p-3.5 bg-white text-slate-900 rounded-2xl border border-slate-300 text-center space-y-2 shadow-sm">
                <div className="text-[10px] font-black tracking-widest uppercase text-emerald-700">CAMPUS PULSE QR</div>
                <div className="w-20 h-20 mx-auto bg-slate-900 rounded-xl p-2 flex items-center justify-center text-white font-mono text-center">
                  <div className="border-2 border-dashed border-sky-400 p-1 rounded-lg w-full h-full flex flex-col items-center justify-center">
                    <QrCode className="w-8 h-8 text-sky-400" />
                    <span className="text-[8px] mt-0.5 font-bold">{loc.qrCodeId || loc.qrCode}</span>
                  </div>
                </div>
                <div className="font-extrabold text-xs leading-tight">{loc.name}</div>
                <div className="text-[9px] text-slate-500 font-bold">{loc.buildingCode || 'CP-TAG'} • Scan for Nav</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Location Modal */}
      {editingLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="glass-card w-full max-w-md p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">Edit {editingLocation.name}</h3>
              <button onClick={() => setEditingLocation(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Operating Hours</label>
                <input 
                  type="text"
                  value={editingLocation.openingHours || editingLocation.hours || ''}
                  onChange={(e) => setEditingLocation({ ...editingLocation, openingHours: e.target.value, hours: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Status</label>
                <select 
                  value={editingLocation.status || 'Open'}
                  onChange={(e) => setEditingLocation({ ...editingLocation, status: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Contact Details</label>
                <input 
                  type="text"
                  value={editingLocation.contact || ''}
                  onChange={(e) => setEditingLocation({ ...editingLocation, contact: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button 
                onClick={() => setEditingLocation(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveLocation}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
