import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DoctorScheduleCalendar = ({ jadwals = [] }) => {
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

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarIcon className="w-5 h-5 text-indigo-600" />
          Kalender Jadwal Praktik
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h3 className="text-lg font-bold text-slate-900">
            {monthNames[month]} {year}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-slate-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const hasJadwal = hasSchedule(date);
            const today = isToday(date);
            const selected = isSelected(date);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-all duration-200
                  ${today ? "ring-2 ring-indigo-400 ring-offset-2" : ""}
                  ${selected ? "bg-indigo-600 text-white shadow-lg scale-105" : ""}
                  ${!selected && hasJadwal ? "bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-900 hover:from-purple-200 hover:to-indigo-200" : ""}
                  ${!selected && !hasJadwal ? "text-slate-400 hover:bg-slate-50" : ""}
                  relative
                `}
              >
                <span>{date.getDate()}</span>
                {hasJadwal && !selected && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected date details */}
        {selectedDate && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-indigo-600" />
              {selectedDate.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>

            {selectedSchedules.length > 0 ? (
              <div className="space-y-3">
                {selectedSchedules.map((jadwal) => (
                  <div
                    key={jadwal.id}
                    className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Clock className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {jadwal.jamMulai} - {jadwal.jamSelesai}
                        </p>
                        <p className="text-sm text-slate-600">
                          Jadwal Praktik Rutin
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500">
                  Tidak ada jadwal praktik pada tanggal ini
                </p>
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs font-semibold text-slate-500 mb-3">
            Keterangan:
          </p>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 border border-indigo-200" />
              <span className="text-slate-600">Ada Jadwal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-600" />
              <span className="text-slate-600">Tanggal Dipilih</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-indigo-400" />
              <span className="text-slate-600">Hari Ini</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorScheduleCalendar;
