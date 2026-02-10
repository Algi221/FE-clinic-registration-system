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
import { Input } from "@/components/ui/input";
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
      toast.success("Pendaftaran berhasil dikirim! 🎉", { duration: 4000 });
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal mengirim pendaftaran",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Pilih Poli", icon: Building2 },
    { number: 2, title: "Pilih Jadwal", icon: Calendar },
    { number: 3, title: "Keluhan", icon: MessageSquare },
    { number: 4, title: "Konfirmasi", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg mb-4">
            <ClipboardList className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Pendaftaran Klinik
          </h1>
          <p className="text-slate-600">
            Daftar konsultasi dengan dokter pilihan Anda
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.number;
              const isCompleted = step > s.number;

              return (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 text-white shadow-lg"
                          : isActive
                            ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg scale-110"
                            : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <p
                      className={`mt-2 text-xs font-medium ${
                        isActive
                          ? "text-teal-600"
                          : isCompleted
                            ? "text-green-600"
                            : "text-slate-500"
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                        step > s.number ? "bg-green-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-none">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
            <CardTitle className="flex items-center gap-2 text-2xl">
              {step === 1 && (
                <>
                  <Building2 className="text-teal-600" />
                  Pilih Poliklinik
                </>
              )}
              {step === 2 && (
                <>
                  <Calendar className="text-teal-600" />
                  Pilih Dokter & Jadwal
                </>
              )}
              {step === 3 && (
                <>
                  <MessageSquare className="text-teal-600" />
                  Keluhan Anda
                </>
              )}
              {step === 4 && (
                <>
                  <CheckCircle2 className="text-teal-600" />
                  Konfirmasi Pendaftaran
                </>
              )}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Pilih poliklinik sesuai kebutuhan Anda"}
              {step === 2 &&
                `${selectedPoli?.nama} - Pilih dokter dan jadwal yang tersedia`}
              {step === 3 && "Ceritakan keluhan atau tujuan konsultasi Anda"}
              {step === 4 && "Periksa kembali data pendaftaran Anda"}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
                <p className="mt-4 text-slate-600">Memuat data...</p>
              </div>
            ) : (
              <>
                {/* Step 1: Pilih Poli */}
                {step === 1 && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {polis.map((poli) => (
                      <div
                        key={poli.id}
                        onClick={() => handlePoliSelect(poli)}
                        className="cursor-pointer p-6 rounded-2xl border-2 border-slate-200 hover:border-teal-400 hover:bg-teal-50 transition-all duration-300 hover:shadow-lg group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl group-hover:scale-110 transition-transform">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-slate-900 mb-1">
                              {poli.nama}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {poli.deskripsi || "Layanan kesehatan"}
                            </p>
                            <div className="mt-3 flex items-center text-teal-600 font-medium text-sm">
                              Pilih Poli
                              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2: Pilih Dokter & Jadwal */}
                {step === 2 && (
                  <div className="space-y-4">
                    {filteredJadwals.length === 0 ? (
                      <div className="text-center py-12 bg-slate-50 rounded-xl">
                        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-600">
                          Belum ada jadwal tersedia untuk poli ini
                        </p>
                      </div>
                    ) : (
                      filteredJadwals.map((jadwal) => (
                        <div
                          key={jadwal.id}
                          onClick={() => handleJadwalSelect(jadwal)}
                          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                            selectedJadwal?.id === jadwal.id
                              ? "border-teal-500 bg-teal-50 shadow-lg ring-2 ring-teal-200"
                              : "border-slate-200 hover:border-teal-300 hover:bg-slate-50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className={`p-4 rounded-xl transition-all ${
                                  selectedJadwal?.id === jadwal.id
                                    ? "bg-gradient-to-br from-teal-500 to-cyan-500"
                                    : "bg-gradient-to-br from-slate-100 to-slate-200"
                                }`}
                              >
                                <Stethoscope
                                  className={`w-6 h-6 ${
                                    selectedJadwal?.id === jadwal.id
                                      ? "text-white"
                                      : "text-slate-600"
                                  }`}
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-slate-900">
                                  {jadwal.dokter.nama}
                                </h3>
                                <p className="text-sm text-slate-600">
                                  {jadwal.dokter.spesialis}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-teal-600 font-semibold mb-1">
                                <Calendar className="w-4 h-4" />
                                {jadwal.hari}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Clock className="w-3.5 h-3.5" />
                                {jadwal.jamMulai} - {jadwal.jamSelesai}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Step 3: Keluhan */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">
                            Informasi
                          </h4>
                          <p className="text-sm text-blue-700">
                            Keluhan yang jelas akan membantu dokter
                            mempersiapkan konsultasi dengan lebih baik.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Keluhan atau Tujuan Konsultasi (Opsional)
                      </label>
                      <textarea
                        className="w-full min-h-[150px] p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
                        placeholder="Contoh: Saya mengalami sakit kepala sejak 2 hari yang lalu, disertai demam ringan..."
                        value={keluhan}
                        onChange={(e) => setKeluhan(e.target.value)}
                      />
                      <p className="text-xs text-slate-500">
                        {keluhan.length}/500 karakter
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <h3 className="font-bold text-green-900 text-lg">
                          Data Pendaftaran Anda
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                          <User className="w-5 h-5 text-teal-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Nama Pasien
                            </p>
                            <p className="font-semibold text-slate-900">
                              {user?.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                          <Building2 className="w-5 h-5 text-teal-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Poliklinik
                            </p>
                            <p className="font-semibold text-slate-900">
                              {selectedPoli?.nama}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                          <Stethoscope className="w-5 h-5 text-teal-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Dokter
                            </p>
                            <p className="font-semibold text-slate-900">
                              {selectedJadwal?.dokter.nama}
                            </p>
                            <p className="text-sm text-slate-600">
                              {selectedJadwal?.dokter.spesialis}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                          <Calendar className="w-5 h-5 text-teal-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Jadwal
                            </p>
                            <p className="font-semibold text-slate-900">
                              {selectedJadwal?.hari}, {selectedJadwal?.jamMulai}{" "}
                              - {selectedJadwal?.jamSelesai}
                            </p>
                          </div>
                        </div>

                        {keluhan && (
                          <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                            <MessageSquare className="w-5 h-5 text-teal-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-slate-500 mb-1">
                                Keluhan
                              </p>
                              <p className="text-sm text-slate-700">
                                {keluhan}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>

          {/* Footer Actions */}
          {!loading && (
            <div className="px-8 pb-8 flex items-center justify-between gap-4">
              {step > 1 && step < 4 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>
              )}

              {step === 4 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>
              )}

              <div className="flex-1" />

              {step === 3 && (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg flex items-center gap-2 px-8"
                >
                  Lanjutkan
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {step === 4 && (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg flex items-center gap-2 px-8"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Konfirmasi Pendaftaran
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RegistrationClinic;
