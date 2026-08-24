// ============================================================================
// SCRIPT.JS — website satu halaman (Beranda / Info Pelayanan / Lapor)
// Bagian 1: mengatur perpindahan antar "halaman" (section) tanpa reload.
// Bagian 2: menangani submit formulir pengaduan (contoh, belum ke server).
// ============================================================================

// ---------- BAGIAN 1: NAVIGASI ANTAR BAGIAN ----------

const semuaHalaman = document.querySelectorAll(".halaman");
const semuaLinkNav = document.querySelectorAll("[data-target]");

function tampilkanHalaman(idTujuan) {
  // Sembunyikan semua bagian, lalu tampilkan yang dituju saja
  semuaHalaman.forEach(function (halaman) {
    halaman.hidden = halaman.id !== idTujuan;
  });

  // Tandai menu yang sedang aktif (garis emas di nav)
  document.querySelectorAll("nav.nav-utama a").forEach(function (link) {
    link.classList.toggle("aktif", link.dataset.target === idTujuan);
  });

  // Scroll ke atas setiap pindah bagian
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Setiap elemen dengan atribut data-target (menu nav & tombol) memicu perpindahan
semuaLinkNav.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    tampilkanHalaman(link.dataset.target);
    history.replaceState(null, "", "#" + link.dataset.target);
  });
});

// Kalau website dibuka langsung dengan alamat berakhiran #pelayanan atau #lapor,
// langsung tampilkan bagian itu.
window.addEventListener("DOMContentLoaded", function () {
  const idAwal = window.location.hash.replace("#", "") || "beranda";
  if (document.getElementById(idAwal)) {
    tampilkanHalaman(idAwal);
  }
});


// ---------- BAGIAN 2: FORMULIR PENGADUAN ----------

const formPengaduan = document.getElementById("form-pengaduan");

if (formPengaduan) {
  formPengaduan.addEventListener("submit", function (event) {
    event.preventDefault(); // mencegah halaman reload

    const nama = document.getElementById("nama").value;

    // TODO: kirim data ke server/backend/Google Sheet di sini,
    // misalnya dengan fetch("URL_API", { method: "POST", body: ... })

    // Nomor tiket contoh (hanya simulasi tampilan, belum tersimpan permanen)
    const nomorTiket = "LP-" + Date.now().toString().slice(-6);

    const pesan = document.getElementById("pesan-nomor");
    pesan.style.display = "block";
    pesan.innerHTML =
      "Terima kasih, <strong>" + nama + "</strong>. " +
      "Laporan Anda tercatat dengan nomor tiket <strong>" + nomorTiket + "</strong>. " +
      "Simpan nomor ini untuk memantau status laporan.";

    formPengaduan.reset();
    pesan.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
