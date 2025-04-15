import { useState,useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import LayoutPage from './pages/LayoutPage';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {

	const { isAuthenticated, user } = useAuthStore();
	if (!isAuthenticated) {
		return <Navigate to='/' replace />;
	}
	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}
	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/dashboard/home' replace />;
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
      <Routes>
        <Route path='/dashboard/home' element={<ProtectedRoute> <LayoutPage/> </ProtectedRoute>}/>
        <Route path='/signup' element={<RedirectAuthenticatedUser> <SignUpPage /></RedirectAuthenticatedUser>}/>
        <Route path='/' element={ <RedirectAuthenticatedUser> <LoginPage /> </RedirectAuthenticatedUser>}/>
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route path='/forgot-password' element={ <RedirectAuthenticatedUser> <ForgotPasswordPage/></RedirectAuthenticatedUser>}/>
        <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPasswordPage/> </RedirectAuthenticatedUser>}/>
        {/* catch all routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App
