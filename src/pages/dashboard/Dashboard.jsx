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
import { Badge } from "@/components/ui/badge"; // I'll create this simplified
import { toast } from "react-hot-toast";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const Dashboard = () => {
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
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <CheckCircle2 className="w-4 h-4" /> Diterima
          </span>
        );
      case "REJECTED":
        return (
          <span className="flex items-center gap-1 text-red-600 font-medium">
            <XCircle className="w-4 h-4" /> Ditolak
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-orange-600 font-medium">
            <Clock className="w-4 h-4" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {user.role === "ADMIN" ? "Dashboard Admin" : "Riwayat Pendaftaran"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pendaftaran Klinik</CardTitle>
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
                  {user.role === "ADMIN" && <TableHead>Pasien</TableHead>}
                  <TableHead>Poli</TableHead>
                  <TableHead>Dokter</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead>Status</TableHead>
                  {user.role === "ADMIN" && <TableHead>Aksi</TableHead>}
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
                    {user.role === "ADMIN" && (
                      <TableCell>{item.pasien.name}</TableCell>
                    )}
                    <TableCell>{item.jadwal.dokter.poli.nama}</TableCell>
                    <TableCell>{item.jadwal.dokter.nama}</TableCell>
                    <TableCell>
                      {item.jadwal.hari}, {item.jadwal.jamMulai} -{" "}
                      {item.jadwal.jamSelesai}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    {user.role === "ADMIN" && (
                      <TableCell className="space-x-2">
                        {item.status === "PENDING" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() =>
                                handleUpdateStatus(item.id, "ACCEPTED")
                              }
                            >
                              Terima
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() =>
                                handleUpdateStatus(item.id, "REJECTED")
                              }
                            >
                              Tolak
                            </Button>
                          </>
                        )}
                      </TableCell>
                    )}
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

export default Dashboard;
