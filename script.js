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


// ---------- BAGIAN 2: FORMULIR PENGADUAN (Lapor) ----------

const formPengaduan = document.getElementById("form-pengaduan");
const tombolWA = document.getElementById("kirim-wa");
const tombolEmail = document.getElementById("kirim-email");

function ambilDataLaporan() {
  return {
    nama: document.getElementById("nama").value,
    kontak: document.getElementById("kontak").value,
    kategori: document.getElementById("kategori").value,
    isi: document.getElementById("isi").value
  };
}

if (formPengaduan && tombolWA) {
  tombolWA.addEventListener("click", function () {
    if (!formPengaduan.reportValidity()) return; // pastikan semua kolom wajib sudah terisi

    const data = ambilDataLaporan();
    const nomorTujuan = "6283121936308";

    const pesanWA =
      "Laporan Pengaduan Masyarakat%0A" +
      "Nama: " + data.nama + "%0A" +
      "Kontak: " + data.kontak + "%0A" +
      "Kategori: " + data.kategori + "%0A" +
      "Isi Laporan: " + data.isi;

    window.open("https://wa.me/" + nomorTujuan + "?text=" + pesanWA, "_blank");
    formPengaduan.reset();
  });
}

if (formPengaduan && tombolEmail) {
  tombolEmail.addEventListener("click", function () {
    if (!formPengaduan.reportValidity()) return;

    const data = ambilDataLaporan();

    // Ganti dengan email resmi kecamatan
    const emailTujuan = "amudprhn@gmail.com";

    const subjek = "Laporan Pengaduan Masyarakat - " + data.nama;
    const isiEmail =
      "Nama: " + data.nama + "\n" +
      "Kontak: " + data.kontak + "\n" +
      "Kategori: " + data.kategori + "\n" +
      "Isi Laporan: " + data.isi;

    const linkGmail =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(emailTujuan) +
      "&su=" + encodeURIComponent(subjek) +
      "&body=" + encodeURIComponent(isiEmail);

    window.open(linkGmail, "_blank");
    formPengaduan.reset();
  });
}

// ---------- BAGIAN 3: SLIDER BERITA (Informasi Kegiatan) ----------

const sliderTrack = document.getElementById("slider-track");
const sliderTitikWadah = document.getElementById("slider-titik");
const tombolPrev = document.getElementById("slider-prev");
const tombolNext = document.getElementById("slider-next");

if (sliderTrack) {
  const semuaSlide = sliderTrack.querySelectorAll(".slide-berita");
  let indeksAktif = 0;
  let waktuOtomatis;

  // Buat titik indikator sesuai jumlah slide (otomatis, tidak perlu diketik manual)
  semuaSlide.forEach(function (_, i) {
    const titik = document.createElement("button");
    if (i === 0) titik.classList.add("aktif");
    titik.addEventListener("click", function () {
      pindahKeSlide(i);
      resetOtomatis();
    });
    sliderTitikWadah.appendChild(titik);
  });

  const semuaTitik = sliderTitikWadah.querySelectorAll("button");

  function pindahKeSlide(indeks) {
    indeksAktif = indeks;
    sliderTrack.style.transform = "translateX(-" + (indeksAktif * 100) + "%)";
    semuaTitik.forEach(function (t, i) {
      t.classList.toggle("aktif", i === indeksAktif);
    });
  }

  function slideBerikutnya() {
    const berikutnya = (indeksAktif + 1) % semuaSlide.length; // kembali ke slide pertama setelah yang terakhir
    pindahKeSlide(berikutnya);
  }

  function slideSebelumnya() {
    const sebelumnya = (indeksAktif - 1 + semuaSlide.length) % semuaSlide.length;
    pindahKeSlide(sebelumnya);
  }

  function mulaiOtomatis() {
    waktuOtomatis = setInterval(slideBerikutnya, 4000); // ganti slide tiap 4 detik
  }

  function resetOtomatis() {
    clearInterval(waktuOtomatis);
    mulaiOtomatis();
  }

  tombolNext.addEventListener("click", function () {
    slideBerikutnya();
    resetOtomatis();
  });

  tombolPrev.addEventListener("click", function () {
    slideSebelumnya();
    resetOtomatis();
  });

  mulaiOtomatis();
}

// ---------- BAGIAN 4: FORMULIR LAPOR FASILITAS ----------

const formFasilitas = document.getElementById("form-fasilitas");

if (formFasilitas) {
  formFasilitas.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama-fasilitas").value;
    const kontak = document.getElementById("kontak-fasilitas").value;
    const jenis = document.getElementById("jenis-fasilitas").value;
    const lokasi = document.getElementById("lokasi-fasilitas").value;
    const deskripsi = document.getElementById("deskripsi-fasilitas").value;

    // Nomor WhatsApp kecamatan (boleh sama atau beda dengan nomor Lapor umum)
    const nomorTujuan = "6283121936308";

    const pesanWA =
      "Laporan Kerusakan Fasilitas Umum%0A" +
      "Nama: " + nama + "%0A" +
      "Kontak: " + kontak + "%0A" +
      "Jenis Fasilitas: " + jenis + "%0A" +
      "Lokasi: " + lokasi + "%0A" +
      "Deskripsi: " + deskripsi;

    window.open("https://wa.me/" + nomorTujuan + "?text=" + pesanWA, "_blank");

    formFasilitas.reset();
  });
}

// ---------- BAGIAN 5: TAMPILKAN NAMA FILE YANG DIPILIH ----------

const inputDokumen = document.getElementById("dokumen");
const labelNamaFile = document.getElementById("nama-file-terpilih");

if (inputDokumen && labelNamaFile) {
  inputDokumen.addEventListener("change", function () {
    if (inputDokumen.files.length > 0) {
      labelNamaFile.textContent = "File terpilih: " + inputDokumen.files[0].name +
        " — jangan lupa lampirkan manual saat mengirim.";
    } else {
      labelNamaFile.textContent = "Format: PDF, JPG, atau PNG. Maks. 5MB.";
    }
  });
}