/**
 * Ekstrak hingga dua huruf inisial kapital dari nama peserta.
 */
export function getInisial(nama: string): string {
	return nama
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((kata) => kata[0]!.toUpperCase())
		.join('');
}

/**
 * Gabungkan divisi dan asal daerah menjadi label metadata ringkas.
 */
export function formatMetaAnggota(
	divisi?: string,
	daerah?: string,
	fallback = 'Anggota Aethra 03',
): string {
	const parts = [divisi?.trim(), daerah?.trim()].filter((v): v is string => Boolean(v));
	return parts.length > 0 ? parts.join(' · ') : fallback;
}

/**
 * Bungkus indeks ke rentang [0, total - 1] secara aman untuk navigasi berulang.
 */
export function wrapIndex(index: number, total: number): number {
	if (total <= 0) return 0;
	return ((index % total) + total) % total;
}
