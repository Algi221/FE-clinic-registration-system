import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

/**
 * Custom hook untuk handle notifikasi real-time
 */
export const useRealtimeNotifications = (userRole, userId) => {
  const { socket, isConnected, joinRoom, leaveRoom, on, off } = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Join room berdasarkan role
    if (userRole === "DOCTOR") {
      joinRoom("doctor");
    } else if (userRole === "PATIENT" && userId) {
      joinRoom(`patient-${userId}`);
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

      // Tampilkan browser notification jika permission granted
      if (Notification.permission === "granted") {
        new Notification("Pendaftaran Baru!", {
          body: data.message,
          icon: "/logo.png",
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

      // Tampilkan browser notification
      if (Notification.permission === "granted") {
        new Notification("Status Pendaftaran", {
          body: data.message,
          icon: "/logo.png",
        });
      }
    };

    // Handler untuk pemanggilan antrian
    const handleQueueCall = (data) => {
      const notification = {
        id: Date.now(),
        type: "queue-call",
        message: data.message,
        data: data.data,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Tampilkan browser notification dengan suara
      if (Notification.permission === "granted") {
        new Notification("Nomor Antrian Dipanggil!", {
          body: data.message,
          icon: "/logo.png",
          requireInteraction: true, // Tetap tampil sampai user interact
        });
      }
    };

    // Register event listeners
    on("new-registration", handleNewRegistration);
    on("registration-status-update", handleStatusUpdate);
    on("queue-called", handleQueueCall);

    // Cleanup
    return () => {
      off("new-registration", handleNewRegistration);
      off("registration-status-update", handleStatusUpdate);
      off("queue-called", handleQueueCall);

      if (userRole === "DOCTOR") {
        leaveRoom("doctor");
      } else if (userRole === "PATIENT" && userId) {
        leaveRoom(`patient-${userId}`);
      }
    };
  }, [socket, isConnected, userRole, userId]);

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
};
