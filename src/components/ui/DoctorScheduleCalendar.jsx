import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DoctorScheduleCalendar = ({ jadwals = [], pendaftaran = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Get month/year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // Month names
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Day names
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // Navigate months
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  // Map jadwal hari ke nama hari Indonesia
  const dayMapping = {
    Minggu: 0,
    Senin: 1,
    Selasa: 2,
    Rabu: 3,
    Kamis: 4,
    Jumat: 5,
    Sabtu: 6,
  };

  // Check if date has schedule
  const hasSchedule = (date) => {
    const dayOfWeek = date.getDay();
    return jadwals.some((jadwal) => dayMapping[jadwal.hari] === dayOfWeek);
  };

  // Get schedules for specific date
  const getSchedulesForDate = (date) => {
    const dayOfWeek = date.getDay();
    return jadwals.filter((jadwal) => dayMapping[jadwal.hari] === dayOfWeek);
  };

  // Generate calendar days
  const calendarDays = [];

  // Empty cells before first day
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  // Is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Is selected
  const isSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const selectedSchedules = selectedDate
    ? getSchedulesForDate(selectedDate)
    : [];

  const selectedDateAppointments = selectedDate
    ? pendaftaran.filter(
        (p) =>
          new Date(p.tanggalPendaftaran).toDateString() ===
          selectedDate.toDateString(),
      )
    : [];

  return (
    <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden">
      <CardHeader className="bg-white border-b border-slate-50 p-5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-50 rounded-lg text-[#0F6A78]">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Kalender Praktik
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {monthNames[month]} {year}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const hasJadwal = hasSchedule(date);
            const today = isToday(date);
            const selected = isSelected(date);
            const dayAppointments = pendaftaran.filter(
              (p) =>
                new Date(p.tanggalPendaftaran).toDateString() ===
                date.toDateString(),
            );
            const hasAppointments = dayAppointments.length > 0;

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`
                  aspect-square rounded-xl text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center relative
                  ${today ? "ring-1 ring-teal-500 text-teal-600 bg-teal-50/50" : "text-slate-600"}
                  ${selected ? "bg-[#0F6A78] text-white shadow-md z-10 !ring-0" : "hover:bg-slate-50"}
                `}
              >
                <span>{date.getDate()}</span>

                <div className="flex gap-0.5 mt-0.5 h-1">
                  {hasJadwal && !selected && (
                    <div className="w-1 h-1 bg-teal-400 rounded-full" />
                  )}
                  {hasAppointments && !selected && (
                    <div className="w-1 h-1 bg-amber-400 rounded-full" />
                  )}
                  {selected && (hasJadwal || hasAppointments) && (
                    <div className="w-1 h-1 bg-white/70 rounded-full" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected date details */}
        {selectedDate && (
          <div className="animate-in fade-in zoom-in-95 duration-200 mt-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">
              {selectedDate.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h4>

            <div className="space-y-4">
              {/* Schedules */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Jam Praktik
                </p>
                {selectedSchedules.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSchedules.map((s) => (
                      <span
                        key={s.id}
                        className="text-xs font-medium bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600"
                      >
                        {s.jamMulai} - {s.jamSelesai}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Tidak ada jadwal.
                  </p>
                )}
              </div>

              {/* Appointments */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" /> Pasien (
                  {selectedDateAppointments.length})
                </p>
                {selectedDateAppointments.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                    {selectedDateAppointments.map((app) => (
                      <div
                        key={app.id}
                        className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm flex justify-between items-start"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-700">
                            {app.pasien.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate w-32">
                            {app.keluhan || "-"}
                          </p>
                        </div>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            app.status === "ACCEPTED"
                              ? "bg-emerald-50 text-emerald-600"
                              : app.status === "REJECTED"
                                ? "bg-red-50 text-red-500"
                                : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {app.status === "ACCEPTED"
                            ? "OK"
                            : app.status === "REJECTED"
                              ? "NO"
                              : "Wait"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Belum ada pasien.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorScheduleCalendar;
