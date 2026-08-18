import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, User, ArrowRight, CheckCircle2, UserPlus, LogIn, Sparkles, Info, Eye, EyeOff, Leaf, Building2, QrCode, Accessibility, Navigation } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('admin@campus.edu');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('student');
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      setLoading(true);
      const res = await login(loginEmail, loginPassword);
      if (res.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      const res = await register(regName, regEmail, regPassword, regRole);
      setSuccessMsg('Account created successfully!');
      setTimeout(() => {
        if (res.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 1000);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8">
      {/* Brand Hero Banner — Smart Campus Graphic Template */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#e8f7f5] via-[#f0f9f8] to-[#edf7f6] border border-emerald-100 p-8 sm:p-12 text-center shadow-xs space-y-6">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/80 text-emerald-800 text-xs font-extrabold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI-Powered Smart Campus Navigation Platform</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              <span className="text-emerald-500">Campus</span> <span className="text-sky-500">Pulse</span>
            </h1>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              Smarter Campus. Easier Navigation.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            Instant indoor QR anchoring, intelligent goal-based recommendations, wheelchair-accessible routing, and live dynamic detour handling. Please sign in or create an account below to access your dashboard.
          </p>

          {/* 4 Smart Campus Stat Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-center">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-0.5">
              <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                <Accessibility className="w-4 h-4" />
              </div>
              <div className="text-xl font-black text-slate-900">100%</div>
              <div className="text-[10px] text-slate-500 font-bold">Wheelchair Accessible</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-0.5">
              <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-xl font-black text-slate-900">10</div>
              <div className="text-[10px] text-slate-500 font-bold">Campus Buildings</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-0.5">
              <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                <Navigation className="w-4 h-4" />
              </div>
              <div className="text-xl font-black text-slate-900">17</div>
              <div className="text-[10px] text-slate-500 font-bold">Navigation Paths</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-0.5">
              <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                <QrCode className="w-4 h-4" />
              </div>
              <div className="text-xl font-black text-slate-900">24/7</div>
              <div className="text-[10px] text-slate-500 font-bold">Live QR Anchoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Auth Form Card */}
      <div className="glass-card p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6 max-w-lg mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-slate-900">Account Access Portal</h2>
          <p className="text-xs text-slate-500 font-medium">Enter your login or registration details to proceed</p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => { setActiveTab('login'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'login'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => { setActiveTab('register'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'register'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account / Sign Up</span>
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs text-center font-bold">
            ⚠️ {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs text-center font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {successMsg}
          </div>
        )}

        {/* TAB 1: LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-extrabold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@campus.edu"
                  required
                  className="w-full bg-white border border-slate-300 rounded-2xl py-3 pl-10 pr-4 text-slate-900 font-medium outline-none focus:border-emerald-500 shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-extrabold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white border border-slate-300 rounded-2xl py-3 pl-10 pr-10 text-slate-900 font-medium outline-none focus:border-emerald-500 shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Notification Notice */}
            <div className="p-3.5 bg-sky-50/80 rounded-2xl border border-sky-200 text-[11px] text-sky-900 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-sky-800">
                <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" /> Password Notice:
              </div>
              <p className="text-sky-700">
                • Passwords are case-sensitive. Please ensure your Caps Lock is off.
              </p>
            </div>

            {/* Quick Demo Fill Credentials */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-[11px]">
              <span className="font-bold text-slate-500 uppercase tracking-wider block">Quick Demo Login Presets:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDemoCredentials('admin@campus.edu', 'admin123')}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold"
                >
                  👑 Admin Login
                </button>
                <button
                  type="button"
                  onClick={() => setDemoCredentials('alex@campus.edu', 'student123')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold"
                >
                  🎓 Student Login
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In & Access Application'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 2: REGISTER FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-extrabold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  required
                  className="w-full bg-white border border-slate-300 rounded-2xl py-3 pl-10 pr-4 text-slate-900 font-medium outline-none focus:border-emerald-500 shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-extrabold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="sarah@campus.edu"
                  required
                  className="w-full bg-white border border-slate-300 rounded-2xl py-3 pl-10 pr-4 text-slate-900 font-medium outline-none focus:border-emerald-500 shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-extrabold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showRegPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create your account password..."
                  required
                  minLength={6}
                  className="w-full bg-white border border-slate-300 rounded-2xl py-3 pl-10 pr-10 text-slate-900 font-medium outline-none focus:border-emerald-500 shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Requirements Notification Box */}
            <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-[11px] space-y-1.5">
              <div className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Password Guidelines & Requirements:
              </div>
              <ul className="space-y-1 text-slate-600 font-medium pl-4 list-disc">
                <li className={regPassword.length >= 6 ? 'text-emerald-700 font-extrabold' : ''}>
                  Minimum <strong>6 characters</strong> in length ({regPassword.length}/6 characters)
                </li>
                <li className={/[a-zA-Z]/.test(regPassword) && /[0-9]/.test(regPassword) ? 'text-emerald-700 font-extrabold' : ''}>
                  Recommended to combine <strong>letters & numbers</strong> (e.g. <code>Sarah@2026</code>)
                </li>
                <li>
                  Case-sensitive (capital and lowercase letters are distinct)
                </li>
              </ul>
            </div>

            <div>
              <label className="block text-slate-700 font-extrabold mb-1">Account Role</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-2xl py-3 px-3.5 text-slate-900 font-medium outline-none focus:border-emerald-500 shadow-xs"
              >
                <option value="student">Student / Visitor</option>
                <option value="faculty">Faculty Member</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
            >
              <span>{loading ? 'Creating Account...' : 'Complete Sign Up & Access App'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
