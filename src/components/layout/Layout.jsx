import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  User,
  LayoutDashboard,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Calendar,
  Settings,
  Bell,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import NotificationBell from "@/components/ui/NotificationBell";
import LogoutConfirmModal from "@/components/ui/LogoutConfirmModal";
import { Footer } from "@/components/layout/Footer";

const DoctorSidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate("/login");
    setShowLogoutModal(false);
  };

  const menuItems = [
    {
      title: t("dashboard_title"),
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("nav_schedule"),
      path: "/doctor/schedule",
      icon: Calendar,
    },
    {
      title: t("nav_profile"),
      path: "/doctor/profile",
      icon: User,
    },
    {
      title: t("nav_settings"),
      path: "/doctor/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white text-slate-600 transition-all duration-300 border-r border-slate-100 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        {/* Logo Section */}
        <div
          className={`h-16 flex items-center ${!isOpen ? "justify-center" : "justify-start px-6"} border-b border-slate-50`}
        >
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-teal-50 rounded-lg text-[#0F6A78]">
                <img
                  src="/logo_no_bg 1.png"
                  alt="Logo"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-lg font-bold text-slate-800 tracking-tight">
                OceanCare
              </span>
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-teal-50 rounded-lg">
              <img
                src="/logo_no_bg 1.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-teal-50 text-[#0F6A78]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${isActive ? "text-[#0F6A78]" : "text-slate-400 group-hover:text-slate-600"}`}
                />
                {isOpen && (
                  <span
                    className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}
                  >
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Area */}
        <div className="p-4 border-t border-slate-50 space-y-2">
          {isOpen && (
            <div className="flex items-center gap-3 px-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#0F6A78] text-white flex items-center justify-center font-bold text-xs">
                {user?.name?.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-700 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  Dokter Spesialis
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogoutClick}
            className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all group ${!isOpen && "justify-center"}`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-6 -right-3 w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0F6A78] shadow-sm z-50"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

const PatientNavbar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-2">
          <img
            src="/logo_no_bg 1.png"
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
          <span className="text-lg font-bold text-slate-800 tracking-tight">
            OceanCare
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 mr-4 text-sm font-medium text-slate-500">
              <Link
                to="/home"
                className="hover:text-[#0F6A78] transition-colors"
              >
                {t("nav_home")}
              </Link>
              <Link
                to="/register-clinic"
                className="hover:text-[#0F6A78] transition-colors"
              >
                {t("new_appointment")}
              </Link>
              <Link
                to="/patient/history"
                className="hover:text-[#0F6A78] transition-colors"
              >
                {t("history")}
              </Link>
            </nav>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <NotificationBell />

              <Link
                to="/patient/profile"
                className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0F6A78] font-bold text-xs hover:bg-[#0F6A78] hover:text-white transition-colors"
              >
                {user.name.charAt(0)}
              </Link>

              <Link
                to="/patient/settings"
                className="p-1.5 rounded-full text-slate-400 hover:text-[#0F6A78] hover:bg-slate-50 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-sm font-medium text-slate-600"
              >
                Masuk
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#0F6A78] hover:bg-[#0d5661] text-sm h-9 px-4 rounded-lg">
                Daftar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

const Layout = ({ children }) => {
  const { user } = useAuth();
  // Initialize from localStorage or default to true
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebarOpen");
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  // Function to toggle and save to localStorage
  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarOpen", JSON.stringify(newState));
  };

  if (!user) return <>{children}</>;

  const isDoctor = user.role === "DOCTOR";

  if (isDoctor) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex font-sans overflow-x-hidden text-slate-900">
        <DoctorSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <header className="h-16 flex items-center justify-end px-8 bg-white/80 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-30">
            <div className="flex items-center gap-6">
              <NotificationBell />
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-700">
                    {user.name}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#0F6A78] text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8">{children}</main>

          <footer className="py-6 text-center text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} OceanCare Medical System</p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col font-sans text-slate-900">
      <PatientNavbar />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
