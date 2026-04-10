# components/sections

Folder ini berisi komponen section level halaman yang menyusun alur konten utama portfolio.

## Kegunaan
- Menyimpan section seperti hero, selected works, about, timeline, archive, dan footer.
- Menjadi titik komposisi antara shell Server Component dan island Client Component.
- Mengikat narasi UX dari awal hingga akhir halaman.

## Aturan
- Data utama di-fetch dari parent Server Component, lalu dipassing sebagai props serializable.
- Interaksi dan animasi berada di Client Component yang terkontrol lifecycle-nya.
- Section yang tidak menemukan data wajib memiliki pola not-found/loading sesuai segment behavior.

## Batasan
- Hindari fetch data utama langsung di Client Component.
- Hindari timeline animasi tanpa cleanup atau tanpa branch mobile.

## Referensi
- `.github/instructions/next-rsc-boundary.instructions.md`
- `.github/instructions/next-route-segment-behavior.instructions.md`
- `.github/instructions/gsap-lenis-motion.instructions.md`
- `docs/FEATURES.md`
