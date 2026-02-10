import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { NotificationProvider } from "./context/NotificationContext";
import { Toaster } from "react-hot-toast";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegistrationClinic from "./pages/registration/RegistrationClinic";

// Role Based Dashboards
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";

// Wrapper for Dashboard to handle role-based rendering
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  // Assuming 'ADMIN' is the role for doctors/staff as per previous code
  if (user.role === "DOCTOR") {
    return <DoctorDashboard />;
  }

  return <PatientDashboard />;
};

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

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <NotificationProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                className:
                  "bg-white text-slate-800 shadow-lg border border-teal-100",
                duration: 4000,
              }}
            />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardRouter />
                  </PrivateRoute>
                }
              />

              <Route
                path="/register-clinic"
                element={
                  <PrivateRoute>
                    <RegistrationClinic />
                  </PrivateRoute>
                }
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </NotificationProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
