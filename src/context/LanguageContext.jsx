import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  id: {
    // General
    loading: "Memuat OceanCare...",
    save: "Simpan",
    cancel: "Batal",
    back: "Kembali",
    logout: "Keluar",

    // Auth
    login_success: "Login berhasil! Selamat datang kembali.",
    login_failed: "Login gagal. Cek email & password Anda.",

    // Dashboard
    dashboard_title: "Dashboard",
    welcome: "Halo,",
    welcome_message:
      "Pantau kesehatan Anda dan kelola janji temu dengan mudah.",
    new_appointment: "Buat Janji Baru",
    history: "Riwayat",
    total_visits: "Total Kunjungan",
    waiting: "Menunggu",
    confirmed: "Terkonfirmasi",
    rejected: "Ditolak",
    recent_registrations: "Pendaftaran Terakhir",
    recent_registrations_desc: "Status pendaftaran pemeriksaan Anda terkini.",
    view_all: "Lihat Semua",
    no_history: "Belum Ada Riwayat",
    no_history_desc: "Anda belum melakukan pendaftaran pemeriksaan.",
    register_now: "Daftar Sekarang",
    doctor_poli: "Dokter & Poli",
    complaint: "Keluhan",
    schedule: "Jadwal",
    status: "Status",
    notification_active: "Notifikasi Aktif",
    notification_desc:
      "Anda akan menerima notifikasi real-time saat status pendaftaran Anda berubah.",
    visit_info: "Info Kunjungan",
    visit_info_desc:
      "Mohon hadir 15 menit sebelum jadwal pemeriksaan untuk verifikasi data.",

    // Settings
    settings_title: "Pengaturan",
    settings_desc: "Sesuaikan preferensi aplikasi Anda.",
    app_preferences: "Preferensi Aplikasi",
    notifications: "Notifikasi",
    notifications_desc: "Terima pemberitahuan jadwal.",
    dark_mode: "Mode Gelap",
    dark_mode_desc: "Tampilan yang nyaman.",
    language: "Bahasa",
    language_desc: "Pilih bahasa aplikasi.",
    security_privacy: "Keamanan & Privasi",
    change_password: "Ubah Password",
    change_password_desc: "Perbarui kata sandi akun.",
    change_email: "Ubah Email",
    change_email_desc: "Ganti alamat email terdaftar.",
    others: "Lainnya",
    help_center: "Pusat Bantuan",
    help_center_desc: "FAQ dan kontak support.",
    logout_app: "Keluar dari Aplikasi",
    current_password: "Password Saat Ini",
    new_password: "Password Baru",
    save_password: "Simpan Password",
    new_email: "Email Baru",
    confirm_password: "Konfirmasi Password",
    save_email: "Simpan Email",

    // Profile
    profile_title: "Profil Saya",
    profile_desc: "Kelola informasi pribadi Anda.",
    biodata: "Biodata Diri",
    full_name: "Nama Lengkap",
    phone_number: "Nomor Telepon",
    address: "Alamat",
    save_changes: "Simpan Perubahan",
    saving: "Menyimpan...",
    upload_photo: "Mengupload foto...",
    photo_updated: "Foto profil diperbarui!",
    profile_updated: "Profil berhasil diperbarui!",
    email_readonly: "Email (Baca saja)",
    change_email_hint: "*Gunakan menu di samping untuk mengubah email.",
    member_since: "Member sejak",

    // Sidebar/Navbar
    nav_home: "Home", // As requested previously
    nav_schedule: "Jadwal Saya",
    nav_profile: "Profil",
    nav_settings: "Pengaturan",
  },
  en: {
    // General
    loading: "Loading OceanCare...",
    save: "Save",
    cancel: "Cancel",
    back: "Back",
    logout: "Logout",

    // Auth
    login_success: "Login successful! Welcome back.",
    login_failed: "Login failed. Check your email & password.",

    // Dashboard
    dashboard_title: "Dashboard",
    welcome: "Hello,",
    welcome_message: "Monitor your health and manage appointments easily.",
    new_appointment: "New Appointment",
    history: "History",
    total_visits: "Total Visits",
    waiting: "Waiting",
    confirmed: "Confirmed",
    rejected: "Rejected",
    recent_registrations: "Recent Registrations",
    recent_registrations_desc: "Your latest examination registration status.",
    view_all: "View All",
    no_history: "No History Yet",
    no_history_desc: "You have not made any examination registrations yet.",
    register_now: "Register Now",
    doctor_poli: "Doctor & Clinic",
    complaint: "Complaint",
    schedule: "Schedule",
    status: "Status",
    notification_active: "Notifications Active",
    notification_desc:
      "You will receive real-time notifications when your registration status changes.",
    visit_info: "Visit Info",
    visit_info_desc:
      "Please arrive 15 minutes before examination schedule for data verification.",

    // Settings
    settings_title: "Settings",
    settings_desc: "Customize your app preferences.",
    app_preferences: "App Preferences",
    notifications: "Notifications",
    notifications_desc: "Receive schedule notifications.",
    dark_mode: "Dark Mode",
    dark_mode_desc: "Comfortable display.",
    language: "Language",
    language_desc: "Select application language.",
    security_privacy: "Security & Privacy",
    change_password: "Change Password",
    change_password_desc: "Update account password.",
    change_email: "Change Email",
    change_email_desc: "Change registered email address.",
    others: "Others",
    help_center: "Help Center",
    help_center_desc: "FAQ and support contact.",
    logout_app: "Logout from App",
    current_password: "Current Password",
    new_password: "New Password",
    save_password: "Save Password",
    new_email: "New Email",
    confirm_password: "Confirm Password",
    save_email: "Save Email",

    // Profile
    profile_title: "My Profile",
    profile_desc: "Manage your personal information.",
    biodata: "Personal Data",
    full_name: "Full Name",
    phone_number: "Phone Number",
    address: "Address",
    save_changes: "Save Changes",
    saving: "Saving...",
    upload_photo: "Uploading photo...",
    photo_updated: "Profile photo updated!",
    profile_updated: "Profile updated successfully!",
    email_readonly: "Email (Read-only)",
    change_email_hint: "*Use the settings menu to change email.",
    member_since: "Member since",

    // Sidebar/Navbar
    nav_home: "Home",
    nav_schedule: "My Schedule",
    nav_profile: "Profile",
    nav_settings: "Settings",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "id";
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
