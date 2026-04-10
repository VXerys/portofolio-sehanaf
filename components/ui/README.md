# components/ui

Folder ini berisi primitive UI dan wrapper dasar untuk memastikan konsistensi design system.

## Kegunaan
- Menyimpan komponen fundamental seperti button, badge, dialog, dan turunan wrapper-nya.
- Menjaga aksesibilitas dan API komponen tetap stabil.
- Menjadi fondasi untuk komponen di folder `blocks` dan `sections`.

## Aturan
- Jangan memodifikasi primitive secara sembarangan jika pattern wrapper lebih tepat.
- Komposisi class dinamis harus lewat `cn`, bukan string template raw.
- Variants harus deterministik dan typed.

## Batasan
- Tidak menaruh logic fetch data.
- Tidak menaruh timeline animasi berat di primitive level.

## Referensi
- `.github/instructions/shadcn-wrapper-governance.instructions.md`
- `.github/instructions/ui-tailwind-cn.instructions.md`
- `docs/TECHNICAL_GUIDELINES.md`
