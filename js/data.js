// =========================================
// === FILE: js/data.js
// === DATA AWAL (DUMMY) UNTUK DEMO
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("layanan")) {
        localStorage.setItem("layanan", JSON.stringify([
            { nama: "Poli Umum", deskripsi: "Pelayanan kesehatan umum untuk semua usia." },
            { nama: "Poli Gigi", deskripsi: "Pelayanan kesehatan gigi & mulut." },
            { nama: "Poli KIA", deskripsi: "Pelayanan kesehatan ibu dan anak." }
        ]));
    }
    if (!localStorage.getItem("jadwal")) {
        localStorage.setItem("jadwal", JSON.stringify([
            { nama: "dr. Andi Saputra", spesialis: "Umum", hari: "Senin", mulai: "08:00", selesai: "12:00" },
            { nama: "drg. Sari Dewi", spesialis: "Gigi", hari: "Selasa", mulai: "09:00", selesai: "13:00" },
            { nama: "dr. Budi Hartono", spesialis: "Anak", hari: "Rabu", mulai: "10:00", selesai: "14:00" }
        ]));
    }
    if (!localStorage.getItem("infoRS")) {
        localStorage.setItem("infoRS", JSON.stringify({
            nama: "Puskesmas Desa Sehat",
            alamat: "Jl. Raya Desa No. 1, Kecamatan Sejahtera",
            telepon: "021-1234567"
        }));
    }
});