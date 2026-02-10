import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User, LayoutDashboard, PlusCircle } from "lucide-react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-teal-100 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="text-xl font-bold flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:bg-teal-700 transition-colors">
              <span className="mb-0.5">+</span>
            </div>
            <span className="text-slate-800 group-hover:text-teal-700 transition-colors">
              Ocean<span className="text-teal-600 font-serif italic">Care</span>
            </span>
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6 mr-4 text-sm font-medium text-slate-600">
                <Link
                  to="/dashboard"
                  className="hover:text-teal-600 flex items-center gap-1 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                {user.role === "PATIENT" && (
                  <Link
                    to="/register-clinic"
                    className="hover:text-teal-600 flex items-center gap-1 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" /> Daftar Baru
                  </Link>
                )}
              </nav>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
                  <User className="w-4 h-4 text-teal-600" />
                  <span className="font-medium text-teal-800">{user.name}</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">{children}</main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="container mx-auto px-6 text-center text-sm text-slate-500">
          <p className="font-medium text-slate-600 mb-1">Klinik OceanCare</p>
          <p>
            &copy; {new Date().getFullYear()} Sistem Pendaftaran Klinik. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
