import React from 'react';
import { Navigation } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 py-8 px-4 text-xs mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-sm">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-sm tracking-wide">Campus Pulse</span>
            <span className="text-slate-500 ml-2">— Scan. Understand. Navigate.</span>
          </div>
        </div>

        <div className="text-center md:text-right text-[11px] text-slate-500 font-medium">
          QR-Based Smart Campus Navigation Platform • Built with React, Express, Mongoose & Dijkstra Engine
        </div>
      </div>
    </footer>
  );
}
