import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pesertaSchema, kenanganSchema, kegiatanSchema } from './content/schemas';

// Satu file JSON per entri (lebih mudah di Git: tiap orang menyentuh file sendiri).
// ID entri = nama file tanpa .json.
const peserta = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/peserta' }),
	schema: pesertaSchema,
});

const kenangan = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/kenangan' }),
	schema: kenanganSchema,
});

const kegiatan = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/kegiatan' }),
	schema: kegiatanSchema,
});

export const collections = { peserta, kenangan, kegiatan };
