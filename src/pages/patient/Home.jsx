import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
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
  Activity,
  ClipboardList,
  Bell,
  Info,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import TextType from "@/components/ui/TextType";

const PatientDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
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
          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" /> {t("confirmed")}
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 text-red-500 font-bold bg-red-50 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider border border-red-100">
            <XCircle className="w-3.5 h-3.5" /> {t("rejected")}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider border border-amber-100">
            <Clock className="w-3.5 h-3.5" /> {t("waiting")}
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Banner - Modern Minimalist */}
      <section className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Patient Portal
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
                {t("welcome")}{" "}
                <span className="text-[#0F6A78]">{user?.name}</span>
              </h1>
              <TextType
                text={t("welcome_message")}
                className="text-slate-500 text-sm max-w-lg leading-relaxed mt-2 block"
                loop={false}
                showCursor={true}
                cursorCharacter="_"
                typingSpeed={30}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Link to="/register-clinic">
                <Button className="h-10 px-6 bg-[#0F6A78] hover:bg-[#0d5661] text-white rounded-lg font-medium text-sm shadow-sm transition-all">
                  <Plus className="w-4 h-4 mr-2" /> {t("new_appointment")}
                </Button>
              </Link>
              <Link to="/patient/history">
                <Button
                  variant="outline"
                  className="h-10 px-6 border-slate-200 text-slate-600 hover:text-[#0F6A78] rounded-lg font-medium text-sm"
                >
                  {t("history")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="p-4 bg-teal-50 rounded-2xl">
              <Activity className="w-8 h-8 text-[#0F6A78]" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Summary - Minimal Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: t("total_visits"),
            value: stats.total,
            icon: ClipboardList,
            color: "text-[#0F6A78]",
            bg: "bg-teal-50",
          },
          {
            label: t("waiting"),
            value: stats.pending,
            icon: Clock,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: t("confirmed"),
            value: stats.accepted,
            icon: CheckCircle2,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
          },
          {
            label: t("rejected"),
            value: stats.rejected,
            icon: XCircle,
            color: "text-red-500",
            bg: "bg-red-50",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl bg-white"
          >
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div
                className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center mb-3`}
              >
                <item.icon size={18} className={item.color} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  {item.value}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Registrations Table */}
      <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-6 bg-white border-b border-slate-50 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-slate-800">
              {t("recent_registrations")}
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">
              {t("recent_registrations_desc")}
            </p>
          </div>
          <Link to="/patient/history">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-medium text-[#0F6A78] hover:bg-teal-50"
            >
              {t("view_all")} <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#0F6A78] border-t-transparent mb-2"></div>
              <p className="text-slate-400 text-xs italic">Memuat data...</p>
            </div>
          ) : pendaftaran.length === 0 ? (
            <div className="py-16 text-center px-6">
              <div className="inline-flex p-4 rounded-full bg-slate-50 mb-4 text-slate-300">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-700 mb-2">
                {t("no_history")}
              </h3>
              <p className="text-slate-400 text-xs max-w-xs mx-auto mb-6">
                {t("no_history_desc")}
              </p>
              <Link to="/register-clinic">
                <Button className="h-9 px-6 rounded-lg bg-[#0F6A78] hover:bg-[#0d5661] text-white font-medium text-xs shadow-sm">
                  {t("register_now")}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="py-4 px-6 font-semibold text-slate-500 text-xs">
                      Dokter & Poli
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-slate-500 text-xs">
                      Keluhan
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-slate-500 text-xs">
                      Jadwal
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-slate-500 text-xs text-right">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendaftaran.slice(0, 5).map((item) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors border-slate-50"
                    >
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#0F6A78]">
                            <Stethoscope className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-700 text-sm">
                              {item.jadwal?.dokter?.nama}
                            </p>
                            <p className="text-[10px] text-slate-400 flex items-center gap-1 uppercase tracking-tight">
                              <MapPin className="w-3 h-3" />
                              {item.jadwal?.dokter?.poli?.nama}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <p className="text-sm text-slate-600 truncate max-w-[150px]">
                          {item.keluhan || "-"}
                        </p>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="text-xs">
                          <span className="font-medium text-slate-700 block">
                            {item.jadwal?.hari}
                          </span>
                          <span className="text-slate-400">
                            {item.jadwal?.jamMulai} - {item.jadwal?.jamSelesai}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-right">
                        {getStatusBadge(item.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Cards - Minimal List */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-slate-100 shadow-sm rounded-xl p-5 hover:border-teal-100 transition-colors group bg-white">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-[#0F6A78] flex-shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-[#0F6A78] transition-colors">
                {t("notification_active")}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t("notification_desc")}
              </p>
            </div>
          </div>
        </Card>

        <Card className="border border-slate-100 shadow-sm rounded-xl p-5 hover:border-amber-100 transition-colors group bg-white">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-amber-600 transition-colors">
                {t("visit_info")}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t("visit_info_desc")}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
