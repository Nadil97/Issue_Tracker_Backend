import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import IssueDetailPage from './pages/IssueDetailPage';
import CreateIssuePage from './pages/CreateIssuePage';
import EditIssuePage from './pages/EditIssuePage';

import './App.css';

function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<div className="layout-with-navbar"><Navbar /><main className="main-content"><Navigate to="/dashboard" replace /></main></div>}>
          {/* This is a bit complex for a simple layout, let's refine */}
        </Route>
        
        {/* Simpler layout approach */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<><Navbar /><main className="main-content"><DashboardPage /></main></>} />
        <Route path="/issues" element={<Navigate to="/dashboard" replace />} />
        <Route path="/issues/create" element={<><Navbar /><main className="main-content"><CreateIssuePage /></main></>} />
        <Route path="/issues/:id" element={<><Navbar /><main className="main-content"><IssueDetailPage /></main></>} />
        <Route path="/issues/:id/edit" element={<><Navbar /><main className="main-content"><EditIssuePage /></main></>} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
