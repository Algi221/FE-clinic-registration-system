import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  ClipboardList,
  Stethoscope,
  Calendar,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  User,
  Building2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const RegistrationClinic = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Poli, 2: Dokter & Jadwal, 3: Keluhan, 4: Confirmation
  const [polis, setPolis] = useState([]);
  const [jadwals, setJadwals] = useState([]);
  const [filteredJadwals, setFilteredJadwals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form data
  const [selectedPoli, setSelectedPoli] = useState(null);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [keluhan, setKeluhan] = useState("");

  const navigate = useNavigate();

  // Fetch poli dan jadwal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [poliRes, jadwalRes] = await Promise.all([
          api.get("/poli"),
          api.get("/jadwal"),
        ]);
        setPolis(poliRes.data);
        setJadwals(jadwalRes.data);
      } catch (error) {
        toast.error("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter jadwal berdasarkan poli yang dipilih
  useEffect(() => {
    if (selectedPoli) {
      const filtered = jadwals.filter(
        (j) => j.dokter.poliId === selectedPoli.id,
      );
      setFilteredJadwals(filtered);
    }
  }, [selectedPoli, jadwals]);

  const handlePoliSelect = (poli) => {
    setSelectedPoli(poli);
    setSelectedJadwal(null); // Reset jadwal selection
    setStep(2);
  };

  const handleJadwalSelect = (jadwal) => {
    setSelectedJadwal(jadwal);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 2) {
      setSelectedPoli(null);
      setSelectedJadwal(null);
    }
    if (step === 3) {
      setSelectedJadwal(null);
    }
    setStep(step - 1);
  };

  const handleNext = () => {
    if (step === 3) {
      setStep(4); // Go to confirmation
    }
  };

  const handleSubmit = async () => {
    if (!selectedJadwal) {
      return toast.error("Pilih jadwal terlebih dahulu");
    }

    setSubmitting(true);
    try {
      await api.post("/pendaftaran", {
        jadwalId: selectedJadwal.id,
        keluhan: keluhan || null,
      });
      toast.success("Pendaftaran berhasil!", { duration: 4000 });
      navigate("/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal mengirim pendaftaran",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Poli", icon: Building2 },
    { number: 2, title: "Jadwal", icon: Calendar },
    { number: 3, title: "Info", icon: MessageSquare },
    { number: 4, title: "Selesai", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Section - Medium Size */}
        <div className="flex flex-col items-center text-center space-y-3 pb-8 border-b border-slate-100">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Reservasi Klinik
          </h1>
          <p className="text-slate-500 text-base max-w-lg">
            Lengkapi data di bawah ini untuk membuat janji temu baru dengan
            dokter kami.
          </p>
        </div>

        {/* Progress Tracker - Minimalist */}
        {/* Progress Tracker - Medium Size */}
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-12 w-full px-6">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = step === s.number;
            const isCompleted = step > s.number;

            return (
              <div
                key={s.number}
                className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
              >
                {/* The Step */}
                <div className="flex flex-col items-center gap-3 relative z-10 min-w-[80px]">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#0F6A78] text-white ring-4 ring-teal-50 shadow-xl scale-110"
                        : isCompleted
                          ? "bg-teal-500 text-white shadow-md"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-[#0F6A78]" : "text-slate-400"}`}
                  >
                    {s.title}
                  </span>
                </div>

                {/* The Connector (Dots) */}
                {index < steps.length - 1 && (
                  <div className="flex-1 flex items-center justify-center gap-2 px-2 -mt-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          step > s.number ? "bg-teal-400" : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#0F6A78] border-t-transparent mb-2"></div>
            <p className="text-slate-400 text-xs italic">Memuat data...</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[400px]">
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {polis.map((poli) => (
                  <div
                    key={poli.id}
                    onClick={() => handlePoliSelect(poli)}
                    className="group cursor-pointer p-6 rounded-2xl border-2 border-slate-50 bg-white hover:border-[#0F6A78]/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-[#0F6A78] flex-shrink-0 group-hover:bg-[#0F6A78] group-hover:text-white transition-colors shadow-sm">
                        <Building2 className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-[#0F6A78] mb-1">
                          {poli.nama}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                          {poli.deskripsi ||
                            "Pelayanan medis spesialistik profesional."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6 px-1 py-2 bg-teal-50/50 rounded-lg border border-teal-100">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wide pl-2">
                    Poli Terpilih:
                  </span>
                  <span className="text-sm font-bold text-[#0F6A78] bg-white px-3 py-1 rounded-md shadow-sm border border-teal-100">
                    {selectedPoli?.nama}
                  </span>
                </div>

                {filteredJadwals.length === 0 ? (
                  <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">
                      Jadwal Tidak Tersedia
                    </h3>
                    <p className="text-slate-500 text-base mt-2">
                      Belum ada jadwal dokter untuk poli ini.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredJadwals.map((jadwal) => (
                      <div
                        key={jadwal.id}
                        onClick={() => handleJadwalSelect(jadwal)}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${
                          selectedJadwal?.id === jadwal.id
                            ? "border-[#0F6A78] bg-teal-50/40 shadow-md ring-1 ring-[#0F6A78]/20"
                            : "border-slate-100 bg-white hover:border-[#0F6A78]/50 hover:shadow-lg"
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm ${selectedJadwal?.id === jadwal.id ? "bg-[#0F6A78] text-white" : "bg-slate-50 text-slate-500 group-hover:bg-slate-100"}`}
                          >
                            <User className="w-7 h-7" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg mb-1">
                              {jadwal.dokter.nama}
                            </h4>
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-teal-100/50 text-teal-700 text-xs font-bold uppercase tracking-wide">
                              {jadwal.dokter.spesialis}
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center justify-end gap-2 text-slate-700 text-sm font-semibold">
                            <Calendar className="w-4 h-4 text-[#0F6A78]" />{" "}
                            {jadwal.hari}
                          </div>
                          <div className="flex items-center justify-end gap-2 text-slate-600 text-sm font-medium">
                            <Clock className="w-4 h-4 text-amber-500" />{" "}
                            {jadwal.jamMulai} - {jadwal.jamSelesai}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100 flex gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-[#0F6A78] shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0F6A78] mb-1">
                      Deskripsi Keluhan
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                      Mohon jelaskan kondisi kesehatan Anda secara rinci,
                      termasuk gejala yang dirasakan dan berapa lama sudah
                      berlangsung. Informasi ini membantu dokter kami
                      mempersiapkan penanganan terbaik.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Tuliskan Keluhan Anda
                  </label>
                  <textarea
                    className="w-full min-h-[200px] p-6 rounded-2xl bg-white border-2 border-slate-100 focus:border-[#0F6A78] focus:ring-4 focus:ring-teal-50 outline-none transition-all text-base text-slate-800 placeholder:text-slate-400 resize-none shadow-sm"
                    placeholder="Contoh: Saya mengalami demam tinggi sejak 2 hari yang lalu, disertai pusing dan mual..."
                    value={keluhan}
                    onChange={(e) => setKeluhan(e.target.value)}
                  />
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs text-slate-400 italic">
                      *Wajib diisi dengan jelas
                    </span>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                      {keluhan.length} / 500
                    </span>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <Card className="border border-slate-100 shadow-lg rounded-3xl overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/80 border-b border-slate-100 p-8">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-[#0F6A78] rounded-full flex items-center justify-center text-white shadow-xl ring-4 ring-teal-50 mb-2">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-800">
                        Konfirmasi Pendaftaran
                      </CardTitle>
                      <CardDescription className="text-sm text-slate-500 mt-1">
                        Silakan periksa kembali data pendaftaran Anda sebelum
                        melanjutkan
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Nama Pasien", value: user?.name, icon: User },
                      {
                        label: "Poli Tujuan",
                        value: selectedPoli?.nama,
                        icon: Building2,
                      },
                      {
                        label: "Dokter Pemeriksa",
                        value: selectedJadwal?.dokter.nama,
                        icon: Stethoscope,
                      },
                      {
                        label: "Jadwal",
                        value: `${selectedJadwal?.hari}, ${selectedJadwal?.jamMulai} - ${selectedJadwal?.jamSelesai}`,
                        icon: Clock,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-teal-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <item.icon className="w-4 h-4 text-teal-500" />
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {item.label}
                          </p>
                        </div>
                        <p className="font-bold text-slate-800 text-lg">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {keluhan && (
                    <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-4 h-4 text-amber-500" />
                        <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                          Catatan Keluhan
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-amber-100 shadow-sm">
                        <p className="text-base text-slate-700 italic leading-relaxed">
                          "{keluhan}"
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
              {step > 1 ? (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 h-14 px-8 text-base rounded-xl"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => navigate("/home")}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 h-14 px-8 text-base rounded-xl"
                >
                  Batal
                </Button>
              )}

              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={step === 2 && !selectedJadwal}
                  className="bg-[#0F6A78] hover:bg-[#0d5661] text-white h-14 px-10 text-base font-bold shadow-lg rounded-xl transition-all hover:scale-105 active:scale-95"
                >
                  Lanjut <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-[#0F6A78] hover:bg-[#0d5661] text-white h-14 px-12 text-base font-bold shadow-xl rounded-xl transition-all hover:scale-105 active:scale-95"
                >
                  {submitting ? "Memproses..." : "Konfirmasi Booking"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationClinic;
