import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CampusProvider, useCampus } from './context/CampusContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QRScannerModal from './components/QRScannerModal';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import ScanPage from './pages/ScanPage';
import LocationPage from './pages/LocationPage';
import MapPage from './pages/MapPage';
import AssistantPage from './pages/AssistantPage';
import SearchPage from './pages/SearchPage';
import NavigatePage from './pages/NavigatePage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function AppContent() {
  const { showQRScanner, setShowQRScanner, locations } = useCampus();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* 1. Header Navbar */}
      <Navbar />

      {/* 2. Main Routes */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4">
        <Routes>
          {/* Unauthenticated Mode: Root / renders Login Page */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            user ? <LandingPage /> : <Navigate to="/login" replace />
          } />

          {/* Protected Application Routes (Accessible ONLY after entering Sign In or Sign Up details) */}
          <Route path="/scan" element={
            <ProtectedRoute>
              <ScanPage />
            </ProtectedRoute>
          } />
          <Route path="/location/:id" element={
            <ProtectedRoute>
              <LocationPage />
            </ProtectedRoute>
          } />
          <Route path="/map" element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          } />
          <Route path="/assistant" element={
            <ProtectedRoute>
              <AssistantPage />
            </ProtectedRoute>
          } />
          <Route path="/search" element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          } />
          <Route path="/navigate" element={
            <ProtectedRoute>
              <NavigatePage />
            </ProtectedRoute>
          } />

          {/* Protected Admin Route (Requires Admin Account) */}
          <Route path="/admin/*" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
        </Routes>
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* QR Scanner Overlay Modal */}
      {user && showQRScanner && (
        <QRScannerModal 
          locations={locations}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CampusProvider>
        <Router>
          <AppContent />
        </Router>
      </CampusProvider>
    </AuthProvider>
  );
}
