import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Navigation } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function NeedAssistant({ onNavigateToLocation }) {
  const { handleAskAssistant, assistantResult, loading, startLocation, setEndLocation, calculateRoute } = useCampus();
  const [queryInput, setQueryInput] = useState('');

  const samplePrompts = [
    "I need a quiet place to study",
    "Where can I print my thesis?",
    "I need medical emergency help",
    "Where can I eat food & coffee?",
    "Where can I play sports?",
    "Where can I find high-speed Wi-Fi?",
    "Where is the admin office?"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryInput.trim()) {
      handleAskAssistant(queryInput.trim());
    }
  };

  const handleSelectPrompt = (promptText) => {
    setQueryInput(promptText);
    handleAskAssistant(promptText);
  };

  const handleNavigate = (loc) => {
    if (onNavigateToLocation) {
      onNavigateToLocation(loc);
    } else {
      setEndLocation(loc);
      if (startLocation) calculateRoute(startLocation, loc);
    }
  };

  return (
    <div className="glass-card p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-900">Need-Based Campus Assistant</h3>
          <p className="text-xs text-slate-500 font-medium">State your goal or need in plain English</p>
        </div>
      </div>

      {/* Query Form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          placeholder="e.g. 'I need a quiet place to study'..."
          className="w-full bg-white border border-slate-300 rounded-2xl py-3 pl-4 pr-12 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs font-medium"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center"
        >
          {loading ? '...' : <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      {/* Sample Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-black uppercase text-slate-400">Suggested Assistant Queries:</span>
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPrompt(p)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 border border-slate-200 text-xs text-slate-700 hover:text-emerald-800 font-bold transition text-left"
            >
              💬 "{p}"
            </button>
          ))}
        </div>
      </div>

      {/* Recommendation Card */}
      {assistantResult && assistantResult.success && assistantResult.primaryRecommendation && (
        <div className="p-4 bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-50 rounded-2xl border border-emerald-200 space-y-3 text-xs animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Recommendation
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white text-emerald-700 border border-emerald-300 text-[10px] font-extrabold">
              Confidence: {Math.round((assistantResult.confidenceScore || 0.95) * 100)}%
            </span>
          </div>

          <div>
            <h4 className="font-extrabold text-base text-slate-900">{assistantResult.primaryRecommendation.name}</h4>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">{assistantResult.explanation}</p>
          </div>

          {assistantResult.distance && (
            <div className="text-xs text-sky-800 font-bold bg-white/80 p-2 rounded-xl border border-sky-200">
              Distance from anchor: <strong>{assistantResult.distance}m</strong> (~{assistantResult.estimatedTimeMinutes} min walk)
            </div>
          )}

          <button
            onClick={() => handleNavigate(assistantResult.primaryRecommendation)}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
          >
            <Navigation className="w-4 h-4" />
            <span>Navigate to {assistantResult.primaryRecommendation.name}</span>
          </button>
        </div>
      )}
    </div>
  );
}
