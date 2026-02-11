import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { NotificationProvider } from "./context/NotificationContext";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from "react-hot-toast";

// Animated Routes
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <LanguageProvider>
            <NotificationProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  className:
                    "bg-white text-slate-800 shadow-lg border border-teal-100",
                  duration: 4000,
                }}
              />
              <AnimatedRoutes />
            </NotificationProvider>
          </LanguageProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
