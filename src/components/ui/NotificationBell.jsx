import { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/context/NotificationContext";
import {
  Bell,
  CheckCheck,
  Trash2,
  Clock,
  Info,
  Calendar,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Button } from "./button";

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-2xl transition-all duration-500 ${
          isOpen
            ? "bg-[#0F6A78] text-white shadow-xl shadow-teal-900/20 rotate-12"
            : "bg-teal-50 text-[#0F6A78] hover:bg-teal-100/50"
        }`}
      >
        <Bell size={22} className={unreadCount > 0 ? "animate-pulse" : ""} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-lg">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-6 w-[400px] bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(15,106,120,0.3)] border border-teal-50 overflow-hidden z-[100] animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-500">
          {/* Header */}
          <div className="p-8 bg-[#F8FDFF] border-b border-teal-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-[#0F6A78] tracking-tight">
                Notifikasi
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="h-8 px-3 rounded-lg text-[10px] font-black text-[#0F6A78] hover:bg-teal-100 uppercase tracking-widest"
                >
                  <CheckCheck size={14} className="mr-1" /> Mark Read
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearNotifications}
                  className="h-8 px-3 rounded-lg text-[10px] font-black text-red-400 hover:bg-red-50 uppercase tracking-widest"
                >
                  <Trash2 size={14} className="mr-1" /> Clear
                </Button>
              </div>
            </div>
            <p className="text-[#0F6A78]/40 text-[10px] font-black uppercase tracking-[0.2em]">
              Anda memiliki {unreadCount} pesan belum terbaca
            </p>
          </div>

          {/* List */}
          <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-16 text-center">
                <div className="inline-flex p-6 rounded-3xl bg-teal-50/50 mb-4">
                  <Bell size={40} className="text-teal-200" />
                </div>
                <p className="text-[#0F6A78]/30 font-black uppercase tracking-widest text-[10px]">
                  Belum Ada Notifikasi Baru
                </p>
              </div>
            ) : (
              <div className="divide-y divide-teal-50/50">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-6 hover:bg-teal-50/30 transition-all cursor-pointer group relative ${
                      !n.read ? "bg-teal-50/10" : ""
                    }`}
                  >
                    {!n.read && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-[#0F6A78] rounded-r-full shadow-[0_0_15px_rgba(15,106,120,0.5)]"></div>
                    )}
                    <div className="flex gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                          n.type === "status-update"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-[#0F6A78]/10 text-[#0F6A78]"
                        }`}
                      >
                        {n.type === "status-update" ? (
                          <Zap size={20} />
                        ) : (
                          <Calendar size={20} />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <p
                            className={`text-sm font-bold leading-tight ${!n.read ? "text-[#0F6A78]" : "text-slate-400"}`}
                          >
                            {n.message}
                          </p>
                          <ChevronRight
                            size={14}
                            className="text-teal-100 group-hover:text-teal-300 transition-colors"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={10} className="text-teal-200" />
                          <p className="text-[10px] font-black text-teal-300 uppercase tracking-widest">
                            {new Date(n.timestamp).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-teal-50/30 text-center border-t border-teal-50">
            <span className="text-[10px] font-black text-[#0F6A78]/30 uppercase tracking-[0.4em]">
              Integrated Notification System
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
