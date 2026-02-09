import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    symptom: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Pendaftaran Berhasil! Silakan tunggu konfirmasi.");
        setFormData({ name: "", phone: "", symptom: "" });
      } else {
        setStatus("Error: " + data.message);
      }
    } catch (error) {
      setStatus("Gagal menghubungkan ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Klinik Kita</h1>
        <p className="subtitle">Pendaftaran Pasien Online</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              placeholder="Masukkan nama Anda"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Nomor Telepon</label>
            <input
              type="tel"
              id="phone"
              placeholder="0812xxxxxx"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="symptom">Keluhan / Gejala</label>
            <textarea
              id="symptom"
              rows="3"
              placeholder="Apa yang Anda rasakan?"
              value={formData.symptom}
              onChange={(e) =>
                setFormData({ ...formData, symptom: e.target.value })
              }
              required
            ></textarea>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Mengirim..." : "Daftar Sekarang"}
          </button>
        </form>

        {status && (
          <div
            className={`success-message ${status.includes("Error") || status.includes("Gagal") ? "error" : ""}`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
