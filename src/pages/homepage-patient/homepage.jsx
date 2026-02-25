import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  CalendarCheck,
  User,
  ArrowRight,
  MapPin,
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
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/patient/schedule" className="hover:text-white">
              Jadwal
            </Link>
            <Link to="/patient/last-consultation" className="hover:text-white">
              Konsultasi terakhir
            </Link>
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
            <div className="text-2xl md:text-3xl font-bold mb-2">
              Konsultasi Kesehatan!
            </div>
            <p className="text-white/80 max-w-md mb-6">
              Akses layanan klinik, buat janji dokter, dan pantau kesehatan Anda
              dengan mudah dan cepat.
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
                <img
                  src={schedule.doctorImage}
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">
                  {schedule.doctorName}
                </div>
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

        <section className="mt-12 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-teal-800">
              Lokasi Klinik
            </h2>
            <span className="flex-1 h-px bg-slate-200"></span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.11183389146!2d106.82902351139423!3d-6.382848562391696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec069c9b0717%3A0xc3f9479e09d17ed6!2sJl.%20Margonda%20Raya%2C%20Depok%2C%20Jawa%20Barat!5e0!3m2!1sen!2sid!4v1740465000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OceanCare Clinic Location"
              ></iframe>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-3xl bg-teal-50 border border-teal-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-teal-900">Alamat Kami</h3>
                    <p className="text-sm text-teal-700">
                      OceanCare Premium Clinic
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Jl. Margonda Raya No. 123,
                  <br />
                  Kota Depok, Jawa Barat
                  <br />
                  Indonesia 16424
                </p>
              </div>

              <div className="p-6 rounded-3xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">
                  Jam Operasional
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Senin - Jumat</span>
                    <span className="font-semibold text-slate-700">
                      08:00 - 21:00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Sabtu</span>
                    <span className="font-semibold text-slate-700">
                      08:00 - 18:00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Minggu</span>
                    <span className="font-semibold text-teal-600">
                      Hanya Darurat
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full py-6 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold transition-all shadow-lg shadow-teal-700/20">
                Petunjuk Arah
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PatientHomepage;
