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
  Stethoscope,
  User,
  AlertCircle,
  Check,
  X,
  Info,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import DoctorScheduleCalendar from "@/components/ui/DoctorScheduleCalendar";

import TextType from "@/components/ui/TextType";

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
          className: "font-bold text-[#0F6A78]",
        },
      );
      fetchPendaftaran();
    } catch (error) {
      toast.error("Gagal memperbarui status");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <div className="inline-flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" /> Diterima
          </div>
        );
      case "REJECTED":
        return (
          <div className="inline-flex items-center gap-1.5 text-red-500 font-bold bg-red-50 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider border border-red-100">
            <XCircle className="w-3.5 h-3.5" /> Ditolak
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-1.5 text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider border border-amber-100">
            <Clock className="w-3.5 h-3.5" /> Pending
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Doctor Banner - Modern Minimalist */}
      <section className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Doctor Portal
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              Selamat Datang,{" "}
              <span className="text-[#0F6A78]">{user?.name}</span>
            </h1>
            <TextType
              text="Pantau antrian hari ini dan kelola jadwal praktik Anda dengan mudah."
              className="text-slate-500 text-sm max-w-lg leading-relaxed mt-1 block"
              loop={false}
              showCursor={true}
              cursorCharacter="_"
              typingSpeed={30}
            />
          </div>
          <div className="hidden md:block">
            <div className="p-4 bg-teal-50 rounded-2xl">
              <Stethoscope className="w-8 h-8 text-[#0F6A78]" />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Grid - Smaller Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Pendaftar Hari Ini",
            value: stats.todayTotal,
            icon: Users,
            color: "text-[#0F6A78]",
            bg: "bg-teal-50",
          },
          {
            label: "Menunggu Approval",
            value: stats.pending,
            icon: Clock,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Total Pasien",
            value: stats.total,
            icon: Activity,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
          },
          {
            label: "Tren Mingguan",
            value: "+12%",
            icon: TrendingUp,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl bg-white"
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`w-10 h-10 ${stat.bg} rounded-full flex items-center justify-center`}
              >
                <stat.icon size={18} className={stat.color} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Queue List - Clean Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="p-6 bg-white border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-slate-800">
                  Antrian Pendaftaran
                </CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                  Daftar pasien yang terdaftar hari ini.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-medium text-[#0F6A78] hover:bg-teal-50"
              >
                Lihat Semua <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="font-semibold text-slate-500 text-xs px-6 py-4">
                        Pasien
                      </TableHead>
                      <TableHead className="font-semibold text-slate-500 text-xs px-6 py-4">
                        Jadwal
                      </TableHead>
                      <TableHead className="font-semibold text-slate-500 text-xs px-6 py-4">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-slate-500 text-xs px-6 py-4 text-right">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-40 text-center">
                          <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-[#0F6A78] border-t-transparent mb-2"></div>
                          <p className="text-slate-400 text-xs text-center">
                            Memuat data...
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : pendaftaran.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-40 text-center text-slate-400 text-sm"
                        >
                          Belum ada antrian saat ini.
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendaftaran.map((item) => (
                        <TableRow
                          key={item.id}
                          className="hover:bg-slate-50/50 transition-colors border-slate-50"
                        >
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#0F6A78] text-xs font-bold">
                                {item.pasien.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-slate-700 text-sm">
                                  {item.pasien.name}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                                  {item.keluhan || "-"}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="text-xs">
                              <span className="font-medium text-slate-700 block">
                                {item.jadwal.hari}
                              </span>
                              <span className="text-slate-400">
                                {item.jadwal.jamMulai} -{" "}
                                {item.jadwal.jamSelesai}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            {getStatusBadge(item.status)}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-right">
                            {item.status === "PENDING" ? (
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleUpdateStatus(item.id, "ACCEPTED")
                                  }
                                  className="h-8 w-8 p-0 bg-white border border-slate-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 rounded-lg shadow-sm transition-all"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleUpdateStatus(item.id, "REJECTED")
                                  }
                                  className="h-8 w-8 p-0 bg-white border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-lg shadow-sm transition-all"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-slate-300 text-xs">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <DoctorScheduleCalendar jadwals={jadwals} pendaftaran={pendaftaran} />

          <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#0F6A78] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  Butuh Bantuan?
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  Hubungi tim IT jika mengalami kendala sistem.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs h-8 border-slate-200 text-slate-600 hover:text-[#0F6A78]"
                >
                  Hubungi Support
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
