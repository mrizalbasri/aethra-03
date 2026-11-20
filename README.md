# Aethra 03: Web Dokumentasi Angkatan

Situs statis untuk dokumentasi angkatan magang **Aethra 03** (Masadagri, Kemendagri).
Dibuat oleh peserta, untuk peserta. Cipta · Rasa · Karsa.

Rencana lengkap ada di [rencana-web-angkatan.md](./rencana-web-angkatan.md).

## Stack

- [Astro](https://astro.build) (statis)
- GSAP + ScrollTrigger untuk animasi scroll
- Data berupa file di repo (`peserta`, `kenangan`, `kegiatan`), tanpa database

## Perintah

Memakai [pnpm](https://pnpm.io).

| Perintah         | Fungsi                             |
| ---------------- | ---------------------------------- |
| `pnpm install`   | Pasang dependensi                  |
| `pnpm dev`       | Jalankan server pengembangan       |
| `pnpm build`     | Bangun situs ke folder `dist/`     |
| `pnpm preview`   | Lihat hasil build secara lokal     |

## Menambah isi

Lihat [docs/panduan-kurator.md](./docs/panduan-kurator.md).

## Privasi

- Repo ini **publik**. Jangan commit nama, foto, atau pesan peserta sebelum orangnya setuju.
- Jangan menaruh nomor telepon atau kontak pribadi di data apa pun. Skema menolaknya.
- Hanya peserta dengan `"setuju": true` yang ditampilkan.
- Situs ini menyertakan `noindex` agar tidak muncul di mesin pencari.
