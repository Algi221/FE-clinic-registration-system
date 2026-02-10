import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Koneksi ke WebSocket server
    const socketInstance = io(
      import.meta.env.VITE_API_URL || "http://localhost:5000",
      {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      },
    );

    socketInstance.on("connect", () => {
      console.log("✅ WebSocket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ WebSocket connection error:", error);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Join room berdasarkan user role
  const joinRoom = (room) => {
    if (socket && isConnected) {
      socket.emit("join-room", room);
      console.log(`📥 Joined room: ${room}`);
    }
  };

  // Leave room
  const leaveRoom = (room) => {
    if (socket && isConnected) {
      socket.emit("leave-room", room);
      console.log(`📤 Left room: ${room}`);
    }
  };

  // Listen to event
  const on = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  // Stop listening to event
  const off = (event, callback) => {
    if (socket) {
      socket.off(event, callback);
    }
  };

  // Emit event
  const emit = (event, data) => {
    if (socket && isConnected) {
      socket.emit(event, data);
    }
  };

  const value = {
    socket,
    isConnected,
    joinRoom,
    leaveRoom,
    on,
    off,
    emit,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
