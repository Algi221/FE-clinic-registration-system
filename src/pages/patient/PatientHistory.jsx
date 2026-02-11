import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Filter,
  Stethoscope,
  Building2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-hot-toast";

const PatientHistory = () => {
  const { user } = useAuth();
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const fetchRiwayat = async () => {
    try {
      const response = await api.get("/pendaftaran");
      setRiwayat(response.data);
    } catch (error) {
      toast.error("Gagal mengambil data riwayat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayat();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" /> Terkonfirmasi
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 text-red-500 font-bold bg-red-50 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider border border-red-100">
            <XCircle className="w-3.5 h-3.5" /> Ditolak
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider border border-amber-100">
            <Clock className="w-3.5 h-3.5" /> Menunggu
          </span>
        );
    }
  };

  const filteredRiwayat = riwayat
    .filter((item) => {
      const matchesSearch =
        item.jadwal.dokter.nama
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.jadwal.dokter.poli.nama
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "ALL" || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0F6A78] text-[10px] font-bold uppercase tracking-wide border border-teal-100">
            <ShieldCheck className="w-3 h-3" />
            Rekam Medis Digital
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Riwayat Kunjungan
          </h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Daftar lengkap history konsultasi dan pendaftaran Anda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total Sesi
            </p>
            <p className="text-xl font-bold text-[#0F6A78]">{riwayat.length}</p>
          </div>
          <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-[#0F6A78]">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Cari dokter atau poli..."
            className="pl-10 bg-white border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48 relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            className="w-full h-10 pl-10 pr-4 rounded-md bg-white border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">Menunggu</option>
            <option value="ACCEPTED">Terkonfirmasi</option>
            <option value="REJECTED">Ditolak</option>
          </select>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#0F6A78] border-t-transparent mb-2"></div>
            <p className="text-slate-400 text-xs italic">Memuat data...</p>
          </div>
        ) : filteredRiwayat.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-xl">
            <p className="text-slate-500 text-sm font-medium">
              Tidak ada riwayat ditemukan.
            </p>
          </div>
        ) : (
          filteredRiwayat.map((item) => (
            <Card
              key={item.id}
              className="border border-slate-100 shadow-sm bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Date Column */}
                  <div className="p-6 md:w-48 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center justify-center text-center gap-3">
                    <p className="font-bold text-[#0F6A78] text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-400" />
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    {getStatusBadge(item.status)}
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-[#0F6A78] flex-shrink-0">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Dokter Spesialis
                        </p>
                        <h3 className="font-bold text-slate-800 text-lg">
                          {item.jadwal.dokter.nama}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {item.jadwal.dokter.poli.nama}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Jadwal
                        </p>
                        <p className="text-sm font-bold text-[#0F6A78]">
                          {item.jadwal.hari}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.jadwal.jamMulai} - {item.jadwal.jamSelesai}
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#0F6A78] transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientHistory;
