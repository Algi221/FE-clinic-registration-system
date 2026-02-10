import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const { socket, isConnected, joinRoom, leaveRoom, on, off } = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!socket || !isConnected || !user) return;

    // Join room berdasarkan role
    if (user.role === "DOCTOR") {
      joinRoom("doctor");
    } else if (user.role === "PATIENT") {
      joinRoom(`patient-${user.id}`);
    }

    // Handler untuk pendaftaran baru (untuk dokter)
    const handleNewRegistration = (data) => {
      const notification = {
        id: Date.now(),
        type: "new-registration",
        message: data.message,
        data: data.data,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
      toast.success(data.message, { icon: "📋" });

      if (Notification.permission === "granted") {
        new Notification("Pendaftaran Baru!", {
          body: data.message,
        });
      }
    };

    // Handler untuk update status (untuk patient)
    const handleStatusUpdate = (data) => {
      const notification = {
        id: Date.now(),
        type: "status-update",
        message: data.message,
        data: data,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
      toast.success(data.message, { icon: "✅" });

      if (Notification.permission === "granted") {
        new Notification("Status Pendaftaran", {
          body: data.message,
        });
      }
    };

    // Register event listeners
    on("new-registration", handleNewRegistration);
    on("registration-status-update", handleStatusUpdate);

    return () => {
      off("new-registration", handleNewRegistration);
      off("registration-status-update", handleStatusUpdate);

      if (user.role === "DOCTOR") {
        leaveRoom("doctor");
      } else if (user.role === "PATIENT") {
        leaveRoom(`patient-${user.id}`);
      }
    };
  }, [socket, isConnected, user]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
