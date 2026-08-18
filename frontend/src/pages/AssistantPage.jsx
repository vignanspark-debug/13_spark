import React from 'react';
import NeedAssistant from '../components/NeedAssistant';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssistantPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <div className="text-center space-y-2">
        <div className="p-3 w-fit mx-auto rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white">Campus Goal & Need Assistant</h1>
        <p className="text-xs text-slate-400">
          Ask questions in natural language like <em>"I need a quiet place to study"</em>, <em>"Where can I print?"</em>, or <em>"I need medical help"</em>.
        </p>
      </div>

      <NeedAssistant onNavigateToLocation={() => navigate('/navigate')} />
    </div>
  );
}
