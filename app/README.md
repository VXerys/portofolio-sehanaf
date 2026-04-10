# app

Folder ini adalah root Next.js App Router untuk route, layout, dan segment-level behavior.

## Kegunaan
- Menyimpan route entrypoint seperti `page.tsx` dan `layout.tsx`.
- Menjadi tempat `loading.tsx` dan `not-found.tsx` per segmen saat dibutuhkan.
- Menjaga boundary Server Component dan Client Component tetap jelas.

## Aturan Utama
- Prioritaskan RSC-first: fetch data utama di Server Component.
- Client Component dipakai untuk interaksi dan animasi, bukan fetch utama portfolio read path.
- Dynamic segment harus memakai pola `not-found` saat data tidak ada.
- Revalidasi cache harus server-side dan berbasis kebijakan yang eksplisit.

## Pola Struktur
- `layout.tsx`: wiring provider global yang aman untuk App Router.
- `page.tsx`: komposisi halaman level route.
- `segment/loading.tsx`: state loading per segment.
- `segment/not-found.tsx`: fallback not found per segment.

## Referensi
- `docs/TECHNICAL_GUIDELINES.md`
- `.github/instructions/next-rsc-boundary.instructions.md`
- `.github/instructions/next-route-segment-behavior.instructions.md`
- `.github/instructions/app-router-cache-revalidation.instructions.md`
