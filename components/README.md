# components

Folder ini menampung seluruh komponen UI aplikasi yang dipisah berdasarkan tanggung jawab.

## Kegunaan
- Menyimpan primitive UI, block interaktif, utilitas animasi, dan section halaman.
- Menjaga modularitas komponen agar mudah dirawat dan diuji.
- Menjadi boundary utama antara presentasi, interaksi, dan motion behavior.

## Struktur
- `components/ui`: primitive dan wrapper UI.
- `components/blocks`: blok UI interaktif reusable.
- `components/anim`: provider dan helper animasi.
- `components/sections`: komposisi section level halaman.

## Aturan Umum
- Gunakan naming convention konsisten untuk file, selector, dan props.
- Komponen presentasi tidak melakukan fetch data utama portfolio.
- Class dinamis wajib menggunakan helper `cn`.

## Referensi
- `docs/TECHNICAL_GUIDELINES.md`
- `.github/instructions/ui-tailwind-cn.instructions.md`
- `.github/instructions/naming-conventions.instructions.md`
