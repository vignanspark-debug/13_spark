import React, { useState } from 'react';
import { Search, Building, MapPin, Navigation, Filter } from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const { locations, setEndLocation, startLocation, calculateRoute } = useCampus();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Study / Library', 'Dining / Refreshment', 'Academic / Department', 'Administrative Services', 'Healthcare / Emergency', 'Sports & Fitness'];

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          loc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (loc.facilities || []).some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || loc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleNavigate = (loc) => {
    setEndLocation(loc);
    if (startLocation) calculateRoute(startLocation, loc);
    navigate('/navigate');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-white">Search Campus Facilities</h1>
        <p className="text-xs text-slate-400">Search by building name, category, or available service (Wi-Fi, printer, canteen, etc.)</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-sky-500/30 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search locations, printing, Wi-Fi, food..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLocations.map((loc) => (
          <div key={loc.id} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3 hover:border-sky-500/40 transition">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">{loc.name}</h3>
                  <span className="text-[11px] text-sky-400 font-bold">{loc.category}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                {loc.status || 'Open'}
              </span>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2">{loc.description}</p>

            <div className="flex flex-wrap gap-1">
              {(loc.facilities || []).slice(0, 3).map((f, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-[10px] text-slate-300">
                  {f}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => navigate(`/location/${loc.id}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                View Specs
              </button>
              <button
                onClick={() => handleNavigate(loc)}
                className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold flex items-center gap-1 transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
