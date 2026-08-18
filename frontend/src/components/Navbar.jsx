import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navigation, QrCode, Sparkles, Map, Search, Shield, LogOut, Menu, X, Lock } from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { setShowQRScanner } = useCampus();
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: Navigation },
    { path: '/map', label: 'Campus Map', icon: Map },
    { path: '/assistant', label: 'Assistant', icon: Sparkles },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/navigate', label: 'Navigate', icon: Navigation },
    ...(isAdmin ? [{ path: '/admin', label: 'Admin Portal', icon: Shield }] : [])
  ];

  return (
    <header className="bg-white/95 border-b border-slate-200/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to={user ? "/" : "/login"} className="flex items-center gap-3 group">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 text-white shadow-md shadow-emerald-500/20 transition group-hover:scale-105">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-slate-900">CAMPUS PULSE</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold">
                v2.0 PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Scan. Understand. Navigate.</p>
          </div>
        </Link>

        {/* Desktop Navigation Links — Visible ONLY when Logged In */}
        {user && (
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60 text-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                    active 
                      ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/60 font-extrabold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button
                onClick={() => setShowQRScanner(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition hover:scale-102"
              >
                <QrCode className="w-4 h-4" />
                <span className="hidden sm:inline">Scan QR Code</span>
              </button>

              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-emerald-800 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                  👤 {user.name} ({user.role || 'user'})
                </span>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu — Visible ONLY when Logged In */}
      {user && mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 space-y-2 text-xs font-bold animate-fade-in">
          <nav className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl transition flex items-center gap-2 ${
                    active ? 'bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={logout}
            className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </header>
  );
}
