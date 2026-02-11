import { X, LogOut, AlertTriangle } from "lucide-react";

const LogoutConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-teal-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl border-2 border-teal-50 scale-100 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-red-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-[2rem] bg-red-50 flex items-center justify-center text-red-500 shadow-inner mb-2">
            <LogOut size={40} className="ml-1" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-[#0F6A78] tracking-tight">
              Konfirmasi Logout
            </h3>
            <p className="text-slate-400 font-bold text-sm leading-relaxed px-4">
              Apakah Anda yakin ingin keluar dari sesi ini? Anda perlu login
              kembali untuk mengakses akun.
            </p>
          </div>

          <div className="flex gap-3 w-full pt-4">
            <button
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border-2 border-teal-50 text-[#0F6A78] font-black text-xs uppercase tracking-widest hover:bg-teal-50 transition-all"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 h-12 rounded-xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
            >
              Ya, Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
