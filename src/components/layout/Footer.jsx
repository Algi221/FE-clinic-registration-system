import {
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0F6A78] pt-24 pb-12 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 border-b border-white/10 pb-20">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-900/50 p-2 overflow-hidden">
                <img
                  src="/logo_no_bg 1.png"
                  alt="OC Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-3xl font-black text-white tracking-tighter block leading-none">
                  OceanCare
                </span>
                <span className="text-[10px] font-black text-teal-300 uppercase tracking-[0.3em]">
                  Premium Clinic
                </span>
              </div>
            </div>
            <p className="text-teal-50/70 font-medium leading-relaxed max-w-sm">
              Menghadirkan standar baru dalam pelayanan kesehatan modern. Kami
              berdedikasi untuk memberikan perawatan medis terbaik dengan
              sentuhan personal dan teknologi terkini.
            </p>

            <div className="flex gap-4 pt-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white hover:text-[#0F6A78] flex items-center justify-center text-white transition-all duration-300 group ring-1 ring-white/10"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Layanan */}
            <div className="space-y-6">
              <h4 className="font-black text-white uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                <span className="w-8 h-0.5 bg-teal-300 rounded-full"></span>{" "}
                Layanan
              </h4>
              <ul className="space-y-4">
                {[
                  "Poli Umum",
                  "Spesialis Anak",
                  "Poli Gigi",
                  "Bedah Minor",
                  "Laboratorium",
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-teal-50/60 hover:text-white font-bold text-sm transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 text-teal-500 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tautan Cepat */}
            <div className="space-y-6">
              <h4 className="font-black text-white uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                <span className="w-8 h-0.5 bg-teal-300 rounded-full"></span>{" "}
                Akses Cepat
              </h4>
              <ul className="space-y-4">
                {[
                  "Beranda",
                  "Tentang Kami",
                  "Jadwal Dokter",
                  "Daftar Online",
                  "Hubungi Kami",
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-teal-50/60 hover:text-white font-bold text-sm transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 text-teal-500 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak */}
            <div className="space-y-6">
              <h4 className="font-black text-white uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                <span className="w-8 h-0.5 bg-teal-300 rounded-full"></span>{" "}
                Kontak
              </h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-teal-50/60 font-bold text-sm group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <MapPin className="w-5 h-5 text-teal-300" />
                  </div>
                  <span className="leading-relaxed group-hover:text-white transition-colors">
                    Jl. Margonda Raya No. 123,
                    <br /> Kota Depok, Jawa Barat
                    <br /> Indonesia 16424
                  </span>
                </li>
                <li className="flex items-center gap-4 text-teal-50/60 font-bold text-sm group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5 text-teal-300" />
                  </div>
                  <span className="group-hover:text-white transition-colors">
                    (021) 555-0812
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <p className="text-xs font-bold text-teal-50 uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} OceanCare Clinic. All rights
            reserved.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-black text-teal-300 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
