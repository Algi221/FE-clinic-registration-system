import React from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Baby,
  Smile,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  UserCheck,
  ClipboardList,
  Search,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-200">
              <span className="mb-1">+</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              OceanCare
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#" className="hover:text-teal-600 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-teal-600 transition-colors">
              Tentang Kami
            </a>
            <a
              href="#services"
              className="hover:text-teal-600 transition-colors"
            >
              Layanan
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                className="font-semibold text-slate-600 hover:text-teal-600 hover:bg-teal-50"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg shadow-teal-200 rounded-full px-6">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 font-semibold text-sm mb-2">
              Layanan Kesehatan Terpercaya
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900">
              Selamat Datang Di <br />
              <span className="text-teal-600 italic font-serif">
                Klinik OceanCare
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Kami hadir untuk memberikan pelayanan kesehatan terbaik dengan
              fasilitas modern dan tenaga medis profesional. Kesehatan Anda
              adalah prioritas kami.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 h-12 shadow-xl shadow-teal-200/50"
                >
                  Daftar Sekarang
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-teal-200 text-teal-700 hover:bg-teal-50 rounded-full px-8 h-12"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
          <div className="relative">
            {/* Abstract Background Shapes */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            {/* Hero Image / Illustration Placeholder */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Hospital Reception"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-semibold text-lg">Modern & Nyaman</p>
                <p className="text-sm opacity-90">
                  Fasilitas Berstandar Internasional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Button className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-6 text-lg rounded-full shadow-lg">
              Pilih Layanan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Poli Kandungan",
                icon: <Baby className="w-8 h-8" />,
                desc: "Layanan kesehatan ibu dan janin",
                color: "bg-pink-50 text-pink-600",
                img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              },
              {
                title: "Poli Umum",
                icon: <Stethoscope className="w-8 h-8" />,
                desc: "Pemeriksaan kesehatan umum",
                color: "bg-blue-50 text-blue-600",
                img: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              },
              {
                title: "Poli Gigi",
                icon: <Smile className="w-8 h-8" />,
                desc: "Perawatan kesehatan gigi & mulut",
                color: "bg-purple-50 text-purple-600",
                img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              },
              {
                title: "Poli Kecantikan",
                icon: <Sparkles className="w-8 h-8" />,
                desc: "Perawatan estetika & kulit",
                color: "bg-orange-50 text-orange-600",
                img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                  <div className={service.color + " p-2 rounded-full"}>
                    {service.icon}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-6 bg-slate-50 overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-teal-200 rounded-full transform translate-x-10 translate-y-10 opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Guidance"
              className="relative rounded-3xl shadow-2xl z-10 w-full max-w-md mx-auto object-cover h-[600px]"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-12 text-slate-900">
              Alur Pendaftaran Mudah
            </h2>
            <div className="space-y-6">
              {[
                {
                  id: 1,
                  title: "Daftar / Login Akun",
                  desc: "Buat akun baru atau masuk jika sudah memiliki akun.",
                  icon: <UserCheck className="w-5 h-5" />,
                },
                {
                  id: 2,
                  title: "Pilih Layanan / Poli",
                  desc: "Pilih poli yang Anda butuhkan (Umum, Gigi, dll).",
                  icon: <ClipboardList className="w-5 h-5" />,
                },
                {
                  id: 3,
                  title: "Pilih Dokter & Jadwal",
                  desc: "Tentukan dokter dan jam yang sesuai.",
                  icon: <Search className="w-5 h-5" />,
                },
                {
                  id: 4,
                  title: "Isi Form Pendaftaran",
                  desc: "Lengkapi data diri dan keluhan Anda.",
                  icon: <ClipboardList className="w-5 h-5" />,
                },
                {
                  id: 5,
                  title: "Cek Status Pendaftaran",
                  desc: "Pantau status pendaftaran di dashboard.",
                  icon: <CheckCircle2 className="w-5 h-5" />,
                },
                {
                  id: 6,
                  title: "Datang Ke Klinik",
                  desc: "Datang sesuai jadwal yang dipilih.",
                  icon: <MapPin className="w-5 h-5" />,
                },
              ].map((step) => (
                <div key={step.id} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full border-2 border-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                    {step.id}
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex-1 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-16 item-center text-center">
          <div className="flex flex-col items-center max-w-sm">
            <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white shadow-xl mb-6 transform hover:scale-105 transition-transform">
              <div className="text-center">
                <Search className="w-10 h-10 mx-auto mb-1 opacity-80" />
                <span className="font-bold text-xl">VISI</span>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              "Menjadi klinik yang terpercaya dengan pelayanan kesehatan modern,
              cepat, dan mudah diakses melalui sistem digital."
            </p>
          </div>

          <div className="flex flex-col items-center max-w-sm">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white shadow-xl mb-6 transform hover:scale-105 transition-transform">
              <div className="text-center">
                <Sparkles className="w-10 h-10 mx-auto mb-1 opacity-80" />
                <span className="font-bold text-xl">MISI</span>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              "Memberikan pelayanan prima dengan standar medis tinggi dan
              mengutamakan kepuasan serta keselamatan pasien."
            </p>
          </div>
        </div>
      </section>

      {/* Business Fields */}
      <section className="py-0 bg-teal-700">
        <div className="container mx-auto">
          <h2 className="text-white text-center py-6 text-xl font-bold tracking-wide uppercase">
            Bidang Usaha
          </h2>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100">
            <div className="h-64 rounded-xl overflow-hidden mb-4 relative">
              <img
                src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Rawat Inap"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-center text-teal-800 font-serif font-bold text-xl">
              Ruang Rawat Inap
            </h3>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100">
            <div className="h-64 rounded-xl overflow-hidden mb-4 relative">
              <img
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Keselamatan"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-center text-teal-800 font-serif font-bold text-xl">
              Jasa Keselamatan & Kesehatan
            </h3>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  <span className="mb-1">+</span>
                </div>
                <span className="text-2xl font-bold text-slate-800">
                  Ocean
                  <span className="text-teal-600 font-serif italic">Care</span>
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-6">
                Jalan Margonda Raya, Kota Depok, Jawa Barat. <br />
                Melayani dengan hati, mengobati dengan teknologi.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-6">Tautan Cepat</h4>
              <ul className="space-y-3 text-slate-600">
                <li>
                  <a href="#" className="hover:text-teal-600 transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-600 transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-600 transition-colors">
                    Layanan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-600 transition-colors">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-6">Kontak</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (021) 555-0123
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Kota Depok, Indonesia
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 text-center text-slate-500 text-sm">
            &copy; 2024 Klinik OceanCare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
