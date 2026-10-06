// =========================================
// === FILE: js/admin.js
// === LOGIN, LOGOUT, & CRUD ADMIN (FINAL)
// =========================================

const DEMO_USER = { username: "admin", password: "admin123" };

// === CEK STATUS LOGIN SAAT HALAMAN DIBUKA ===
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginSection = document.getElementById("loginSection");
    const dashboardSection = document.getElementById("dashboardSection");

    if (isLoggedIn) {
        if (loginSection) loginSection.style.display = "none";
        if (dashboardSection) dashboardSection.style.display = "block";
        document.getElementById("adminName").textContent = localStorage.getItem("adminName") || "Admin";
        tampilkanLayanan();
        tampilkanJadwal();
        tampilkanInfo();
    } else {
        if (loginSection) loginSection.style.display = "block";
        if (dashboardSection) dashboardSection.style.display = "none";
    }

    // === HANDLE FORM LOGIN ===
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const u = document.getElementById("username").value.trim();
            const p = document.getElementById("password").value.trim();
            const err = document.getElementById("errorMsg");

            if (u === DEMO_USER.username && p === DEMO_USER.password) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("adminName", u);
                location.reload();
            } else {
                err.style.display = "block";
            }
        });
    }
});

// === LOGOUT ===
function logout() {
    if (confirm("Yakin ingin logout?")) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("adminName");
        location.reload();
    }
}

// === NAVIGASI MENU ===
function showSection(nama) {
    document.querySelectorAll(".section-box").forEach(el => el.classList.remove("active"));
    document.getElementById("section-" + nama).classList.add("active");
}

// =========================================
// === CRUD: LAYANAN ===
// =========================================
function simpanLayanan() {
    const idx = document.getElementById("editIndexLayanan").value;
    const nama = document.getElementById("namaLayanan").value.trim();
    const deskripsi = document.getElementById("deskripsiLayanan").value.trim();
    if (!nama) return alert("Nama layanan harus diisi!");

    const data = JSON.parse(localStorage.getItem("layanan") || "[]");
    if (idx === "") {
        data.push({ nama, deskripsi });
        alert("Layanan berhasil ditambahkan!");
    } else {
        data[idx] = { nama, deskripsi };
        alert("Layanan berhasil diupdate!");
    }
    localStorage.setItem("layanan", JSON.stringify(data));
    resetFormLayanan();
    tampilkanLayanan();
}

function tampilkanLayanan() {
    const data = JSON.parse(localStorage.getItem("layanan") || "[]");
    const list = document.getElementById("listLayanan");
    if (!list) return;
    list.innerHTML = data.length === 0
        ? "<p style='color:#999;'>Belum ada layanan.</p>"
        : data.map((item, i) => `
            <div class="data-item">
                <b>${item.nama}</b> — ${item.deskripsi}
                <span style="float:right;">
                    <button class="btn-icon" onclick="editLayanan(${i})">✏️</button>
                    <button class="btn-icon" onclick="hapusLayanan(${i})">❌</button>
                </span>
            </div>
        `).join("");
}

function editLayanan(i) {
    const data = JSON.parse(localStorage.getItem("layanan") || "[]");
    document.getElementById("namaLayanan").value = data[i].nama;
    document.getElementById("deskripsiLayanan").value = data[i].deskripsi;
    document.getElementById("editIndexLayanan").value = i;
    document.getElementById("btnSimpanLayanan").textContent = "Update Layanan";
    document.getElementById("btnBatalLayanan").style.display = "inline-block";
    document.getElementById("section-layanan").scrollIntoView({ behavior: "smooth" });
}

function resetFormLayanan() {
    document.getElementById("namaLayanan").value = "";
    document.getElementById("deskripsiLayanan").value = "";
    document.getElementById("editIndexLayanan").value = "";
    document.getElementById("btnSimpanLayanan").textContent = "Tambah Layanan";
    document.getElementById("btnBatalLayanan").style.display = "none";
}

function hapusLayanan(i) {
    if (!confirm("Hapus layanan ini?")) return;
    const data = JSON.parse(localStorage.getItem("layanan") || "[]");
    data.splice(i, 1);
    localStorage.setItem("layanan", JSON.stringify(data));
    tampilkanLayanan();
}

