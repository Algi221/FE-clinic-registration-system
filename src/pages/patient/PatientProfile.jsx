import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/api/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  ShieldCheck,
  Camera,
} from "lucide-react";
import { toast } from "react-hot-toast";

const PatientProfile = () => {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const response = await api.patch("/auth/profile", {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      updateUser(response.data.user);
      toast.success(t("profile_updated"));
    } catch (error) {
      toast.error("Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const toastId = toast.loading(t("upload_photo"));
    try {
      const response = await api.post("/auth/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.user) {
        updateUser(response.data.user);
      }
      toast.success(t("photo_updated"), { id: toastId });
    } catch (error) {
      toast.error("Gagal upload foto", { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            {t("profile_title")}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{t("profile_desc")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card & Security */}
        <div className="space-y-6">
          <Card className="border border-slate-100 shadow-sm bg-white rounded-xl">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div
                className="relative group cursor-pointer"
                onClick={handleAvatarClick}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-teal-100 shadow-inner bg-teal-50 flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={`http://localhost:5000${user.avatar}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-[#0F6A78] text-3xl font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>

                <div className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-slate-100 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {user?.name}
                </h2>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Patient ID: #00{user?.id?.substring(0, 4)}
                </p>
              </div>

              <div className="w-full bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500">
                  {t("member_since")}{" "}
                  <span className="font-semibold text-slate-700">2024</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Form */}
        <Card className="md:col-span-2 border border-slate-100 shadow-sm bg-white rounded-xl h-fit">
          <CardHeader className="px-6 py-4 border-b border-slate-50">
            <CardTitle className="text-base font-bold text-slate-800">
              {t("biodata")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <Label className="uppercase text-[10px] font-bold tracking-wider text-slate-400">
                  {t("full_name")}
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
                  {t("email_readonly")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    name="email"
                    value={formData.email}
                    className="pl-10 h-10 bg-slate-50 border-slate-200 rounded-lg text-sm text-slate-500"
                    disabled
                  />
                  <p className="text-[10px] text-slate-400 mt-1 pl-1">
                    {t("change_email_hint")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="uppercase text-[10px] font-bold tracking-wider text-slate-400">
                    {t("phone_number")}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="uppercase text-[10px] font-bold tracking-wider text-slate-400">
                    {t("address")}
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={handleSaveProfile}
                disabled={loading}
                className="h-10 px-6 bg-[#0F6A78] hover:bg-[#0d5661] text-white rounded-lg font-medium text-sm shadow-sm transition-all"
              >
                {loading ? (
                  t("saving")
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> {t("save_changes")}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientProfile;
