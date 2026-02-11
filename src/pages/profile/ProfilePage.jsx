import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Shield,
  Camera,
  Edit2,
  Check,
  X,
  Phone,
  MapPin,
  Calendar,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "0812-3456-7890",
    address: user?.address || "Jl. Kesehatan No. 123, Jakarta",
    gender: user?.gender || "Laki-laki",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Profil berhasil diperbarui!");
      setIsEditing(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Profile Section */}
      <div className="relative h-64 bg-gradient-to-br from-[#0F6A78] via-[#148ea1] to-[#012a31] rounded-[3rem] shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-8 flex items-end gap-10 translate-y-20 group-hover:translate-y-16 transition-transform duration-700">
          <div className="relative group/avatar">
            <div className="w-44 h-44 rounded-[2.5rem] bg-white p-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
              <div className="w-full h-full rounded-[2rem] bg-teal-50 flex items-center justify-center text-[#0F6A78] overflow-hidden relative border-4 border-teal-50/50">
                <User
                  size={80}
                  className="opacity-10 group-hover/avatar:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-[#0F6A78]/60 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 cursor-pointer">
                  <Camera className="text-white w-10 h-10 -translate-y-2 group-hover/avatar:translate-y-0 transition-transform" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <ShieldCheck className="text-emerald-500 w-6 h-6" />
            </div>
          </div>
          <div className="mb-24 space-y-2">
            <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-xl">
              {user?.name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="px-5 py-2 bg-white/10 backdrop-blur-xl rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] border border-white/20 shadow-lg">
                Member {user?.role}
              </div>
              <div className="flex items-center gap-1.5 text-teal-300 text-xs font-black uppercase tracking-widest bg-[#0F6A78]/40 px-3 py-1.5 rounded-xl backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 fill-teal-300" /> Aktif
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left column: Quick Cards */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="p-8 border-b border-teal-50 bg-[#F8FDFF]">
              <CardTitle className="text-sm font-black text-[#0F6A78] uppercase tracking-widest">
                Informasi Kontak
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              {[
                { label: "Alamat Email", value: user?.email, icon: Mail },
                { label: "Nomor WhatsApp", value: formData.phone, icon: Phone },
                {
                  label: "Domisili Saat Ini",
                  value: formData.address,
                  icon: MapPin,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0F6A78] flex items-center justify-center shrink-0 group-hover:bg-[#0F6A78] group-hover:text-white transition-all duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="font-bold text-[#0F6A78] leading-tight">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}

              <div className="pt-6">
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl border-2 border-teal-50 text-[#0F6A78] hover:bg-teal-50 font-black text-xs uppercase tracking-[0.2em] transition-all"
                  onClick={() =>
                    toast("Fitur ganti password akan segera hadir", {
                      icon: "🔒",
                    })
                  }
                >
                  <Lock className="w-4 h-4 mr-2" /> Keamanan Akun
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="p-10 bg-[#0F6A78] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <Shield className="w-12 h-12 text-teal-300 mb-6" />
            <h4 className="text-2xl font-black mb-4 tracking-tight">
              Privasi Anda Prioritas Kami
            </h4>
            <p className="text-teal-50/60 font-medium text-sm leading-relaxed">
              Seluruh data medis dan profil personal Anda terenkripsi dengan
              standar keamanan data tingkat tinggi Klinik OceanCare.
            </p>
          </div>
        </div>

        {/* Right column: Form Details */}
        <div className="lg:col-span-8">
          <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-12 bg-[#F8FDFF] border-b border-teal-50">
              <div>
                <CardTitle className="text-3xl font-black text-[#0F6A78] tracking-tighter">
                  Detail Profil
                </CardTitle>
                <p className="text-[#0F6A78]/50 font-bold text-xs uppercase tracking-widest mt-1">
                  Management Informasi Personal
                </p>
              </div>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#0F6A78] hover:bg-[#148ea1] text-white h-12 px-6 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-900/10 active:scale-95 transition-all"
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Edit Profil
                </Button>
              ) : (
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    className="text-red-400 font-bold hover:bg-red-50"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="bg-[#0F6A78] hover:bg-[#148ea1] text-white h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-900/10 active:scale-95 transition-all"
                  >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-12">
              <form
                onSubmit={handleUpdate}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                {[
                  { label: "Nama Lengkap", key: "name", icon: User },
                  {
                    label: "Email (Terverifikasi)",
                    key: "email",
                    icon: Mail,
                    disabled: true,
                  },
                  { label: "Nomor WhatsApp", key: "phone", icon: Phone },
                  { label: "Jenis Kelamin", key: "gender", icon: User },
                ].map((field) => (
                  <div key={field.key} className="space-y-3">
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                      <field.icon className="w-3 h-3" /> {field.label}
                    </label>
                    <div className="relative">
                      <Input
                        disabled={field.disabled || !isEditing}
                        value={formData[field.key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.key]: e.target.value,
                          })
                        }
                        className={`h-14 px-6 rounded-2xl border-2 transition-all font-bold text-[#0F6A78] ${
                          !isEditing
                            ? "bg-teal-50/30 border-transparent text-[#0F6A78]/60 cursor-not-allowed"
                            : "bg-white border-teal-50 focus:border-[#0F6A78] shadow-inner"
                        }`}
                      />
                      {field.disabled && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <ShieldCheck className="w-5 h-5 text-teal-400" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="md:col-span-2 space-y-3 pt-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Alamat Lengkap Sesuai
                    Identitas
                  </label>
                  <textarea
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className={`w-full h-32 p-6 rounded-[2rem] border-2 transition-all font-bold text-[#0F6A78] resize-none outline-none ${
                      !isEditing
                        ? "bg-teal-50/30 border-transparent text-[#0F6A78]/60 cursor-not-allowed"
                        : "bg-white border-teal-50 focus:border-[#0F6A78] shadow-inner"
                    }`}
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
