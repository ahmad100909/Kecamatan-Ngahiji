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
  event.preventDefault();

  // Ambil semua isian formulir
  const nama = document.getElementById("nama").value;
  const kontak = document.getElementById("kontak").value;
  const kategori = document.getElementById("kategori").value;
  const isi = document.getElementById("isi").value;

  // Nomor WhatsApp kecamatan (ganti dengan nomor asli, format: 62xxxxxxxxxx tanpa + atau 0 di depan)
  const nomorTujuan = "6283121936308";

  // Susun pesan otomatis
  const pesanWA =
    "Laporan Pengaduan Masyarakat%0A" +
    "Nama: " + nama + "%0A" +
    "Kontak: " + kontak + "%0A" +
    "Kategori: " + kategori + "%0A" +
    "Isi Laporan: " + isi;

  // Buka WhatsApp dengan pesan sudah terisi
  window.open("https://wa.me/" + nomorTujuan + "?text=" + pesanWA, "_blank");

  formPengaduan.reset();
});
}
