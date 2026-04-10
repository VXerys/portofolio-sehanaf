# hooks

Folder ini berisi custom hook reusable untuk logic client-side yang tidak terkait fetch data utama.

## Kegunaan
- Menyimpan hook utilitas interaksi seperti media query, pointer tracking, dan behavior UI.
- Menjaga code reuse untuk logic stateful yang dipakai di banyak komponen.

## Aturan
- Hook harus punya nama `use-*` yang jelas dan deskriptif.
- Hook wajib aman terhadap SSR/CSR boundary bila mengakses window atau document.
- Untuk logic motion, pastikan kompatibel dengan lifecycle animasi yang digunakan project.

## Batasan
- Jangan memindahkan portfolio read fetch utama ke hook client.
- Hindari side effect berantai yang sulit dibersihkan.

## Referensi
- `.github/instructions/naming-conventions.instructions.md`
- `.github/instructions/next-rsc-boundary.instructions.md`
- `docs/TECHNICAL_GUIDELINES.md`
