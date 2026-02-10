import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

/**
 * Component untuk menampilkan daftar pendaftaran dengan real-time updates
 * Gunakan component ini di Doctor Dashboard atau Patient Dashboard
 */
const RealtimeRegistrationList = ({ initialRegistrations = [] }) => {
  const { user } = useAuth();
  const { socket, isConnected, joinRoom, leaveRoom, on, off } = useSocket();
  const [registrations, setRegistrations] = useState(initialRegistrations);

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Join room sesuai role
    if (user?.role === "DOCTOR") {
      joinRoom("doctor");
    } else if (user?.role === "PATIENT" && user?.id) {
      joinRoom(`patient-${user.id}`);
    }

    // Handler untuk pendaftaran baru (dokter)
    const handleNewRegistration = (data) => {
      console.log("📥 New registration received:", data);

      // Tambahkan pendaftaran baru ke list
      setRegistrations((prev) => [data.data, ...prev]);

      // Tampilkan toast notification
      toast.success(
        `Pendaftaran baru dari ${data.data.pasien?.name || "pasien"}`,
        {
          duration: 5000,
          icon: "🔔",
        },
      );
    };

    // Handler untuk update status (pasien & dokter)
    const handleStatusUpdate = (data) => {
      console.log("📝 Status update received:", data);

      // Update status di list
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === data.registrationId
            ? { ...reg, status: data.status }
            : reg,
        ),
      );

      // Tampilkan toast notification
      if (user?.role === "PATIENT") {
        toast.success(data.message, {
          duration: 5000,
          icon: "✅",
        });
      }
    };

    // Handler untuk update antrian
    const handleQueueUpdate = (data) => {
      console.log("🔔 Queue update received:", data);

      // Update antrian di list jika diperlukan
      // Implementasi sesuai kebutuhan
    };

    // Register event listeners
    on("new-registration", handleNewRegistration);
    on("registration-status-update", handleStatusUpdate);
    on("queue-update", handleQueueUpdate);

    // Cleanup
    return () => {
      off("new-registration", handleNewRegistration);
      off("registration-status-update", handleStatusUpdate);
      off("queue-update", handleQueueUpdate);

      if (user?.role === "DOCTOR") {
        leaveRoom("doctor");
      } else if (user?.role === "PATIENT" && user?.id) {
        leaveRoom(`patient-${user.id}`);
      }
    };
  }, [socket, isConnected, user]);

  // Update saat initialRegistrations berubah
  useEffect(() => {
    setRegistrations(initialRegistrations);
  }, [initialRegistrations]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Menunggu",
      },
      CONFIRMED: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Dikonfirmasi",
      },
      COMPLETED: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Selesai",
      },
      CANCELLED: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Dibatalkan",
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Daftar Pendaftaran</h3>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            } animate-pulse`}
          />
          <span className="text-xs text-gray-500">
            {isConnected ? "Real-time Active" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {registrations.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>Tidak ada pendaftaran</p>
          </div>
        ) : (
          registrations.map((reg) => (
            <div
              key={reg.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {reg.pasien?.name || "Nama Pasien"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {reg.jadwal?.dokter?.name || "Dokter"} -{" "}
                    {reg.jadwal?.dokter?.poli?.name || "Poli"}
                  </p>
                  {reg.keluhan && (
                    <p className="text-sm text-gray-600 mt-1">
                      Keluhan: {reg.keluhan}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(reg.createdAt).toLocaleString("id-ID")}
                  </p>
                </div>
                <div>{getStatusBadge(reg.status)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RealtimeRegistrationList;
