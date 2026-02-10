import { useState } from "react";
import { Bell } from "lucide-react";
import { useRealtimeNotifications } from "../../hooks/useRealtimeNotifications";
import { useAuth } from "../../context/AuthContext";

const NotificationBell = () => {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useRealtimeNotifications(user?.role, user?.id);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return date.toLocaleDateString("id-ID");
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "new-registration":
        return "📋";
      case "status-update":
        return "✅";
      case "queue-call":
        return "🔔";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Overlay to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />

          <div className="absolute right-0 mt-2 w-80 max-h-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20">
            {/* Header */}
            <div className="bg-teal-600 text-white p-3 flex justify-between items-center">
              <h3 className="font-semibold">Notifikasi</h3>
              {notifications.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={markAllAsRead}
                    className="text-xs hover:underline"
                  >
                    Tandai dibaca
                  </button>
                  <button
                    onClick={clearNotifications}
                    className="text-xs hover:underline"
                  >
                    Hapus semua
                  </button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-80">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <Bell size={48} className="mx-auto mb-2 opacity-30" />
                  <p>Tidak ada notifikasi</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      if (!notif.read) markAsRead(notif.id);
                    }}
                    className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !notif.read ? "bg-teal-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {getNotificationIcon(notif.type)}
                      </span>
                      <div className="flex-1">
                        <p
                          className={`text-sm ${!notif.read ? "font-semibold" : ""}`}
                        >
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(notif.timestamp)}
                        </p>
                        {notif.data?.name && (
                          <p className="text-xs text-gray-600 mt-1">
                            Pasien: {notif.data.name}
                          </p>
                        )}
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-1"></span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
