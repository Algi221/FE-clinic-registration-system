import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/api";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Filter,
  ArrowUpDown,
  Stethoscope,
  Building2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";

const RiwayatPage = () => {
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
          <div className="flex items-center gap-2 text-emerald-600 font-black bg-emerald-50 px-4 py-2 rounded-2xl text-[10px] uppercase tracking-widest border border-emerald-100 shadow-sm">
            <CheckCircle2 className="w-4 h-4" /> Terkonfirmasi
          </div>
        );
      case "REJECTED":
        return (
          <div className="flex items-center gap-2 text-red-500 font-black bg-red-50 px-4 py-2 rounded-2xl text-[10px] uppercase tracking-widest border border-red-100 shadow-sm">
            <XCircle className="w-4 h-4" /> Ditolak
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-amber-600 font-black bg-amber-50 px-4 py-2 rounded-2xl text-[10px] uppercase tracking-widest border border-amber-100 shadow-sm">
            <Clock className="w-4 h-4" /> Menunggu
          </div>
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
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-teal-50 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-[#0F6A78] text-[10px] font-black uppercase tracking-[0.2em] border border-teal-100">
            <ShieldCheck className="w-4 h-4" />
            Rekam Medis Digital
          </div>
          <h1 className="text-5xl font-black text-[#0F6A78] tracking-tighter">
            Riwayat Kunjungan
          </h1>
          <p className="text-[#0F6A78]/60 font-medium text-lg max-w-lg">
            Akses seluruh data pendaftaran dan status konsultasi Anda secara
            transparan.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
              Total Sesi
            </p>
            <p className="text-3xl font-black text-[#0F6A78]">
              {riwayat.length}
            </p>
          </div>
          <div className="w-16 h-16 bg-[#0F6A78] rounded-[2rem] flex items-center justify-center text-white shadow-xl rotate-12">
            <FileText className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F6A78] transition-colors" />
          <input
            type="text"
            placeholder="Cari dokter atau poliklinik..."
            className="w-full h-16 pl-16 pr-6 rounded-[1.25rem] bg-teal-50/20 border-2 border-teal-50 focus:border-[#0F6A78] outline-none transition-all font-bold text-[#0F6A78] placeholder:text-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative group">
          <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F6A78] transition-colors" />
          <select
            className="w-full h-16 pl-16 pr-6 rounded-[1.25rem] bg-teal-50/20 border-2 border-teal-50 focus:border-[#0F6A78] outline-none appearance-none font-bold text-[#0F6A78] cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">Menunggu</option>
            <option value="ACCEPTED">Terkonfirmasi</option>
            <option value="REJECTED">Ditolak</option>
          </select>
        </div>
        <div className="flex items-center justify-center h-16 border-2 border-dashed border-teal-100 rounded-[1.25rem] text-[10px] font-black text-teal-300 uppercase tracking-widest">
          Short by Latest Date <ArrowUpDown className="ml-2 w-3 h-3" />
        </div>
      </div>

      {/* History List */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="py-32 text-center bg-teal-50/20 rounded-[3rem] border-2 border-teal-50">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0F6A78] border-t-transparent"></div>
            <p className="mt-6 text-[#0F6A78] font-black italic">
              Membuka Arsip Medis...
            </p>
          </div>
        ) : filteredRiwayat.length === 0 ? (
          <div className="py-32 text-center bg-teal-50/20 rounded-[3rem] border-2 border-dashed border-teal-100 italic font-bold text-slate-400">
            Belum ada data pendaftaran yang ditemukan.
          </div>
        ) : (
          filteredRiwayat.map((item) => (
            <Card
              key={item.id}
              className="border-none shadow-[0_15px_40px_-15px_rgba(15,106,120,0.1)] rounded-[2.5rem] overflow-hidden group hover:shadow-[0_25px_60px_-15px_rgba(15,106,120,0.15)] transition-all duration-500"
            >
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row lg:items-center">
                  {/* Status & Date Side */}
                  <div className="p-10 lg:w-72 bg-[#F8FDFF] border-b lg:border-b-0 lg:border-r border-teal-50 flex flex-col justify-center items-center text-center gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        Tanggal Daftar
                      </p>
                      <p className="font-black text-[#0F6A78] flex items-center gap-2 justify-center">
                        <Calendar className="w-4 h-4 text-teal-400" />
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 p-10 grid md:grid-cols-2 gap-10 items-center">
                    <div className="flex items-center gap-8">
                      <div className="w-20 h-20 rounded-3xl bg-teal-50/50 flex items-center justify-center text-[#0F6A78] shadow-inner group-hover:scale-110 transition-transform">
                        <Stethoscope className="w-10 h-10" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest leading-none mb-1">
                          Dokter Spesialis
                        </p>
                        <h3 className="text-2xl font-black text-[#0F6A78] tracking-tight">
                          {item.jadwal.dokter.nama}
                        </h3>
                        <p className="text-sm font-bold text-[#0F6A78]/50 flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5" />{" "}
                          {item.jadwal.dokter.poli.nama}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1 p-6 bg-teal-50/30 rounded-[1.5rem] border border-teal-50/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-3.5 h-3.5 text-teal-400" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Jadwal Sesi
                          </p>
                        </div>
                        <p className="font-bold text-[#0F6A78]">
                          {item.jadwal.hari}, {item.jadwal.jamMulai} -{" "}
                          {item.jadwal.jamSelesai}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white border border-teal-50 flex items-center justify-center text-[#0F6A78] opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Security Disclaimer */}
      <div className="py-10 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
          Integrated Secure Medical Record v2.0
        </p>
      </div>
    </div>
  );
};

export default RiwayatPage;
