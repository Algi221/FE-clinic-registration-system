import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { CheckCircle2, XCircle, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [pendaftaran, setPendaftaran] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendaftaran = async () => {
    try {
      const response = await api.get("/pendaftaran");
      setPendaftaran(response.data);
    } catch (error) {
      toast.error("Gagal mengambil data pendaftaran");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendaftaran();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <span className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full text-xs border border-green-200">
            <CheckCircle2 className="w-3 h-3" /> Diterima
          </span>
        );
      case "REJECTED":
        return (
          <span className="flex items-center gap-1 text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full text-xs border border-red-200">
            <XCircle className="w-3 h-3" /> Ditolak
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full text-xs border border-orange-200">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Riwayat Pendaftaran
          </h1>
          <p className="text-slate-500">
            Lihat status pendaftaran layanan kesehatan Anda.
          </p>
        </div>
        <Link to="/register-clinic">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-200">
            <Plus className="mr-2 h-4 w-4" /> Daftar Baru
          </Button>
        </Link>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Riwayat Kunjungan</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10">Memuat data...</div>
          ) : pendaftaran.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <p className="mb-4">Anda belum memiliki riwayat pendaftaran.</p>
              <Link to="/register-clinic">
                <Button
                  variant="outline"
                  className="text-teal-600 border-teal-200 hover:bg-teal-50"
                >
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Poli</TableHead>
                  <TableHead>Dokter</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendaftaran.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {new Date(item.tanggalPendaftaran).toLocaleDateString(
                        "id-ID",
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        {item.jadwal?.dokter?.poli?.nama || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>{item.jadwal?.dokter?.nama || "N/A"}</TableCell>
                    <TableCell>
                      {item.jadwal?.hari}, {item.jadwal?.jamMulai} -{" "}
                      {item.jadwal?.jamSelesai}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;
