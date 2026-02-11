import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./context/AuthContext";

// Layout
import Layout from "./components/layout/Layout";
import PageTransition from "./components/layout/PageTransition";

// Pages
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/patient/Home";
import PatientHistory from "./pages/patient/PatientHistory";
import PatientProfile from "./pages/patient/PatientProfile";
import RegistrationClinic from "./pages/patient/RegistrationClinic";
import PatientSettings from "./pages/patient/PatientSettings";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorSettings from "./pages/doctor/DoctorSettings";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-teal-600 font-semibold">
        Loading OceanCare...
      </div>
    );
  if (!user) return <Navigate to="/login" />;

  return <Layout>{children}</Layout>;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <PageTransition>
                <DoctorDashboard />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <PageTransition>
                <Home />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor/schedule"
          element={
            <PrivateRoute>
              <PageTransition>
                <DoctorSchedule />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <PrivateRoute>
              <PageTransition>
                <DoctorProfile />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/settings"
          element={
            <PrivateRoute>
              <PageTransition>
                <DoctorSettings />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* Patient Routes */}
        <Route
          path="/patient/profile"
          element={
            <PrivateRoute>
              <PageTransition>
                <PatientProfile />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/history"
          element={
            <PrivateRoute>
              <PageTransition>
                <PatientHistory />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/register-clinic"
          element={
            <PrivateRoute>
              <PageTransition>
                <RegistrationClinic />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/settings"
          element={
            <PrivateRoute>
              <PageTransition>
                <PatientSettings />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
