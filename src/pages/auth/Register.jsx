import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Lock, User, Facebook, Github, Globe } from "lucide-react";
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
      return toast.error("Password tidak cocok");
    }
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success("Pendaftaran berhasil! Silakan login.");
      navigate("/login");
    } catch {
      toast.error("Registrasi gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative px-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full border hover:bg-gray-100"
      >
        <ArrowLeft />
      </button>

      {/* CARD */}
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT */}
        <div className="hidden md:flex items-center justify-center bg-white p-12">
          <img
            src="/gambar-clinik.png"
            alt="Register Illustration"
            className="max-w-md"
          />
        </div>

        {/* RIGHT */}
        <div className="bg-[#0F6A78] text-white p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-2">Form Registrasi</h2>
          <p className="text-white/80 mb-8">Silakan daftar untuk membuat akun baru.</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-11 rounded-full bg-white text-black"
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                name="email"
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-11 rounded-full bg-white text-black"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-11 rounded-full bg-white text-black"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="pl-11 rounded-full bg-white text-black"
              />
            </div>

            {/* BUTTON */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-cyan-300 text-black hover:bg-cyan-400"
              >
                {loading ? "Mendaftar..." : "Register"}
              </Button>

              <Link
                to="/login"
                className="flex-1 text-center rounded-full border border-white py-2 hover:bg-white hover:text-[#0F6A78] transition"
              >
                Login
              </Link>
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                <span className="flex-1 h-px bg-white/30"></span>
                <span>Atau daftar dengan</span>
                <span className="flex-1 h-px bg-white/30"></span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  onClick={() => toast("Login via Google belum tersedia")}
                  className="w-full rounded-full bg-white text-[#0F6A78] hover:bg-white/90"
                >
                  <Globe className="mr-2" size={18} />
                  Google
                </Button>
                <Button
                  type="button"
                  onClick={() => toast("Login via Facebook belum tersedia")}
                  className="w-full rounded-full bg-white text-[#0F6A78] hover:bg-white/90"
                >
                  <Facebook className="mr-2" size={18} />
                  Facebook
                </Button>
                <Button
                  type="button"
                  onClick={() => toast("Login via GitHub belum tersedia")}
                  className="w-full rounded-full bg-white text-[#0F6A78] hover:bg-white/90"
                >
                  <Github className="mr-2" size={18} />
                  GitHub
                </Button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Register;
