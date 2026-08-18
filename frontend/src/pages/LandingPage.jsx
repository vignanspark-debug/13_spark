import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Navigation, QrCode, Sparkles, MapPin, Accessibility, AlertTriangle, 
  ArrowRight, Shield, BookOpen, Utensils, HeartPulse, Trophy, Cpu, 
  Building2, Home, Car, CheckCircle2, Lock, Leaf
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { setShowQRScanner } = useCampus();
  const { user } = useAuth();
  const navigate = useNavigate();

  const facilities = [
    { title: "Central Library", category: "Study / Quiet", icon: BookOpen, desc: "Silent reading halls, digital archives & study booths" },
    { title: "Campus Canteen", category: "Food & Drinks", icon: Utensils, desc: "Hot meals, coffee bar & digital ordering kiosks" },
    { title: "Health Center", category: "Medical Care", icon: HeartPulse, desc: "24/7 emergency first aid, doctor & ambulance bay" },
    { title: "Sports Complex", category: "Fitness & Field", icon: Trophy, desc: "Football ground, basketball courts & athletic track" },
    { title: "CSE & Data Labs", category: "Academic / Tech", icon: Cpu, desc: "High-performance AI computing & software labs" },
    { title: "Administration", category: "Office & Fees", icon: Building2, desc: "Registrar desk, transcripts & fee counter" },
    { title: "Student Hostel", category: "Residential", icon: Home, desc: "Student residence blocks & night mess" },
    { title: "Visitor Parking", category: "Parking / EV", icon: Car, desc: "Multi-tier vehicle parking & EV charging spots" }
  ];

  const handleProtectedAction = (targetPath) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(targetPath);
    }
  };

  const handleScanQRClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowQRScanner(true);
    }
  };

  return (
    <div className="space-y-16 py-4">
      {/* Auth Banner Warning for Unauthenticated Visitors */}
      {!user && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-3xl text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Sign In Required: Create an account or sign in to access live maps, assistant & QR navigation.</span>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs transition shrink-0"
          >
            Sign In / Register Now
          </Link>
        </div>
      )}

      {/* 1. SMART CAMPUS GRAPHIC TEMPLATE HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#e8f7f5] via-[#f0f9f8] to-[#edf7f6] border border-emerald-100 p-8 sm:p-14 text-center shadow-xs">
        {/* Soft Background Radial Blur Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/80 text-emerald-800 text-xs font-extrabold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI-Powered Smart Campus Navigation Platform</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.15]">
              <span className="text-emerald-500">Campus</span> <span className="text-sky-500">Pulse</span>
            </h1>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Smarter Campus. Easier Navigation.
            </h2>
          </div>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Instant indoor QR anchoring, intelligent goal-based recommendations, wheelchair-accessible routing, and live dynamic detour handling for university students and faculty.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleScanQRClick}
              className="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition hover:scale-102"
            >
              <QrCode className="w-5 h-5" />
              <span>Scan QR Code</span>
            </button>

            <button
              onClick={() => handleProtectedAction('/map')}
              className="px-7 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-sky-600/25 transition hover:scale-102"
            >
              <Navigation className="w-5 h-5" />
              <span>Explore Campus Map</span>
            </button>

            <button
              onClick={() => handleProtectedAction('/assistant')}
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm flex items-center gap-2 border border-slate-200 shadow-xs transition hover:scale-102"
            >
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Campus Assistant</span>
            </button>
          </div>

          {/* 4 Smart Campus Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-md shadow-slate-200/50 text-center space-y-1 transition hover:-translate-y-1">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Accessibility className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-bold">Wheelchair Accessible</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-md shadow-slate-200/50 text-center space-y-1 transition hover:-translate-y-1">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">10</div>
              <div className="text-xs text-slate-500 font-bold">Campus Buildings</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-md shadow-slate-200/50 text-center space-y-1 transition hover:-translate-y-1">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">17</div>
              <div className="text-xs text-slate-500 font-bold">Navigation Paths</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-md shadow-slate-200/50 text-center space-y-1 transition hover:-translate-y-1">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">24/7</div>
              <div className="text-xs text-slate-500 font-bold">Live QR Anchoring</div>
            </div>
          </div>

          {/* Mouse Scroll Indicator */}
          <div className="flex justify-center pt-6">
            <div className="w-6 h-10 rounded-full border-2 border-emerald-400/60 p-1 flex justify-center items-start animate-bounce">
              <div className="w-1.5 h-3 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTELLIGENT CONTEXT-AWARE FEATURES */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Intelligent Context-Aware Features</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">Engineered for seamless university ground navigation and facility discovery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-200 card-hover space-y-3">
            <div className="p-3 w-fit rounded-2xl bg-emerald-100 text-emerald-700 font-bold">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">QR Location Detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Instantly anchors your starting point when you scan tags placed on main gates, library doors, or academic halls.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200 card-hover space-y-3">
            <div className="p-3 w-fit rounded-2xl bg-sky-100 text-sky-700 font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Smart Campus Assistant</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Ask in plain English: <em>"I need a quiet place to study"</em> or <em>"Where can I print?"</em> to get tailored recommendations.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200 card-hover space-y-3">
            <div className="p-3 w-fit rounded-2xl bg-indigo-100 text-indigo-700 font-bold">
              <Accessibility className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Accessible Navigation</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Toggle Wheelchair Accessible Mode to filter out staircases and route along elevators and step-free ramps.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200 card-hover space-y-3">
            <div className="p-3 w-fit rounded-2xl bg-amber-100 text-amber-700 font-bold">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Dynamic Route Updates</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Automatically calculates alternative detours around maintenance zones or temporary corridor closures.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="bg-gradient-to-r from-emerald-600 to-sky-600 rounded-3xl p-8 sm:p-12 text-white shadow-lg space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase">3-Step Journey</span>
          <h2 className="text-2xl sm:text-3xl font-black">How Campus Pulse Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-3 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-white text-emerald-700 font-black text-lg flex items-center justify-center shadow-md">1</div>
            <h3 className="text-lg font-extrabold">Step 1: Scan</h3>
            <p className="text-xs text-white/90 leading-relaxed font-medium">
              Scan any QR tag on campus walls or entrance pillars to establish your current anchor location.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-3 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-white text-sky-700 font-black text-lg flex items-center justify-center shadow-md">2</div>
            <h3 className="text-lg font-extrabold">Step 2: Understand</h3>
            <p className="text-xs text-white/90 leading-relaxed font-medium">
              State your need to the assistant or search facilities to find the recommended destination.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-3 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-white text-indigo-700 font-black text-lg flex items-center justify-center shadow-md">3</div>
            <h3 className="text-lg font-extrabold">Step 3: Navigate</h3>
            <p className="text-xs text-white/90 leading-relaxed font-medium">
              Follow turn-by-turn Dijkstra path instructions on the interactive map to reach your destination.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CAMPUS FACILITIES / CATEGORIES GRID */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Explore Campus Facilities</h2>
            <p className="text-xs text-slate-600 font-medium">Quick access to major university departments and hubs</p>
          </div>
          <button
            onClick={() => handleProtectedAction('/search')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <span>View All Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <button
                key={idx}
                onClick={() => handleProtectedAction('/search')}
                className="glass-card p-5 rounded-2xl border border-slate-200 card-hover space-y-3 text-left w-full group"
              >
                <div className="p-3 w-fit rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{fac.title}</h3>
                  <span className="text-[11px] text-emerald-700 font-bold">{fac.category}</span>
                </div>
                <p className="text-xs text-slate-500 leading-snug">{fac.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. ACCESSIBILITY SECTION */}
      <section className="glass-card p-8 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50/50 to-sky-50/50 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
            <Accessibility className="w-4 h-4" />
            <span>Inclusive Campus Mobility</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Wheelchair Accessible Navigation</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Campus Pulse puts accessibility first. Enabling <strong>Accessible Mode</strong> automatically excludes staircases and steep paths, rerouting students along ramps, wide automated doors, and elevators.
          </p>
        </div>

        <div className="md:col-span-4 flex justify-center">
          <button
            onClick={() => handleProtectedAction('/navigate')}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition text-center"
          >
            Try Accessible Mode
          </button>
        </div>
      </section>
    </div>
  );
}
