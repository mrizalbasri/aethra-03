import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pesertaSchema, kenanganSchema, kegiatanSchema } from './schemas';

const base = { nama: 'Ani', setuju: true };

describe('pesertaSchema', () => {
	it('menerima data minimal', () => {
		expect(pesertaSchema.safeParse(base).success).toBe(true);
	});

	it('menolak jika kolom wajib kosong', () => {
		expect(pesertaSchema.safeParse({ setuju: true }).success).toBe(false);
		expect(pesertaSchema.safeParse({ nama: '', setuju: true }).success).toBe(false);
		expect(pesertaSchema.safeParse({ nama: 'Ani' }).success).toBe(false);
	});

	it('menolak kolom tak dikenal, termasuk telepon', () => {
		expect(pesertaSchema.safeParse({ ...base, telepon: '0812' }).success).toBe(false);
	});

	it('menolak teks yang memuat nomor telepon', () => {
		for (const nomor of ['0812-3456-7890', '+62 812 3456 7890', '081234567890']) {
			const r = pesertaSchema.safeParse({ ...base, pesan: `Hubungi ${nomor}` });
			expect(r.success, nomor).toBe(false);
		}
	});

	it('menerima teks biasa yang memuat angka', () => {
		expect(pesertaSchema.safeParse({ ...base, kalimat: 'Angkatan 3, nomor urut 17' }).success).toBe(
			true,
		);
	});

	it('menolak nama file foto yang tidak valid', () => {
		expect(pesertaSchema.safeParse({ ...base, foto: 'Foto Ani.PDF' }).success).toBe(false);
		expect(pesertaSchema.safeParse({ ...base, foto: 'ani.jpg' }).success).toBe(true);
	});
});

describe('kenanganSchema', () => {
	it('butuh nama dan teks', () => {
		expect(kenanganSchema.safeParse({ nama: 'Ani', teks: 'Lucu sekali' }).success).toBe(true);
		expect(kenanganSchema.safeParse({ nama: 'Ani' }).success).toBe(false);
	});
});

describe('kegiatanSchema', () => {
	it('mengisi foto dan video dengan array kosong', () => {
		const r = kegiatanSchema.parse({ judul: 'Outing', tanggal: '2026-02-01' });
		expect(r.foto).toEqual([]);
		expect(r.video).toEqual([]);
	});

	it('menolak tautan video non-https', () => {
		const r = kegiatanSchema.safeParse({
			judul: 'Outing',
			tanggal: '2026-02-01',
			video: [{ url: 'http://contoh.com/v' }],
		});
		expect(r.success).toBe(false);
	});
});

describe('integritas data di src/content', () => {
	const dir = (n: string) => join(import.meta.dirname, n);
	const load = (n: string) =>
		readdirSync(dir(n))
			.filter((f) => f.endsWith('.json'))
			.map((f) => ({ id: f.replace(/\.json$/, ''), data: JSON.parse(readFileSync(join(dir(n), f), 'utf8')) }));

	it('semua file valid terhadap skemanya', () => {
		for (const e of load('peserta')) expect(pesertaSchema.safeParse(e.data).success, e.id).toBe(true);
		for (const e of load('kenangan')) expect(kenanganSchema.safeParse(e.data).success, e.id).toBe(true);
		for (const e of load('kegiatan')) expect(kegiatanSchema.safeParse(e.data).success, e.id).toBe(true);
	});

	it('rujukan peserta dan kegiatan di kenangan mengarah ke entri yang ada', () => {
		const pesertaIds = new Set(load('peserta').map((e) => e.id));
		const kegiatanIds = new Set(load('kegiatan').map((e) => e.id));
		for (const k of load('kenangan')) {
			if (k.data.peserta) expect(pesertaIds.has(k.data.peserta), `${k.id}: peserta`).toBe(true);
			if (k.data.kegiatan) expect(kegiatanIds.has(k.data.kegiatan), `${k.id}: kegiatan`).toBe(true);
		}
	});
});
