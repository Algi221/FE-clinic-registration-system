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
  Heart,
  ShieldCheck,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import TextType from "@/components/ui/TextType";
import { Footer } from "@/components/layout/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0F6A78]">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-teal-50 shadow-[0_2px_15px_-3px_rgba(15,106,120,0.07)]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/logo_no_bg 1.png"
              alt="OceanCare Logo"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-black text-[#0F6A78] tracking-tighter">
              OceanCare
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10 font-bold text-[#0F6A78]/70 text-sm uppercase tracking-widest">
            <a
              href="#"
              className="hover:text-[#0F6A78] transition-all hover:scale-105"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-[#0F6A78] transition-all hover:scale-105"
            >
              Tentang Kami
            </a>
            <a
              href="#services"
              className="hover:text-[#0F6A78] transition-all hover:scale-105"
            >
              Layanan
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button
                variant="ghost"
                className="font-bold text-[#0F6A78] hover:text-[#0F6A78] hover:bg-teal-50 px-6 rounded-xl"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#0F6A78] hover:bg-[#148ea1] text-white font-bold shadow-xl shadow-teal-900/10 rounded-xl px-8 h-12 transition-all active:scale-95">
                Gabung Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden bg-gradient-to-br from-[#F8FDFF] via-white to-teal-50/30">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40%] h-[40%] bg-teal-100 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[40%] h-[40%] bg-emerald-100 rounded-full blur-[120px] opacity-40"></div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100/50 text-[#0F6A78] font-black text-[10px] uppercase tracking-[0.2em] border border-teal-200/50 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Standard Medis Internasional
            </div>
            <div className="flex flex-col gap-2 min-h-[160px]">
              <TextType
                text="Kesehatan Anda Adalah"
                className="text-6xl md:text-7xl font-black leading-[1.05] text-[#0F6A78] tracking-tighter"
                loop={false}
                showCursor={false}
              />
              <TextType
                text="Seni Perawatan Kami"
                className="text-6xl md:text-7xl font-serif italic font-normal text-teal-400 tracking-tighter"
                initialDelay={1500}
                loop={false}
                cursorCharacter="_"
              />
            </div>
            <p className="text-xl text-[#0F6A78]/70 font-medium leading-relaxed max-w-xl">
              Pengalaman medis eksklusif dengan sentuhan teknologi modern dan
              tim dokter ahli yang berdedikasi tinggi untuk kesembuhan Anda.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-[#0F6A78] hover:bg-[#148ea1] text-white rounded-2xl px-10 h-16 text-lg font-black shadow-2xl shadow-teal-900/20 active:scale-95 transition-all"
                >
                  Mulai Konsultasi
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-teal-100 text-[#0F6A78] hover:bg-teal-50/50 rounded-2xl px-10 h-16 text-lg font-black backdrop-blur-sm transition-all shadow-lg shadow-teal-900/5"
              >
                Kenali Kami
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,106,120,0.15)] border-8 border-white group">
              <img
                src="/landing-page.png"
                alt="Hospital"
                className="w-full h-[600px] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F6A78]/60 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-10 left-10 text-white space-y-2">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                  Pelayanan Elite
                </div>
                <h3 className="text-3xl font-black">Modern & Humanis</h3>
                <p className="text-white/80 font-bold italic">
                  Memberikan Kenyamanan Maksimal Sejak Langkah Pertama
                </p>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-teal-50 animate-float">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Respon Cepat
                  </p>
                  <p className="text-lg font-black text-[#0F6A78]">
                    Admin Aktif 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Velocity Animation */}
      <div className="py-12 bg-white overflow-hidden pointer-events-none select-none">
        <ScrollVelocity
          texts={[
            "OceanCare Clinic",
            "Professional Healthcare",
            "Trusted Doctors",
            "24/7 Service",
          ]}
          velocity={50}
          className="text-[#0F6A78]/10 text-6xl md:text-8xl font-black uppercase tracking-widest"
        />
      </div>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-24 space-y-4">
            <span className="text-[11px] font-black text-teal-400 uppercase tracking-[0.4em]">
              Layanan Kami
            </span>
            <h2 className="text-5xl font-black text-[#0F6A78]">
              Spesialisasi Unggulan
            </h2>
            <div className="w-24 h-2 bg-[#0F6A78] mx-auto rounded-full"></div>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed pt-4">
              Kami menghadirkan layanan medis komprehensif dengan standar
              internasional untuk memastikan kesehatan Anda dan keluarga selalu
              terjaga dengan prima.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Poli Kandungan",
                icon: <Baby className="w-10 h-10" />,
                desc: "Perawatan komprehensif ibu & janin dengan USG 4D tercanggih.",
                color: "bg-teal-50 text-teal-600",
                src: "/poli-kandungan.png",
              },
              {
                title: "Poli Umum",
                icon: <Heart className="w-10 h-10" />,
                desc: "Diagnosis akurat untuk berbagai keluhan kesehatan keluarga.",
                color: "bg-teal-50 text-teal-600",
                src: "/poli-umum.png",
              },
              {
                title: "Poli Gizi",
                icon: <Smile className="w-10 h-10" />,
                desc: "Konsultasi diet terapeutik dan gaya hidup sehat berkelanjutan.",
                color: "bg-teal-50 text-teal-600",
                src: "/poli-gizi.png",
              },
              {
                title: "Poli Kecantikan",
                icon: <Sparkles className="w-10 h-10" />,
                desc: "Solusi estetika medis profesional untuk pancaran kepercayaan diri.",
                color: "bg-teal-50 text-teal-600",
                src: "/poli-kecantikan.png",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="group bg-[#F8FDFF] rounded-[3rem] overflow-hidden p-8 border border-teal-50 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(15,106,120,0.1)] transition-all duration-500"
              >
                <div className="h-64 rounded-[2.5rem] overflow-hidden mb-8 relative shadow-lg">
                  <img
                    src={service.src}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F6A78]/20 to-transparent"></div>
                </div>
                <div className="space-y-4">
                  <div className="inline-flex p-3 rounded-2xl bg-white border border-teal-50 shadow-sm text-[#0F6A78]">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-black text-[#0F6A78]">
                    {service.title}
                  </h3>
                  <p className="text-[#0F6A78]/60 font-medium text-sm leading-relaxed">
                    {service.desc}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-[#148ea1] font-black group-hover:gap-2 transition-all"
                  >
                    Selengkapnya <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0">
            {/* Left Image Section */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative aspect-[4/5]">
                <img
                  src="/image 9.png"
                  alt="Alur Pendaftaran"
                  className="w-full h-full object-contain object-center scale-110"
                />
              </div>
            </div>

            {/* Right Steps Section */}
            <div className="w-full lg:w-1/2 space-y-6">
              {[
                {
                  title: "Daftar / Login Akun",
                  desc: "Daftar jika belum punya akun (nama, NIK, nomor hp)",
                },
                {
                  title: "Pilih Layanan / Poli",
                  desc: "Pilih poli yang kamu butuhkan, seperti poli umum, poli gizi dll",
                },
                {
                  title: "Pilih Dokter & Jadwal",
                  desc: "Pilih dokter & jam praktik yang tersedia",
                },
                {
                  title: "Isi Form Pendaftaran",
                  desc: "Lengkapi, pastikan data benar, klik tombol kirim pendaftaran",
                },
                {
                  title: "Cek Status Pendaftaran",
                  desc: "Masuk ke menu riwayat, kemudian lihat status (diterima, menunggu, ditolak)",
                },
                {
                  title: "Datang Ke Klinik Sesuai Jadwal",
                  desc: "Tunjukkan bukti pendaftaran kepada petugas",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 bg-white p-4 rounded-[3rem] hover:shadow-lg transition-all border border-transparent hover:border-teal-50 group"
                >
                  <div className="w-16 h-16 shrink-0 rounded-full bg-[#1e40af] text-white flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-snug max-w-xs">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us / Vision Mission Section */}
      <section id="about" className="py-32 px-6 bg-white relative">
        <div className="container mx-auto space-y-24">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <span className="text-[11px] font-black text-teal-400 uppercase tracking-[0.4em]">
              Tentang Kami
            </span>
            <h2 className="text-5xl font-black text-[#0F6A78]">
              Mengenal OceanCare
            </h2>
            <div className="w-24 h-2 bg-[#0F6A78] mx-auto rounded-full"></div>
            <p className="text-xl text-slate-500 leading-relaxed font-medium pt-6">
              OceanCare adalah pelopor layanan kesehatan digital yang
              menggabungkan kehangatan pelayanan manusia dengan kecanggihan
              teknologi. Sejak 2024, kami telah berkomitmen untuk memberikan
              akses kesehatan yang mudah, cepat, dan terpercaya bagi masyarakat
              Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="p-12 bg-teal-50/50 rounded-[4rem] border border-teal-50 space-y-8 text-center md:text-left hover:shadow-xl transition-shadow duration-500">
              <div className="w-16 h-16 bg-[#0F6A78] rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto md:mx-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-black text-[#0F6A78]">
                Visi Besar Kami
              </h3>
              <p className="text-2xl font-serif italic text-[#0F6A78]/80 leading-relaxed">
                "Menghadirkan revolusi pelayanan kesehatan yang humanis melalui
                integritas medis dan inovasi teknologi berkelanjutan."
              </p>
            </div>

            <div className="p-12 bg-[#F8FDFF] rounded-[4rem] border border-teal-50 space-y-8 text-center md:text-left hover:shadow-xl transition-shadow duration-500">
              <div className="w-16 h-16 bg-teal-400 rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto md:mx-0">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-black text-[#0F6A78]">Misi Mulia</h3>
              <ul className="space-y-4 text-[#0F6A78]/70 font-bold text-lg">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-teal-400" /> Pelayanan
                  Prima Berstandar Global
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-teal-400" /> Keamanan &
                  Keselamatan Pasien Utama
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-teal-400" />{" "}
                  Digitalisasi Layanan Menyeluruh
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
