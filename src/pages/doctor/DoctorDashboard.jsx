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
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const DoctorDashboard = () => {
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

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/pendaftaran/${id}/status`, { status });
      toast.success(`Pendaftaran ${status}`);
      fetchPendaftaran();
    } catch (error) {
      toast.error("Gagal mengubah status");
    }
  };

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
            Dashboard Dokter
          </h1>
          <p className="text-slate-500">Kelola pendaftaran pasien klinik.</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Daftar Pendaftaran Masuk</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10">Memuat data...</div>
          ) : pendaftaran.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              Tidak ada data pendaftaran.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Pasien</TableHead>
                  <TableHead>Poli</TableHead>
                  <TableHead>Dokter</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
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
                    <TableCell className="font-medium">
                      {item.pasien?.name || "N/A"}
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
                    <TableCell className="space-x-2">
                      {item.status === "PENDING" && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800 hover:border-green-300"
                            onClick={() =>
                              handleUpdateStatus(item.id, "ACCEPTED")
                            }
                          >
                            Terima
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800 hover:border-red-300"
                            onClick={() =>
                              handleUpdateStatus(item.id, "REJECTED")
                            }
                          >
                            Tolak
                          </Button>
                        </div>
                      )}
                    </TableCell>
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

export default DoctorDashboard;
