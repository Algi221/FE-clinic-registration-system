import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Lock,
  User,
  Building2,
  ShieldAlert,
  Globe,
  Smartphone,
  Mail,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DoctorSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    darkMode: false,
    privacyMode: true,
    publicProfile: true,
    autoAccept: false,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const SettingItem = ({
    icon: Icon,
    title,
    description,
    settingKey,
    danger = false,
  }) => (
    <div
      className={`flex items-center justify-between p-4 rounded-xl transition-all border border-transparent ${danger ? "hover:bg-red-50" : "hover:bg-slate-50"} group cursor-pointer`}
      onClick={() => toggleSetting(settingKey)}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${danger ? "bg-red-50 text-red-500" : "bg-teal-50 text-[#0F6A78]"}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4
            className={`font-medium text-sm ${danger ? "text-red-600" : "text-slate-700"}`}
          >
            {title}
          </h4>
          <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed mt-0.5">
            {description}
          </p>
        </div>
      </div>
      <Switch
        checked={settings[settingKey]}
        onCheckedChange={() => toggleSetting(settingKey)}
        className={`${danger ? "data-[state=checked]:bg-red-500" : "data-[state=checked]:bg-[#0F6A78]"}`}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Pengaturan
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Sesuaikan preferensi akun dan aplikasi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account & Security */}
        <Card className="border border-slate-100 shadow-sm bg-white rounded-xl overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-slate-50">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              Akun & Privasi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <SettingItem
              icon={Globe}
              title="Profil Publik"
              description="Tampilkan profil di pencarian."
              settingKey="publicProfile"
            />
            <SettingItem
              icon={Lock}
              title="Verifikasi 2 Langkah"
              description="Keamanan ekstra saat login."
              settingKey="privacyMode"
            />
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full h-10 text-xs border-slate-200 text-slate-600 hover:text-[#0F6A78] hover:border-teal-200"
              >
                Ubah Kata Sandi
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border border-slate-100 shadow-sm bg-white rounded-xl overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-slate-50">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-400" />
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <SettingItem
              icon={Smartphone}
              title="Push Notification"
              description="Notifikasi real-time di perangkat."
              settingKey="notifications"
            />
            <SettingItem
              icon={Mail}
              title="Email Digest"
              description="Ringkasan aktivitas mingguan."
              settingKey="emailAlerts"
            />
          </CardContent>
        </Card>

        {/* Clinic Settings */}
        <Card className="border border-slate-100 shadow-sm bg-white rounded-xl overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-slate-50">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              Konfigurasi Klinik
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <SettingItem
              icon={User}
              title="Auto-Accept Pasien"
              description="Otomatis terima pendaftaran."
              settingKey="autoAccept"
            />
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border border-red-100 shadow-sm bg-white rounded-xl overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-red-50">
            <CardTitle className="text-base font-bold text-red-500 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-xs text-slate-500 mb-4">
              Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
            </p>
            <Button
              variant="destructive"
              className="w-full h-10 text-xs bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 shadow-none font-bold"
            >
              Nonaktifkan Akun
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorSettings;
