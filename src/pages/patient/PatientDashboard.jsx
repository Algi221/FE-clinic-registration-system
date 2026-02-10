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
  Plus,
  Calendar,
  Activity,
  User,
  Heart,
  Stethoscope,
  ClipboardList,
  Bell,
  Info,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";
import NotificationBell from "@/components/ui/NotificationBell";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [pendaftaran, setPendaftaran] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchPendaftaran = async () => {
    try {
      const response = await api.get("/pendaftaran");
      const data = response.data;
      setPendaftaran(data);

      // Calculate stats
      setStats({
        total: data.length,
        pending: data.filter((p) => p.status === "PENDING").length,
        accepted: data.filter((p) => p.status === "ACCEPTED").length,
        rejected: data.filter((p) => p.status === "REJECTED").length,
      });
    } catch (error) {
      toast.error("Gagal mengambil data pendaftaran");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendaftaran();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <span className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-full text-xs border border-green-200">
            <CheckCircle2 className="w-3 h-3" /> Diterima
          </span>
        );
      case "REJECTED":
        return (
          <span className="flex items-center gap-1 text-red-600 font-medium bg-red-50 px-3 py-1.5 rounded-full text-xs border border-red-200">
            <XCircle className="w-3 h-3" /> Ditolak
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-orange-600 font-medium bg-orange-50 px-3 py-1.5 rounded-full text-xs border border-orange-200">
            <Clock className="w-3 h-3" /> Menunggu
          </span>
        );
    }
  };

  const statCards = [
    {
      title: "Total Kunjungan",
      value: stats.total,
      icon: ClipboardList,
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Menunggu Konfirmasi",
      value: stats.pending,
      icon: Clock,
      gradient: "from-orange-500 to-amber-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      title: "Dikonfirmasi",
      value: stats.accepted,
      icon: CheckCircle2,
      gradient: "from-green-500 to-emerald-500",
      bgLight: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Status Kesehatan",
      value: "Baik",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      bgLight: "bg-pink-50",
      textColor: "text-pink-700",
      isText: true,
    },
  ];

  const announcements = [
    {
      id: 1,
      type: "info",
      title: "Jam Operasional Klinik",
      message: "Klinik buka Senin - Sabtu, pukul 08:00 - 20:00 WIB",
      icon: Clock3,
      color: "blue",
    },
    {
      id: 2,
      type: "warning",
      title: "Protokol Kesehatan",
      message: "Harap menggunakan masker dan menjaga jarak saat berkunjung",
      icon: AlertCircle,
      color: "orange",
    },
    {
      id: 3,
      type: "success",
      title: "Layanan Baru!",
      message: "Kini tersedia layanan konsultasi online via chat",
      icon: Bell,
      color: "green",
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Notification Bell - Fixed Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <NotificationBell />
      </div>

      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-40 w-40 rounded-full bg-white opacity-10" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 rounded-full bg-white opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Selamat Datang, {user?.name}! 👋
              </h1>
              <p className="text-teal-50 mt-1">
                Kelola kesehatan Anda dengan mudah dan cepat
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/register-clinic">
              <Button className="bg-white text-teal-600 hover:bg-teal-50 font-semibold shadow-lg">
                <Plus className="mr-2 h-4 w-4" /> Daftar Konsultasi Baru
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-600 font-semibold"
            >
              <Calendar className="mr-2 h-4 w-4" /> Lihat Jadwal Dokter
            </Button>
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
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold ${stat.textColor}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Himbauan & Pengumuman Klinik */}
      <Card className="border-l-4 border-l-teal-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-600" />
            <CardTitle className="text-teal-900">
              Pengumuman & Himbauan
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {announcements.map((announcement) => {
              const Icon = announcement.icon;
              const colorMap = {
                blue: {
                  bg: "bg-blue-50",
                  border: "border-blue-200",
                  icon: "bg-blue-100 text-blue-600",
                  text: "text-blue-900",
                },
                orange: {
                  bg: "bg-orange-50",
                  border: "border-orange-200",
                  icon: "bg-orange-100 text-orange-600",
                  text: "text-orange-900",
                },
                green: {
                  bg: "bg-green-50",
                  border: "border-green-200",
                  icon: "bg-green-100 text-green-600",
                  text: "text-green-900",
                },
              };
              const colors = colorMap[announcement.color];

              return (
                <div
                  key={announcement.id}
                  className={`p-4 rounded-xl ${colors.bg} border ${colors.border} transition-all hover:shadow-md`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${colors.icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${colors.text} mb-1`}>
                        {announcement.title}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {announcement.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Informasi Klinik */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Kontak Klinik */}
        <Card className="shadow-md border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-teal-600" />
              <CardTitle>Kontak Klinik</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-100">
                <Phone className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Telepon</p>
                <p className="font-semibold text-slate-900">(021) 1234-5678</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-semibold text-slate-900">
                  info@klinikanimaliacare.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Alamat</p>
                <p className="font-semibold text-slate-900">
                  Jl. Kesehatan No. 123, Jakarta Selatan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jam Operasional */}
        <Card className="shadow-md border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b">
            <div className="flex items-center gap-2">
              <Clock3 className="w-5 h-5 text-teal-600" />
              <CardTitle>Jam Operasional</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-700 font-medium">
                  Senin - Jumat
                </span>
                <span className="text-teal-600 font-semibold">
                  08:00 - 20:00
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-700 font-medium">Sabtu</span>
                <span className="text-teal-600 font-semibold">
                  08:00 - 16:00
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-700 font-medium">Minggu</span>
                <span className="text-red-600 font-semibold">Tutup</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Riwayat Pendaftaran */}
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-teal-600" />
              <CardTitle>Riwayat Pendaftaran</CardTitle>
            </div>
            <Link to="/register-clinic">
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white shadow-md"
              >
                <Plus className="mr-2 h-4 w-4" /> Daftar Baru
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
              <p className="mt-4 text-slate-600">Memuat data...</p>
            </div>
          ) : pendaftaran.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-b from-slate-50 to-white">
              <div className="inline-flex p-6 rounded-full bg-teal-100 mb-4">
                <ClipboardList className="w-12 h-12 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Belum Ada Pendaftaran
              </h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Anda belum memiliki riwayat pendaftaran. Mulai konsultasi
                kesehatan Anda sekarang!
              </p>
              <Link to="/register-clinic">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg">
                  <Plus className="mr-2 h-4 w-4" /> Daftar Sekarang
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-semibold">Tanggal</TableHead>
                    <TableHead className="font-semibold">Poli</TableHead>
                    <TableHead className="font-semibold">Dokter</TableHead>
                    <TableHead className="font-semibold">Jadwal</TableHead>
                    <TableHead className="font-semibold">Keluhan</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendaftaran.map((item) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 text-xs font-semibold border border-teal-200">
                          {item.jadwal?.dokter?.poli?.nama || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">
                        {item.jadwal?.dokter?.nama || "N/A"}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>
                            {item.jadwal?.hari}, {item.jadwal?.jamMulai} -{" "}
                            {item.jadwal?.jamSelesai}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-slate-600 truncate">
                          {item.keluhan || "-"}
                        </p>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;
