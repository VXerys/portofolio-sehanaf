# components/blocks

Folder ini berisi blok UI interaktif reusable untuk experience visual yang lebih kaya.

## Kegunaan
- Menyimpan komponen blok seperti bento, marquee, cursor, atau efek visual terarah.
- Menjadi lapisan kreatif di atas primitive `components/ui`.
- Mendukung komposisi section tanpa menggandakan logic UI kompleks.

## Aturan
- Jika blok membutuhkan data, data dikirim dari parent Server Component sebagai props typed.
- Logic motion harus mengikuti lifecycle GSAP yang aman dan cleanup deterministik.
- Branching desktop/mobile wajib untuk efek berat.

## Batasan
- Hindari fetch data utama langsung dari client block.
- Hindari efek berat tanpa fallback mobile.

## Referensi
- `.github/instructions/twentyfirst-block-integration.instructions.md`
- `.github/instructions/gsap-lenis-motion.instructions.md`
- `.github/instructions/motion-mobile-degradation.instructions.md`
