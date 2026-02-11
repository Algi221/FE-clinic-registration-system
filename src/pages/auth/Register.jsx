import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  UserPlus,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Konfirmasi password tidak cocok!");
    }
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success("Pendaftaran berhasil! Silakan login untuk masuk.");
      navigate("/login");
    } catch {
      toast.error("Registrasi gagal. Email mungkin sudah terdaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F6A78] via-[#0a4d58] to-[#012a31] relative px-6 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-md group z-50 shadow-xl"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
      </button>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        {/* LEFT SECTION (ILLUSTRATION - WHITE) */}
        <div className="hidden md:flex flex-col items-center justify-center p-16 bg-white relative group">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-50 blur-[60px] rounded-full scale-110"></div>
            <img
              src="/gambar-clinik.png"
              alt="Register"
              className="max-w-md relative z-10 animate-float"
            />
          </div>
          <div className="mt-12 text-center space-y-4">
            <h1 className="text-4xl font-black text-[#0F6A78] tracking-tighter">
              Gabung OceanCare
            </h1>
            <p className="text-[#0F6A78]/60 text-lg font-medium max-w-xs mx-auto italic leading-relaxed">
              Layanan medis premium dengan sentuhan teknologi modern untuk
              keluarga Indonesia.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION (FORM - GREEN) */}
        <div className="bg-[#0F6A78] p-12 md:p-20 flex flex-col justify-center relative text-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <div className="inline-flex p-5 bg-white/10 rounded-2xl mb-6 shadow-inner backdrop-blur-sm">
                <img
                  src="/logo_no_bg 1.png"
                  alt="Logo"
                  className="w-10 h-auto object-contain brightness-0 invert"
                />
              </div>
              <h2 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase whitespace-nowrap">
                Register Akun
              </h2>
              <p className="text-white/60 font-bold text-sm tracking-widest uppercase">
                Mulai Perjalanan Sehat Anda Hari Ini
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                  Nama Lengkap
                </label>
                <div className="relative group/field">
                  <User
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within/field:text-white transition-colors"
                    size={20}
                  />
                  <Input
                    name="name"
                    placeholder="Budi Santoso"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-14 h-14 rounded-2xl border-2 border-white/10 focus:border-white/30 transition-all bg-white/5 font-bold text-white placeholder:text-white/20 shadow-inner"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                  Email Aktif
                </label>
                <div className="relative group/field">
                  <Mail
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within/field:text-white transition-colors"
                    size={20}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-14 h-14 rounded-2xl border-2 border-white/10 focus:border-white/30 transition-all bg-white/5 font-bold text-white placeholder:text-white/20 shadow-inner"
                  />
                </div>
              </div>

              {/* PASSWORDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                    Password
                  </label>
                  <div className="relative group/field">
                    <Lock
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within/field:text-white transition-colors"
                      size={20}
                    />
                    <Input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-14 h-14 rounded-2xl border-2 border-white/10 focus:border-white/30 transition-all bg-white/5 font-bold text-white placeholder:text-white/20 shadow-inner"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                    Konfirmasi
                  </label>
                  <div className="relative group/field">
                    <Lock
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within/field:text-white transition-colors"
                      size={20}
                    />
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="pl-14 h-14 rounded-2xl border-2 border-white/10 focus:border-white/30 transition-all bg-white/5 font-bold text-white placeholder:text-white/20 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* REGISTER BUTTON */}
              <div className="flex flex-col gap-6 pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-16 rounded-[1.25rem] bg-white hover:bg-teal-50 text-[#0F6A78] font-black text-lg shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-4 border-[#0F6A78]/30 border-t-[#0F6A78] rounded-full animate-spin"></div>
                      Mendaftarkan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      Register Sekarang
                      <ChevronRight size={24} />
                    </div>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-white/40 font-bold text-sm">
                    Sudah menjadi bagian dari OceanCare?{" "}
                    <Link
                      to="/login"
                      className="font-black text-white hover:text-teal-200 transition-colors underline-offset-8 hover:underline decoration-2"
                    >
                      Login Akun
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Info */}
      <div className="absolute bottom-10 right-10 flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
        <ShieldCheck className="text-teal-300 w-6 h-6" />
        <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">
          Data Anda Aman & Terenkripsi
        </span>
      </div>
    </div>
  );
};

export default Register;
