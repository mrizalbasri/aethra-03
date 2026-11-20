import { z } from 'astro/zod';

/**
 * Skema data murni (tanpa API Astro) supaya bisa diuji dengan Vitest.
 * Dipakai oleh src/content.config.ts.
 *
 * Aturan privasi: skema bersifat `strict`, jadi kolom tak dikenal
 * (misalnya "telepon") ditolak, dan teks yang mirip nomor telepon ditolak.
 */

// Nomor HP Indonesia: 08xx..., +628xx..., 628xx... (9+ digit setelah awalan)
const PHONE_LIKE = /(?:\+?62|0)[\s-]?8[\d\s-]{8,}/;

const safeText = (max: number) =>
	z
		.string()
		.trim()
		.max(max)
		.refine((v) => !PHONE_LIKE.test(v), {
			message: 'Teks tidak boleh memuat nomor telepon. Hapus nomor pribadi.',
		});

const imageFile = z
	.string()
	.regex(/^[a-z0-9._-]+\.(jpe?g|png|webp)$/i, 'Nama file foto: huruf kecil, angka, titik, strip; berakhiran jpg/png/webp');

export const pesertaSchema = z
	.object({
		nama: safeText(80).pipe(z.string().min(1)),
		daerah: safeText(60).optional(),
		/** Divisi, penempatan, atau kelompok lain. Bebas diisi, boleh kosong. */
		divisi: safeText(80).optional(),
		/** Satu hal yang ingin dikenal dari dirinya. */
		kalimat: safeText(140).optional(),
		/** Pesan singkat (opsional). */
		pesan: safeText(500).optional(),
		/** Nama file di src/assets/peserta/. Jika kosong, tampil inisial. */
		foto: imageFile.optional(),
		/** Harus true agar peserta ditampilkan. */
		setuju: z.boolean(),
	})
	.strict();

export const kenanganSchema = z
	.object({
		/** ID peserta (nama file di content/peserta tanpa .json). Opsional. */
		peserta: z.string().optional(),
		nama: safeText(80).pipe(z.string().min(1)),
		divisi: safeText(80).optional(),
		/** ID kegiatan (nama file di content/kegiatan tanpa .json). Opsional. */
		kegiatan: z.string().optional(),
		teks: safeText(600).pipe(z.string().min(1)),
	})
	.strict();

const videoUrl = z
	.string()
	.url()
	.refine((u) => u.startsWith('https://'), { message: 'Tautan video harus https://' });

export const kegiatanSchema = z
	.object({
		judul: safeText(100).pipe(z.string().min(1)),
		/** Format YYYY-MM-DD */
		tanggal: z.coerce.date(),
		deskripsi: safeText(400).optional(),
		/** File di src/assets/kegiatan/<id-kegiatan>/ */
		foto: z
			.array(
				z
					.object({
						file: imageFile,
						keterangan: safeText(160).optional(),
					})
					.strict(),
			)
			.default([]),
		video: z
			.array(
				z
					.object({
						url: videoUrl,
						judul: safeText(100).optional(),
					})
					.strict(),
			)
			.default([]),
	})
	.strict();

export type Peserta = z.infer<typeof pesertaSchema>;
export type Kenangan = z.infer<typeof kenanganSchema>;
export type Kegiatan = z.infer<typeof kegiatanSchema>;
