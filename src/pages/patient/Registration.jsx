import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

const RegistrationClinic = () => {
  const [jadwals, setJadwals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedJadwal, setSelectedJadwal] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJadwals = async () => {
      try {
        const response = await api.get("/jadwal");
        setJadwals(response.data);
      } catch (error) {
        toast.error("Gagal mengambil data jadwal dokter");
      } finally {
        setLoading(false);
      }
    };
    fetchJadwals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJadwal) return toast.error("Pilih jadwal terlebih dahulu");

    setSubmitting(true);
    try {
      await api.post("/pendaftaran", {
        jadwalId: selectedJadwal,
        keluhan,
      });
      toast.success("Pendaftaran berhasil dikirim!");
      navigate("/");
    } catch (error) {
      toast.error("Gagal mengirim pendaftaran.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="text-primary" />
            Form Pendaftaran Klinik
          </CardTitle>
          <CardDescription>
            Silakan pilih poli, dokter, dan jadwal yang tersedia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-slate-500" />
                Pilih Dokter & Poli
              </label>

              {loading ? (
                <div className="text-center py-4">Memuat jadwal...</div>
              ) : (
                <div className="grid gap-3">
                  {jadwals.map((j) => (
                    <div
                      key={j.id}
                      onClick={() => setSelectedJadwal(j.id)}
                      className={`
                        cursor-pointer border p-4 rounded-lg transition-all
                        ${
                          selectedJadwal === j.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "hover:border-slate-300 hover:bg-slate-50"
                        }
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{j.dokter.nama}</p>
                          <p className="text-sm text-slate-500">
                            {j.dokter.poli.nama} • {j.dokter.spesialis}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-primary flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {j.hari}
                          </p>
                          <p className="text-xs text-slate-500">
                            {j.jamMulai} - {j.jamSelesai}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                Keluhan (Opsional)
              </label>
              <Input
                placeholder="Tuliskan keluhan atau tujuan pendaftaran..."
                value={keluhan}
                onChange={(e) => setKeluhan(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-lg"
              disabled={submitting || !selectedJadwal}
            >
              {submitting ? "Mengirim..." : "Daftar Sekarang"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationClinic;
