import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login berhasil!");
      navigate("/dashboard"); // Redirect ke dashboard (patient home)
    } catch (error) {
      toast.error("Login gagal. Cek email & password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative px-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full border hover:bg-gray-100 transition"
      >
        <ArrowLeft size={20} />
      </button>

      {/* CARD */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="hidden md:flex items-center justify-center bg-white p-10">
          <img
            src="/gambar-clinik.png"
            alt="Login Illustration"
            className="max-w-sm"
          />
        </div>

        {/* RIGHT */}
        <div className="bg-[#0F6A78] text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8">Welcome back!</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-11 rounded-full bg-white text-black"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="pt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-white/80 hover:text-white hover:underline transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* BUTTON */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-cyan-300 text-black hover:bg-cyan-400 transition"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Link
                to="/register"
                className="flex-1 text-center rounded-full border border-white py-2 hover:bg-white hover:text-[#0F6A78] transition"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
