# Rencana Web Angkatan Magang

Web untuk peserta angkatan magang (64 orang). Dibuat khusus untuk peserta, bukan untuk penyelenggara.

## Tujuan

- Peserta saling mengenal dan punya tempat untuk berbagi kenangan.
- Versi awal statis, tanpa login dan tanpa database.
- Konten diperbarui lewat file dan Google Form, lalu dikurasi pengurus.

## Stack

- **Astro** (statis) untuk seluruh halaman.
- **Markdown atau JSON** untuk data peserta dan kenangan.
- **Google Form + Google Sheets** untuk mengumpulkan kiriman peserta (CSV publik saat build).
- **Hosting statis** seperti Netlify, Vercel, atau GitHub Pages.

## Tema Nama Halaman

Usulan tema perjalanan, karena semua peserta sedang menjalani satu periode yang sama. Pilihan lain: tema kebersamaan.

| Fungsi | Nama Usulan | Alternatif |
|---|---|---|
| Beranda | Rumah Angkatan | Selamat Datang |
| Kenalan | Wajah-Wajah 64 | Teman Seperjuangan |
| Kenangan | Jejak Kita | Cerita Kita |
| Galeri | Momen | Frame Kita |
| Info & Dokumen | Pusat Info | Arsip Angkatan |
| Kontak | Teman Koordinasi | Tanya ke Siapa? |

## Halaman

### 1. Beranda (Rumah Angkatan)

- Nama angkatan, periode magang, dan sambutan singkat.
- Foto bersama angkatan.
- Hitung mundur ke akhir magang.
- Tautan cepat ke Jejak Kita dan Wajah-Wajah 64.

### 2. Kenalan (Wajah-Wajah 64)

- Kartu untuk 64 peserta, dengan pencarian dan filter divisi atau daerah.
- Isi kartu mengikuti yang ingin dibagikan peserta, misalnya:
  - Nama dan daerah asal
  - Divisi atau penempatan
  - Satu hal yang ingin dikenal dari dirinya
  - Kata-kata atau pesan singkat (opsional)
- Setiap peserta menentukan sendiri isi kartunya.

### 3. Kenangan (Jejak Kita)

- Bagian utama yang membuat web terasa hidup.
- Kiriman peserta lewat Google Form, lalu dikurasi sebelum tayang.
- Ditampilkan sebagai kartu, bisa diacak atau dikelompokkan per kegiatan.
- Setiap kenangan menampilkan nama, divisi, dan nama kegiatan.
- Pertanyaan form yang memancing cerita, misalnya:
  - Momen paling lucu selama magang
  - Hal yang paling tidak terduga
  - Pesan untuk teman yang kamu kenal di sini

### 4. Galeri (Momen) — tahap lanjutan

- Foto dan video dikelompokkan per kegiatan dengan keterangan singkat.
- Ditambahkan saat dokumentasi sudah cukup banyak.

### 5. Info & Dokumen (Pusat Info) — tahap lanjutan

- Jadwal dan pengumuman.
- Template laporan dan dokumen penting.
- Tautan ke situs resmi magang.

### 6. Kontak (Teman Koordinasi) — tahap lanjutan

- Siapa yang bisa dihubungi untuk urusan angkatan.
- Tanpa nomor pribadi.

## Tahap Pengerjaan

**Tahap 1 (awal):** Beranda, Wajah-Wajah 64, Jejak Kita.

**Tahap 2:** Momen, Pusat Info, Teman Koordinasi.

## Catatan Privasi

- Data peserta ditampilkan publik, jadi pastikan setiap peserta sudah setuju.
- Jangan tampilkan nomor telepon atau kontak pribadi.
- Repo atau spreadsheet sebaiknya privat, dan editornya dibatasi.
- Logo dan nama program resmi dipakai seperlunya, dan footer menyebut bahwa web ini inisiatif peserta.

## Yang Masih Perlu Diputuskan

- [ ] Pilih tema nama: perjalanan atau kebersamaan
- [ ] Tentukan pertanyaan Google Form untuk peserta
- [ ] Tentukan siapa yang mengkurasi kiriman
- [ ] Tentukan platform hosting
