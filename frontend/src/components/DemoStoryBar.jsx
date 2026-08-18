import React from 'react';
import { useCampus } from '../context/CampusContext';

export default function DemoStoryBar() {
  const { currentScene, handleSelectScene } = useCampus();

  const scenes = [
    { id: 1, title: "1. Scan Entrance QR" },
    { id: 2, title: "2. Location Identified" },
    { id: 3, title: "3. State Need" },
    { id: 4, title: "4. Recommendation" },
    { id: 5, title: "5. Start Navigation" },
    { id: 6, title: "6. Display Route" },
    { id: 7, title: "7. Accessible Mode" },
    { id: 8, title: "8. Admin Closes Path" },
    { id: 9, title: "9. Auto Recalculation" },
    { id: 10, title: "10. Alternative Route" }
  ];

  return (
    <div className="bg-slate-900 border-b border-sky-900/50 px-4 py-2 text-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-sky-400 shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>HACKATHON DEMO SIMULATOR:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin">
          {scenes.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectScene(s.id)}
              className={`px-3 py-1 rounded-lg font-bold shrink-0 transition ${
                currentScene === s.id
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
