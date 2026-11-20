# Panduan Kurator (1 halaman)

Semua isi situs berupa file di repo. Tidak ada database. Satu entri = satu file JSON.

> **Repo ini publik.** Apa pun yang di-commit bisa dilihat siapa saja, termasuk di riwayat lama.
> Jangan commit nama, foto, atau pesan seseorang sebelum orangnya setuju.
> Jangan menaruh nomor telepon atau kontak pribadi di mana pun.

## 1. Tambah peserta

Buat file `src/content/peserta/<id>.json`. `<id>` = nama singkat, huruf kecil, tanpa spasi (contoh: `ani-lestari`).

```json
{
	"nama": "Ani Lestari",
	"daerah": "Bandung",
	"divisi": "Humas",
	"kalimat": "Suka kopi dan cerita lucu.",
	"pesan": "Terima kasih untuk semuanya.",
	"foto": "ani-lestari.jpg",
	"setuju": true
}
```

- Wajib: `nama` dan `setuju`. Selain itu boleh dikosongkan.
- `divisi` bebas diisi: divisi, penempatan, atau kelompok lain.
- `setuju` harus `true`. Isi `true` hanya jika orangnya sudah setuju tampil.
- Kolom yang tidak dikenal (misalnya `telepon`) membuat build gagal. Ini disengaja.

### Foto peserta

- Taruh di `src/assets/peserta/` dengan nama persis seperti di kolom `foto`.
- Persegi (1:1), minimal 600x600 px, wajah di tengah, format jpg, png, atau webp.
- Tanpa foto, situs menampilkan inisial nama.

## 2. Tambah kenangan

Buat file `src/content/kenangan/<id>.json`.

```json
{
	"peserta": "ani-lestari",
	"nama": "Ani Lestari",
	"divisi": "Humas",
	"kegiatan": "outing",
	"teks": "Momen paling lucu: semua salah masuk ruangan di hari pertama."
}
```

- `peserta` dan `kegiatan` opsional, tetapi jika diisi harus sama dengan nama file yang sudah ada.
- Hanya kiriman yang sudah dikurasi yang dibuatkan file.

## 3. Tambah kegiatan dan dokumentasi

Buat `src/content/kegiatan/<id>.json`, foto di `src/assets/kegiatan/<id>/`.

```json
{
	"judul": "Outing Angkatan",
	"tanggal": "2026-02-01",
	"deskripsi": "Satu kalimat tentang kegiatan.",
	"foto": [{ "file": "01.jpg", "keterangan": "Foto bersama di pantai" }],
	"video": [{ "url": "https://youtu.be/xxxx", "judul": "Cuplikan" }]
}
```

- Video hanya berupa tautan `https://` (YouTube atau Drive). Jangan menaruh file video di repo.

## 4. Cek lalu kirim

```sh
pnpm test    # cek aturan data
pnpm build   # build gagal jika ada data yang salah, pesannya menyebut file dan kolomnya
git add .
git commit -m "tambah: <apa yang ditambah>"
git push
```

Hapus data contoh (`contoh-*.json`) sebelum situs dipublikasikan.
