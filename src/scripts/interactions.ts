import { gsap } from 'gsap';

let initialized = false;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function initGlobalInteractions() {
	if (initialized || typeof window === 'undefined') return;
	initialized = true;

	// 1. Progress bar scroll di atas header
	const progressEl = document.querySelector<HTMLElement>('[data-scroll-progress]');
	if (progressEl) {
		let rafPending = false;
		const updateProgress = () => {
			rafPending = false;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			const ratio = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
			progressEl.style.transform = `scaleX(${ratio})`;
		};
		const schedule = () => {
			if (rafPending) return;
			rafPending = true;
			window.requestAnimationFrame(updateProgress);
		};
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });
		updateProgress();
	}

	// 2. Kursor interaktif & elemen magnetik (khusus desktop & tanpa kurangi-gerakan)
	const fineReducedOk = window.matchMedia(
		'(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
	).matches;
	if (!fineReducedOk) return;

	const cursorEl = document.querySelector<HTMLElement>('[data-cursor-el]');
	const cursorLabel = document.querySelector<HTMLElement>('[data-cursor-label]');

	if (cursorEl && cursorLabel) {
		document.body.classList.add('has-cursor');
		gsap.set(cursorEl, { opacity: 0, x: -100, y: -100 });

		const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.2, ease: 'power3.out' });
		const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.2, ease: 'power3.out' });

		let visible = false;
		window.addEventListener(
			'pointermove',
			(e) => {
				if (!visible) {
					visible = true;
					gsap.to(cursorEl, { opacity: 1, duration: 0.18 });
				}
				xTo(e.clientX + 14);
				yTo(e.clientY + 14);
			},
			{ passive: true },
		);

		document.documentElement.addEventListener('pointerleave', () => {
			visible = false;
			gsap.to(cursorEl, { opacity: 0, duration: 0.15 });
		});

		document.addEventListener('pointerover', (e) => {
			const hit = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor]');
			const label = hit?.dataset.cursor;
			if (label) {
				cursorLabel.textContent = label;
				cursorEl.classList.add('is-labeled');
			}
		});

		document.addEventListener('pointerout', (e) => {
			const nextHit = (e.relatedTarget as Element | null)?.closest<HTMLElement>('[data-cursor]');
			const nextLabel = nextHit?.dataset.cursor;
			if (nextLabel) {
				cursorLabel.textContent = nextLabel;
				cursorEl.classList.add('is-labeled');
			} else {
				cursorEl.classList.remove('is-labeled');
				cursorLabel.textContent = '';
			}
		});
	}

	// Elemen magnetik
	document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
		el.addEventListener('pointermove', (e) => {
			const rect = el.getBoundingClientRect();
			const dx = clamp((e.clientX - (rect.left + rect.width / 2)) * 0.22, -7, 7);
			const dy = clamp((e.clientY - (rect.top + rect.height / 2)) * 0.22, -7, 7);
			gsap.to(el, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' });
		});
		el.addEventListener('pointerleave', () => {
			gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
		});
	});
}

export function initTiltCards(selector = '[data-tilt]') {
	if (typeof window === 'undefined') return;
	const fineReducedOk = window.matchMedia(
		'(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
	).matches;
	if (!fineReducedOk) return;

	document.querySelectorAll<HTMLElement>(selector).forEach((card) => {
		if (card.dataset.tiltBound === '1') return;
		card.dataset.tiltBound = '1';

		card.addEventListener('pointermove', (e) => {
			const rect = card.getBoundingClientRect();
			if (!rect.width || !rect.height) return;
			const px = clamp((e.clientX - rect.left) / rect.width, 0, 1);
			const py = clamp((e.clientY - rect.top) / rect.height, 0, 1);

			card.style.setProperty('--mx', `${px * 100}%`);
			card.style.setProperty('--my', `${py * 100}%`);

			gsap.to(card, {
				rotateX: (0.5 - py) * 5,
				rotateY: (px - 0.5) * 5,
				transformPerspective: 900,
				duration: 0.3,
				ease: 'power2.out',
			});
		});

		card.addEventListener('pointerleave', () => {
			gsap.to(card, {
				rotateX: 0,
				rotateY: 0,
				duration: 0.45,
				ease: 'power2.out',
			});
		});
	});
}

initGlobalInteractions();
