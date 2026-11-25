export interface MemberItem {
	no: string;
	nama: string;
	inisial: string;
	meta: string;
	divisi?: string;
	daerah?: string;
	kalimat?: string;
	pesan?: string;
	fotoUrl?: string;
	tercatat: boolean;
}

export function setupMemberModal(items: MemberItem[]) {
	const dialog = document.querySelector<HTMLDialogElement>('[data-member-dialog]');
	if (!dialog || items.length === 0) {
		return { openAt: () => {} };
	}

	const noEl = dialog.querySelector<HTMLElement>('[data-md-no]');
	const statusEl = dialog.querySelector<HTMLElement>('[data-md-status]');
	const counterEl = dialog.querySelector<HTMLElement>('[data-md-counter]');
	const avatarEl = dialog.querySelector<HTMLElement>('[data-md-avatar]');
	const imgEl = dialog.querySelector<HTMLImageElement>('[data-md-img]');
	const initialsEl = dialog.querySelector<HTMLElement>('[data-md-initials]');
	const namaEl = dialog.querySelector<HTMLElement>('[data-md-nama]');
	const metaEl = dialog.querySelector<HTMLElement>('[data-md-meta]');
	const kalimatWrap = dialog.querySelector<HTMLElement>('[data-md-kalimat-wrap]');
	const kalimatEl = dialog.querySelector<HTMLElement>('[data-md-kalimat]');
	const pesanWrap = dialog.querySelector<HTMLElement>('[data-md-pesan-wrap]');
	const pesanEl = dialog.querySelector<HTMLElement>('[data-md-pesan]');
	const emptyWrap = dialog.querySelector<HTMLElement>('[data-md-empty-wrap]');
	const closeBtn = dialog.querySelector<HTMLButtonElement>('[data-md-close]');
	const prevBtn = dialog.querySelector<HTMLButtonElement>('[data-md-prev]');
	const nextBtn = dialog.querySelector<HTMLButtonElement>('[data-md-next]');

	let currentIndex = 0;

	const render = (index: number) => {
		const total = items.length;
		currentIndex = ((index % total) + total) % total;
		const item = items[currentIndex];
		if (!item) return;

		if (noEl) noEl.textContent = `#${item.no}`;
		if (statusEl) {
			statusEl.textContent = item.tercatat ? 'Profil Terisi' : 'Kursi Menunggu';
		}
		if (counterEl) {
			counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
		}
		if (avatarEl) {
			avatarEl.classList.toggle('is-open-slot', !item.tercatat);
		}
		if (imgEl && initialsEl) {
			if (item.fotoUrl) {
				imgEl.src = item.fotoUrl;
				imgEl.alt = item.nama;
				imgEl.hidden = false;
				initialsEl.hidden = true;
			} else {
				imgEl.removeAttribute('src');
				imgEl.hidden = true;
				initialsEl.hidden = false;
				initialsEl.textContent = item.tercatat ? item.inisial : '✦';
			}
		}
		if (namaEl) namaEl.textContent = item.nama;
		if (metaEl) metaEl.textContent = item.meta;

		if (kalimatWrap && kalimatEl) {
			const hasKalimat = Boolean(item.tercatat && item.kalimat);
			kalimatWrap.hidden = !hasKalimat;
			kalimatEl.textContent = item.kalimat ?? '';
		}
		if (pesanWrap && pesanEl) {
			const hasPesan = Boolean(item.tercatat && item.pesan);
			pesanWrap.hidden = !hasPesan;
			pesanEl.textContent = item.pesan ?? '';
		}
		if (emptyWrap) {
			emptyWrap.hidden = item.tercatat;
		}
	};

	const openAt = (index: number) => {
		render(index);
		if (!dialog.open) {
			dialog.showModal();
		}
	};

	closeBtn?.addEventListener('click', () => dialog.close());
	prevBtn?.addEventListener('click', () => render(currentIndex - 1));
	nextBtn?.addEventListener('click', () => render(currentIndex + 1));

	dialog.addEventListener('click', (e) => {
		if (e.target === dialog) {
			dialog.close();
		}
	});

	dialog.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			render(currentIndex - 1);
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			render(currentIndex + 1);
		}
	});

	return { openAt };
}
