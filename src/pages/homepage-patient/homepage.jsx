import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  CalendarCheck,
  User,
  ArrowRight,
} from "lucide-react";

const PatientHomepage = () => {
  const schedule = {
    doctorName: "dr. Asha Safitri, Sp. Dv",
    department: "Poli Kecantikan",
    date: "13 Februari 2026",
    time: "13:00 - 13:30",
    patientName: "Ayra",
    doctorImage: "/doctor.png",
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="w-full bg-teal-700 text-white">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="text-xl font-semibold">OceanCare</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-white/90">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/patient/schedule" className="hover:text-white">Jadwal</Link>
            <Link to="/patient/last-consultation" className="hover:text-white">Konsultasi terakhir</Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="rounded-3xl bg-teal-800 text-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold mb-2">Konsultasi Kesehatan!</div>
            <p className="text-white/80 max-w-md mb-6">
              Akses layanan klinik, buat janji dokter, dan pantau kesehatan Anda dengan mudah dan cepat.
            </p>
            <Button className="rounded-full bg-white text-teal-800 hover:bg-white/90 font-semibold">
              Segera Konsultasi
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="flex-1">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/banner-doctor.png"
                alt="Doctor"
                className="w-full max-h-56 object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-teal-800">Jadwal kamu</h2>
            <span className="flex-1 h-px bg-slate-200"></span>
          </div>

          <div className="rounded-3xl border border-slate-200 shadow-sm p-6 max-w-2xl">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                <img src={schedule.doctorImage} alt="Doctor" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{schedule.doctorName}</div>
                <div className="inline-flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold">
                    {schedule.department}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                    {schedule.date}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                    {schedule.time}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green-600 text-white text-sm font-bold">
                    {schedule.patientName}
                  </span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-teal-700">
                <CalendarCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Terkonfirmasi</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PatientHomepage;
