import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import UsersManagement from './pages/UsersManagement';
import ModulesManagement from './pages/ModulesManagement';
import AssignmentsManagement from './pages/AssignmentsManagement';
import WorkloadOverview from './pages/WorkloadOverview';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/professor" 
              element={
                <ProtectedRoute requiredRole="professor">
                  <Layout>
                    <ProfessorDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <UsersManagement />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/modules" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <ModulesManagement />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/assignments" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <AssignmentsManagement />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/workload" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <WorkloadOverview />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;