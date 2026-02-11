import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar as CalendarIcon,
  Trash2,
  CalendarDays,
  Clock,
  Plus,
} from "lucide-react";
import { toast } from "react-hot-toast";

const DoctorSchedule = () => {
  const { user } = useAuth();
  const [jadwals, setJadwals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    hari: "Senin",
    jamMulai: "08:00",
    jamSelesai: "10:00",
  });

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
    fetchJadwals();
  }, [user]);

  const handleAddSchedule = async () => {
    if (!newSchedule.hari || !newSchedule.jamMulai || !newSchedule.jamSelesai) {
      toast.error("Mohon lengkapi data jadwal");
      return;
    }

    setLoading(true);
    try {
      // Create dokter if not exists (backend should handle this or already exist)
      // Assuming dokter profile exists for this user

      const payload = {
        ...newSchedule,
        dokterId: user.dokter?.id, // Ensure dokterId is passed
      };

      await api.post("/jadwal", payload);
      toast.success("Jadwal berhasil ditambahkan!");
      fetchJadwals();
      setNewSchedule({ hari: "Senin", jamMulai: "08:00", jamSelesai: "10:00" });
    } catch (error) {
      toast.error("Gagal menambahkan jadwal");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchedule = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) return;
    try {
      await api.delete(`/jadwal/${id}`);
      toast.success("Jadwal berhasil dihapus");
      fetchJadwals();
    } catch (error) {
      toast.error("Gagal menghapus jadwal");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-[#0F6A78] tracking-tighter">
          Kelola Jadwal Praktik
        </h1>
        <p className="text-[#0F6A78]/60 font-medium text-lg max-w-xl">
          Atur ketersediaan waktu konsultasi Anda dengan mudah dan fleksibel.
        </p>
      </div>

      {/* Add Schedule Section - Styled like the reference image */}
      <div className="bg-[#F8FAFB] rounded-[3rem] p-10 border border-teal-50 shadow-inner">
        <div className="flex items-center gap-4 mb-8">
          <CalendarDays className="w-8 h-8 text-[#0F6A78]" />
          <h3 className="text-xl font-black text-[#0F6A78]">
            Tambah Jadwal Praktek
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Day Selector */}
          <div className="relative w-full md:w-auto min-w-[200px]">
            <select
              value={newSchedule.hari}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, hari: e.target.value })
              }
              className="w-full h-14 pl-6 pr-10 rounded-2xl border-none shadow-lg text-[#0F6A78] font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-[#0F6A78] focus:outline-none"
            >
              {[
                "Senin",
                "Selasa",
                "Rabu",
                "Kamis",
                "Jumat",
                "Sabtu",
                "Minggu",
              ].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#0F6A78]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down w-5 h-5"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Time Start */}
          <div className="relative w-full md:w-auto">
            <Input
              type="time"
              value={newSchedule.jamMulai}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, jamMulai: e.target.value })
              }
              className="h-14 px-6 rounded-2xl border-none shadow-lg text-[#0F6A78] font-bold w-full md:w-auto min-w-[160px]"
            />
          </div>

          <span className="hidden md:block text-[#0F6A78] font-bold">-</span>

          {/* Time End */}
          <div className="relative w-full md:w-auto">
            <Input
              type="time"
              value={newSchedule.jamSelesai}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, jamSelesai: e.target.value })
              }
              className="h-14 px-6 rounded-2xl border-none shadow-lg text-[#0F6A78] font-bold w-full md:w-auto min-w-[160px]"
            />
          </div>

          <Button
            onClick={handleAddSchedule}
            disabled={loading}
            className="w-full md:w-auto h-14 px-8 bg-[#95D9CA] hover:bg-[#7bcbc0] text-[#0F6A78] rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all ml-auto"
          >
            {loading ? (
              "Menyimpan..."
            ) : (
              <>
                <CalendarIcon className="w-5 h-5 mr-2" /> Tambah Jadwal
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Existing Schedules Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-4">
          <Clock className="w-8 h-8 text-[#0F6A78]" />
          <h3 className="text-xl font-black text-[#0F6A78]">
            Jadwal Praktek Tersedia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jadwals.length > 0 ? (
            jadwals.map((j) => (
              <div
                key={j.id}
                className="group bg-white rounded-[2.5rem] p-8 shadow-xl border border-teal-50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                <button
                  onClick={() => handleDeleteSchedule(j.id)}
                  className="absolute top-6 right-6 p-2 rounded-xl text-red-300 hover:bg-red-50 hover:text-red-500 transition-colors z-10"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center justify-center text-center space-y-4 pt-4">
                  <h4 className="text-2xl font-black text-[#0F6A78]">
                    {j.hari}
                  </h4>
                  <div className="text-lg font-bold text-[#0F6A78]/70 flex items-center gap-2">
                    {j.jamMulai} - {j.jamSelesai}
                  </div>
                  <div className="pt-4">
                    <span className="px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-widest">
                      Aktif
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-teal-100">
              <p className="text-[#0F6A78]/40 font-bold italic">
                Belum ada jadwal yang ditambahkan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
