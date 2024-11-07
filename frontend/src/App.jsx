import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Experiment from './pages/Experiment';
import SignupPage from './pages/Signup';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import AdminPage from './pages/AdminPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LoadingSpinner from './components/LoadingSpinner';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/authStore';
import AboutPage from './pages/AboutPage';
import ProcedurePage from './pages/ProcedurePage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

// Role-based protection for Admin page
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  if (user.role !== 'teacher') {
    return <Navigate to='/' replace />; // Redirect to home if not a teacher
  }

  return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Experiment /></ProtectedRoute>} />
          <Route path="/admin" 
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            } 
          />
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
          <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
          <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/procedure" element={<ProtectedRoute><ProcedurePage /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
          <Route path="/forget-password" element={<RedirectAuthenticatedUser><ForgetPasswordPage /></RedirectAuthenticatedUser>} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
