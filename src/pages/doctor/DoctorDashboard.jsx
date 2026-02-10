import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Activity,
  TrendingUp,
  Calendar,
  Stethoscope,
  User,
  AlertCircle,
  Check,
  X,
  Info,
} from "lucide-react";
import RealtimeRegistrationList from "@/components/ui/RealtimeRegistrationList";
import NotificationBell from "@/components/ui/NotificationBell";
import DoctorScheduleCalendar from "@/components/ui/DoctorScheduleCalendar";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [pendaftaran, setPendaftaran] = useState([]);
  const [jadwals, setJadwals] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    todayTotal: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchPendaftaran = async () => {
    try {
      const response = await api.get("/pendaftaran");
      const data = response.data;
      setPendaftaran(data);

      // Calculate stats
      const today = new Date().toDateString();
      const todayRegistrations = data.filter(
        (p) => new Date(p.createdAt).toDateString() === today,
      );

      setStats({
        total: data.length,
        pending: data.filter((p) => p.status === "PENDING").length,
        accepted: data.filter((p) => p.status === "ACCEPTED").length,
        rejected: data.filter((p) => p.status === "REJECTED").length,
        todayTotal: todayRegistrations.length,
      });
    } catch (error) {
      toast.error("Gagal mengambil data pendaftaran");
    } finally {
      setLoading(false);
    }
  };

  const fetchJadwals = async () => {
    try {
      const response = await api.get("/jadwal");
      // Filter jadwal untuk dokter ini saja (berdasarkan user.dokter.id)
      if (user?.dokter?.id) {
        const myJadwals = response.data.filter(
          (j) => j.dokterId === user.dokter.id,
        );
        setJadwals(myJadwals);
      }
    } catch (error) {
      console.error("Error fetching jadwals:", error);
    }
  };

  useEffect(() => {
    fetchPendaftaran();
    fetchJadwals();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/pendaftaran/${id}/status`, { status });
      toast.success(
        `Pendaftaran ${status === "ACCEPTED" ? "diterima" : "ditolak"}!`,
        {
          icon: status === "ACCEPTED" ? "✅" : "❌",
        },
      );
      fetchPendaftaran();
    } catch (error) {
      toast.error("Gagal mengubah status");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <span className="flex items-center gap-1.5 text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-full text-xs border border-green-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Diterima
          </span>
        );
      case "REJECTED":
        return (
          <span className="flex items-center gap-1.5 text-red-600 font-semibold bg-red-50 px-3 py-1.5 rounded-full text-xs border border-red-200">
            <XCircle className="w-3.5 h-3.5" /> Ditolak
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-orange-600 font-semibold bg-orange-50 px-3 py-1.5 rounded-full text-xs border border-orange-200">
            <Clock className="w-3.5 h-3.5" /> Menunggu
          </span>
        );
    }
  };

  const statCards = [
    {
      title: "Total Pasien",
      value: stats.total,
      icon: Users,
      gradient: "from-purple-500 to-indigo-500",
      bgLight: "bg-purple-50",
      textColor: "text-purple-700",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Menunggu Approval",
      value: stats.pending,
      icon: Clock,
      gradient: "from-orange-500 to-amber-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-700",
      change: stats.pending > 0 ? "Perlu Tindakan" : "Semua Selesai",
      changeType: stats.pending > 0 ? "warning" : "positive",
    },
    {
      title: "Pasien Hari Ini",
      value: stats.todayTotal,
      icon: Activity,
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-700",
      change: "Hari ini",
      changeType: "neutral",
    },
    {
      title: "Dikonfirmasi",
      value: stats.accepted,
      icon: CheckCircle2,
      gradient: "from-green-500 to-emerald-500",
      bgLight: "bg-green-50",
      textColor: "text-green-700",
      change: "+5%",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Notification Bell - Fixed Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <NotificationBell />
      </div>

      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-white opacity-10" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-40 w-40 rounded-full bg-white opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Dashboard Dokter
              </h1>
              <p className="text-purple-100 mt-2 text-lg">
                Selamat datang kembali,{" "}
                <span className="font-semibold">{user?.name}</span>
              </p>
              {/* Show Poli if available */}
              {user?.dokter?.poli && (
                <div className="mt-2 inline-flex items-center gap-2 bg-white bg-opacity-30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-semibold">
                    📍 {user.dokter.poli.nama}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Activity className="w-4 h-4" />
              <span>{stats.todayTotal} pasien hari ini</span>
            </div>
            {user?.dokter?.spesialis && (
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Stethoscope className="w-4 h-4" />
                <span>{user.dokter.spesialis}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">
                      {stat.title}
                    </p>
                    <p className={`text-4xl font-bold ${stat.textColor}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {stat.changeType === "positive" && (
                    <TrendingUp className="w-3 h-3 text-green-600" />
                  )}
                  {stat.changeType === "warning" && (
                    <AlertCircle className="w-3 h-3 text-orange-600" />
                  )}
                  <span
                    className={`font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "warning"
                          ? "text-orange-600"
                          : "text-slate-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pending Approvals Alert */}
      {stats.pending > 0 && (
        <Card className="border-l-4 border-l-orange-500 bg-orange-50 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 mb-1">
                  Perhatian: {stats.pending} Pendaftaran Menunggu Approval
                </h3>
                <p className="text-sm text-orange-700">
                  Ada pasien yang menunggu konfirmasi dari Anda. Silakan review
                  dan proses segera.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Grid: Table and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Patients Table - Left Column */}
        <div className="lg:col-span-8">
          <Card className="border-slate-200 shadow-lg h-full">
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <CardTitle>Daftar Pendaftaran Pasien</CardTitle>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                Kelola dan review pendaftaran pasien
              </p>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-indigo-600 border-t-transparent"></div>
                  <p className="mt-4 text-slate-600 font-medium">
                    Memuat data pasien...
                  </p>
                </div>
              ) : pendaftaran.length === 0 ? (
                <div className="text-center py-20 bg-gradient-to-b from-slate-50 to-white h-full flex flex-col items-center justify-center">
                  <div className="inline-flex p-6 rounded-full bg-indigo-100 mb-4">
                    <Users className="w-12 h-12 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Belum Ada Pendaftaran
                  </h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Belum ada pasien yang mendaftar. Data akan muncul di sini
                    saat ada pendaftaran baru.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead className="font-semibold text-xs py-4 px-6 uppercase tracking-wider">
                          Tanggal
                        </TableHead>
                        <TableHead className="font-semibold text-xs py-4 px-6 uppercase tracking-wider">
                          Pasien
                        </TableHead>
                        <TableHead className="font-semibold text-xs py-4 px-6 uppercase tracking-wider">
                          Jadwal
                        </TableHead>
                        <TableHead className="font-semibold text-xs py-4 px-6 uppercase tracking-wider">
                          Keluhan
                        </TableHead>
                        <TableHead className="font-semibold text-xs py-4 px-6 uppercase tracking-wider">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-xs py-4 px-6 uppercase tracking-wider text-center">
                          Aksi
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendaftaran.map((item) => (
                        <TableRow
                          key={item.id}
                          className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                        >
                          <TableCell className="font-medium text-slate-700 px-6 py-4">
                            {new Date(item.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                              },
                            )}
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                                {item.pasien?.name?.charAt(0) || "P"}
                              </div>
                              <span className="font-semibold text-slate-800">
                                {item.pasien?.name || "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-600 px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-900">
                                {item.jadwal?.hari}
                              </span>
                              <span className="text-xs text-slate-500">
                                {item.jadwal?.jamMulai} -{" "}
                                {item.jadwal?.jamSelesai}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[150px] px-6 py-4">
                            <p className="text-sm text-slate-600 truncate italic">
                              "{item.keluhan || "Tidak ada keluhan"}"
                            </p>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            {getStatusBadge(item.status)}
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            {item.status === "PENDING" ? (
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  size="sm"
                                  className="h-8 w-8 p-0 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-sm transition-all"
                                  title="Terima"
                                  onClick={() =>
                                    handleUpdateStatus(item.id, "ACCEPTED")
                                  }
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 rounded-full bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 shadow-sm transition-all"
                                  title="Tolak"
                                  onClick={() =>
                                    handleUpdateStatus(item.id, "REJECTED")
                                  }
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex justify-center">
                                {item.status === "ACCEPTED" ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Schedule Calendar - Right Column */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <DoctorScheduleCalendar jadwals={jadwals} />

            <Card className="mt-8 border-none shadow-lg bg-gradient-to-br from-indigo-900 to-indigo-800 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white opacity-10" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <Info className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold">Info Dashboard</h4>
                </div>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  Gunakan kalender di atas untuk memantau jadwal praktik rutin
                  Anda. Hari yang memiliki jadwal akan ditandai dengan titik
                  biru. Klik tanggal untuk melihat detil jam praktik.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