// =========================================
// === CRUD: JADWAL ===
// =========================================
function simpanJadwal() {
    const idx = document.getElementById("editIndexJadwal").value;
    const nama = document.getElementById("namaDokter").value.trim();
    const spesialis = document.getElementById("spesialis").value.trim();
    const hari = document.getElementById("hari").value.trim();
    const mulai = document.getElementById("jamMulai").value;
    const selesai = document.getElementById("jamSelesai").value;
    if (!nama || !hari) return alert("Nama dokter & hari harus diisi!");

    const data = JSON.parse(localStorage.getItem("jadwal") || "[]");
    if (idx === "") {
        data.push({ nama, spesialis, hari, mulai, selesai });
        alert("Jadwal berhasil ditambahkan!");
    } else {
        data[idx] = { nama, spesialis, hari, mulai, selesai };
        alert("Jadwal berhasil diupdate!");
    }
    localStorage.setItem("jadwal", JSON.stringify(data));
    resetFormJadwal();
    tampilkanJadwal();
}

function tampilkanJadwal() {
    const data = JSON.parse(localStorage.getItem("jadwal") || "[]");
    const list = document.getElementById("listJadwal");
    if (!list) return;
    list.innerHTML = data.length === 0
        ? "<p style='color:#999;'>Belum ada jadwal.</p>"
        : data.map((item, i) => `
            <div class="data-item">
                <b>${item.nama}</b> (${item.spesialis}) — ${item.hari}, ${item.mulai}-${item.selesai}
                <span style="float:right;">
                    <button class="btn-icon" onclick="editJadwal(${i})">✏️</button>
                    <button class="btn-icon" onclick="hapusJadwal(${i})">❌</button>
                </span>
            </div>
        `).join("");
}

function editJadwal(i) {
    const data = JSON.parse(localStorage.getItem("jadwal") || "[]");
    document.getElementById("namaDokter").value = data[i].nama;
    document.getElementById("spesialis").value = data[i].spesialis;
    document.getElementById("hari").value = data[i].hari;
    document.getElementById("jamMulai").value = data[i].mulai;
    document.getElementById("jamSelesai").value = data[i].selesai;
    document.getElementById("editIndexJadwal").value = i;
    document.getElementById("btnSimpanJadwal").textContent = "Update Jadwal";
    document.getElementById("btnBatalJadwal").style.display = "inline-block";
    document.getElementById("section-jadwal").scrollIntoView({ behavior: "smooth" });
}

function resetFormJadwal() {
    ["namaDokter", "spesialis", "hari", "jamMulai", "jamSelesai"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("editIndexJadwal").value = "";
    document.getElementById("btnSimpanJadwal").textContent = "Tambah Jadwal";
    document.getElementById("btnBatalJadwal").style.display = "none";
}

function hapusJadwal(i) {
    if (!confirm("Hapus jadwal ini?")) return;
    const data = JSON.parse(localStorage.getItem("jadwal") || "[]");
    data.splice(i, 1);
    localStorage.setItem("jadwal", JSON.stringify(data));
    tampilkanJadwal();
}

// =========================================
// === CRUD: INFORMASI RS ===
// =========================================
function simpanInfo() {
    const nama = document.getElementById("namaRS").value.trim();
    const alamat = document.getElementById("alamatRS").value.trim();
    const telepon = document.getElementById("teleponRS").value.trim();
    if (!nama) return alert("Nama puskesmas harus diisi!");

    localStorage.setItem("infoRS", JSON.stringify({ nama, alamat, telepon }));
    resetFormInfo();
    tampilkanInfo();
    alert("Informasi berhasil disimpan!");
}

function tampilkanInfo() {
    const data = JSON.parse(localStorage.getItem("infoRS") || "null");
    const list = document.getElementById("listInfo");
    if (!list) return;
    list.innerHTML = !data
        ? "<p style='color:#999;'>Belum ada informasi.</p>"
        : `<div class="data-item">
            <b>${data.nama}</b><br>
            ${data.alamat}<br>
            📞 ${data.telepon}
            <span style="float:right;">
                <button class="btn-icon" onclick="editInfo()">✏️</button>
            </span>
        </div>`;
}

function editInfo() {
    const data = JSON.parse(localStorage.getItem("infoRS") || "null");
    if (!data) return;
    document.getElementById("namaRS").value = data.nama;
    document.getElementById("alamatRS").value = data.alamat;
    document.getElementById("teleponRS").value = data.telepon;
    document.getElementById("btnSimpanInfo").textContent = "Update Informasi";
    document.getElementById("btnBatalInfo").style.display = "inline-block";
    document.getElementById("section-info").scrollIntoView({ behavior: "smooth" });
}

function resetFormInfo() {
    document.getElementById("namaRS").value = "";
    document.getElementById("alamatRS").value = "";
    document.getElementById("teleponRS").value = "";
    document.getElementById("btnSimpanInfo").textContent = "Simpan Informasi";
    document.getElementById("btnBatalInfo").style.display = "none";
}