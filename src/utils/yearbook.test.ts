import { describe, expect, it } from 'vitest';
import { formatMetaAnggota, getInisial, wrapIndex } from './yearbook';

describe('getInisial', () => {
	it('mengambil satu huruf untuk nama satu kata', () => {
		expect(getInisial('Ani')).toBe('A');
	});

	it('mengambil maksimal dua huruf kapital untuk nama multi-kata', () => {
		expect(getInisial('Ani Lestari')).toBe('AL');
		expect(getInisial('Muhammad Rizal Basri')).toBe('MR');
	});

	it('mengabaikan spasi berlebih dan mengembalikan kosong bila tidak ada kata', () => {
		expect(getInisial('   siti   nurhaliza  ')).toBe('SN');
		expect(getInisial('   ')).toBe('');
	});
});

describe('formatMetaAnggota', () => {
	it('menggabungkan divisi dan daerah yang terisi', () => {
		expect(formatMetaAnggota('Humas', 'Bandung')).toBe('Humas · Bandung');
	});

	it('menampilkan salah satu saja jika pasangannya kosong', () => {
		expect(formatMetaAnggota('Humas', undefined)).toBe('Humas');
		expect(formatMetaAnggota(undefined, 'Makassar')).toBe('Makassar');
	});

	it('menggunakan fallback jika keduanya kosong atau spasi saja', () => {
		expect(formatMetaAnggota(undefined, '')).toBe('Anggota Aethra 03');
		expect(formatMetaAnggota('  ', undefined, 'Masadagri III')).toBe('Masadagri III');
	});
});

describe('wrapIndex', () => {
	it('mempertahankan indeks dalam batas normal', () => {
		expect(wrapIndex(0, 64)).toBe(0);
		expect(wrapIndex(15, 64)).toBe(15);
	});

	it('membungkus indeks berlebih maupun negatif', () => {
		expect(wrapIndex(64, 64)).toBe(0);
		expect(wrapIndex(65, 64)).toBe(1);
		expect(wrapIndex(-1, 64)).toBe(63);
		expect(wrapIndex(-65, 64)).toBe(63);
	});

	it('mengembalikan 0 jika total nol atau negatif', () => {
		expect(wrapIndex(3, 0)).toBe(0);
		expect(wrapIndex(-2, -5)).toBe(0);
	});
});
