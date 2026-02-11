import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Stethoscope,
  Save,
  Building2,
  BadgeCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";

const DoctorProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    clinic: "OceanCare Central",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.dokter?.noHp || "+62 812-3456-7890",
        specialization: user.dokter?.poli?.nama || "Umum",
        clinic: "OceanCare Central",
        bio: "Dokter spesialis berpengalaman dengan dedikasi tinggi terhadap kesehatan pasien. Memiliki pengalaman lebih dari 5 tahun di bidangnya.",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    toast.success("Profil berhasil diperbarui!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Profil Dokter
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola informasi profesional Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="space-y-6">
          <Card className="border border-slate-100 shadow-sm bg-white rounded-xl">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center text-[#0F6A78] text-3xl font-bold shadow-inner border border-teal-100">
                  {user?.name?.charAt(0)}
                </div>
                <div className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-slate-100 shadow-sm">
                  <BadgeCheck className="w-4 h-4 text-emerald-500" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {user?.name}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                    {formData.specialization}
                  </span>
                </div>
              </div>

              <div className="w-full pt-4 border-t border-slate-50">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Klinik</span>
                  <span className="font-medium text-slate-700">
                    {formData.clinic}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 shadow-sm bg-white rounded-xl p-5">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Kelengkapan Profil
                </h3>
                <span className="text-xs font-bold text-teal-600">85%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-teal-500 rounded-full"></div>
              </div>
              <p className="text-[10px] text-slate-400">
                Lengkapi data untuk meningkatkan kepercayaan pasien.
              </p>
            </div>
          </Card>
        </div>

        {/* Details Form */}
        <Card className="md:col-span-2 border border-slate-100 shadow-sm bg-white rounded-xl">
          <CardHeader className="px-6 py-4 border-b border-slate-50">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              Informasi Lengkap
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="uppercase text-[10px] font-bold tracking-wider text-slate-400">
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-[10px] font-bold tracking-wider text-slate-400">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-10 bg-slate-50 border-slate-200 rounded-lg text-sm text-slate-500"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-[10px] font-bold tracking-wider text-slate-400">
                  Spesialisasi
                </Label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="pl-10 h-10 bg-slate-50 border-slate-200 rounded-lg text-sm text-slate-500"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-[10px] font-bold tracking-wider text-slate-400">
                  Klinik Utama
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleChange}
                    className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="col-span-full space-y-2">
                <Label className="uppercase text-[10px] font-bold tracking-wider text-slate-400">
                  Bio Profesional
                </Label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="min-h-[100px] p-3 bg-white border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-1 focus:ring-teal-500 resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={handleSave}
                className="h-10 px-6 bg-[#0F6A78] hover:bg-[#0d5661] text-white rounded-lg font-medium text-sm shadow-sm transition-all"
              >
                <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorProfile;
