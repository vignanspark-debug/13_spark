import React from 'react';
import AdminPortal from '../components/AdminPortal';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminDashboardPage() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div className="p-8 text-center text-xs text-slate-400">Loading admin session...</div>;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;

  return (
    <div className="py-6 space-y-4">
      <AdminPortal />
    </div>
  );
}
