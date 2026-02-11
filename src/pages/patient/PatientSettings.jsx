import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/api/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import {
  Bell,
  Moon,
  Globe,
  Lock,
  LogOut,
  ChevronRight,
  Shield,
  HelpCircle,
  FileText,
  Mail,
  ChevronDown,
  Save,
} from "lucide-react";
import LogoutConfirmModal from "@/components/ui/LogoutConfirmModal";

const PatientSettings = () => {
  const { logout, updateUser } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // States for expandable sections
  const [expandedItem, setExpandedItem] = useState(null);

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // Email Change State
  const [emailData, setEmailData] = useState({
    newEmail: "",
    password: "", // for verification
  });

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSavePassword = async () => {
    try {
      if (!passwordData.currentPassword || !passwordData.newPassword) {
        return toast.error("Mohon isi semua field password");
      }
      await api.patch("/auth/change-password", passwordData);
      toast.success("Password berhasil diubah!");
      setPasswordData({ currentPassword: "", newPassword: "" });
      setExpandedItem(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mengubah password");
    }
  };

  const handleSaveEmail = async () => {
    try {
      if (!emailData.newEmail || !emailData.password) {
        return toast.error("Mohon isi email baru dan password verifikasi");
      }
      const response = await api.patch("/auth/change-email", emailData);
      updateUser(response.data.user);
      toast.success("Email berhasil diubah!");
      setEmailData({ newEmail: "", password: "" });
      setExpandedItem(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mengubah email");
    }
  };

  const settingsGroups = [
    {
      title: t("app_preferences"),
      items: [
        {
          id: "notifications",
          label: t("notifications"),
          description: t("notifications_desc"),
          icon: Bell,
          action: (
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              className="data-[state=checked]:bg-[#0F6A78]"
            />
          ),
        },
        {
          id: "darkmode",
          label: t("dark_mode"),
          description: t("dark_mode_desc"),
          icon: Moon,
          action: (
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="data-[state=checked]:bg-[#0F6A78]"
            />
          ),
        },
        {
          id: "language",
          label: t("language"),
          description: t("language_desc"),
          icon: Globe,
          action: (
            <div
              className="flex items-center gap-2 text-xs font-bold text-[#0F6A78] bg-teal-50 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-teal-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                changeLanguage(language === "id" ? "en" : "id");
              }}
            >
              {language === "id" ? "ID" : "EN"}
              <ChevronRight className="w-3 h-3" />
            </div>
          ),
        },
      ],
    },
    {
      title: t("security_privacy"),
      items: [
        {
          id: "password",
          label: t("change_password"),
          description: t("change_password_desc"),
          icon: Lock,
          action: <ChevronRight className="w-4 h-4 text-slate-400" />,
          expandable: true,
        },
        {
          id: "email",
          label: t("change_email"),
          description: t("change_email_desc"),
          icon: Mail,
          action: <ChevronRight className="w-4 h-4 text-slate-400" />,
          expandable: true,
        },
      ],
    },
    {
      title: t("others"),
      items: [
        {
          id: "help",
          label: t("help_center"),
          description: t("help_center_desc"),
          icon: HelpCircle,
          action: <ChevronRight className="w-4 h-4 text-slate-400" />,
        },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          {t("settings_title")}
        </h1>
        <p className="text-slate-500 text-sm mt-1">{t("settings_desc")}</p>
      </div>

      <div className="space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
              {group.title}
            </h2>
            <Card className="border border-slate-100 shadow-sm bg-white rounded-xl overflow-hidden">
              <CardContent className="p-0 divide-y divide-slate-50">
                {group.items.map((item) => (
                  <div key={item.id}>
                    <div
                      onClick={() => item.expandable && toggleExpand(item.id)}
                      className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group ${
                        expandedItem === item.id ? "bg-slate-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0F6A78] flex items-center justify-center">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-700 text-sm">
                            {item.label}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        {item.expandable ? (
                          expandedItem === item.id ? (
                            <ChevronDown className="w-4 h-4 text-[#0F6A78]" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )
                        ) : (
                          item.action
                        )}
                      </div>
                    </div>

                    {/* Expandable Content for Password */}
                    {expandedItem === "password" && item.id === "password" && (
                      <div className="p-4 bg-slate-50/50 space-y-4 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label className="text-xs">
                              {t("current_password")}
                            </Label>
                            <Input
                              type="password"
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="bg-white h-9"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">
                              {t("new_password")}
                            </Label>
                            <Input
                              type="password"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="bg-white h-9"
                            />
                          </div>
                          <Button
                            onClick={handleSavePassword}
                            size="sm"
                            className="w-full bg-[#0F6A78] hover:bg-[#0d5661] text-xs h-9"
                          >
                            <Save className="w-3.5 h-3.5 mr-2" />{" "}
                            {t("save_password")}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Expandable Content for Email */}
                    {expandedItem === "email" && item.id === "email" && (
                      <div className="p-4 bg-slate-50/50 space-y-4 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label className="text-xs">{t("new_email")}</Label>
                            <Input
                              name="newEmail"
                              value={emailData.newEmail}
                              onChange={handleEmailChange}
                              className="bg-white h-9"
                              placeholder="contoh@email.com"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">
                              {t("confirm_password")}
                            </Label>
                            <Input
                              type="password"
                              name="password"
                              value={emailData.password}
                              onChange={handleEmailChange}
                              className="bg-white h-9"
                              placeholder="Masukkan password Anda"
                            />
                          </div>
                          <Button
                            onClick={handleSaveEmail}
                            size="sm"
                            className="w-full bg-[#0F6A78] hover:bg-[#0d5661] text-xs h-9"
                          >
                            <Save className="w-3.5 h-3.5 mr-2" />{" "}
                            {t("save_email")}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        <div className="pt-4">
          <Button
            onClick={handleLogoutClick}
            variant="outline"
            className="w-full h-12 bg-white border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {t("logout_app")}
          </Button>
          <p className="text-center text-[10px] text-slate-300 mt-4 uppercase tracking-widest">
            OceanCare v1.0.0
          </p>
        </div>
      </div>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default PatientSettings;
