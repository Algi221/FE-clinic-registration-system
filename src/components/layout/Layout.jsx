import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  User,
  ClipboardList,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-primary flex items-center gap-2"
          >
            <ClipboardList className="w-6 h-6" />
            <span>Klinik Sehat</span>
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6 mr-4 text-sm font-medium">
                <Link
                  to="/"
                  className="hover:text-primary flex items-center gap-1"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                {user.role === "PATIENT" && (
                  <Link
                    to="/register-clinic"
                    className="hover:text-primary flex items-center gap-1"
                  >
                    <PlusCircle className="w-4 h-4" /> Daftar
                  </Link>
                )}
              </nav>

              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                <User className="w-4 h-4" />
                <span>
                  {user.name} ({user.role})
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      <footer className="bg-white border-t py-6 text-center text-sm text-slate-500">
        &copy; 2026 Sistem Pendaftaran Klinik. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
