import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Jalankan animasi hanya jika pengguna TIDAK memilih "kurangi gerakan".
 * Jika memilih kurangi gerakan, `onReduced` (opsional) dipanggil agar konten
 * tetap tampil tanpa animasi. Animasi dibersihkan otomatis saat preferensi berubah.
 */
export function initMotion(
	animate: (g: typeof gsap, st: typeof ScrollTrigger) => void,
	onReduced?: () => void,
) {
	const mm = gsap.matchMedia();
	mm.add('(prefers-reduced-motion: no-preference)', () => {
		animate(gsap, ScrollTrigger);
	});
	mm.add('(prefers-reduced-motion: reduce)', () => {
		onReduced?.();
	});
	return mm;
}
