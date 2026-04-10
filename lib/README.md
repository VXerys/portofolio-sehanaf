# lib

Folder ini berisi utilitas dan service layer yang dipakai lintas aplikasi.

## Kegunaan
- Menyimpan helper generik untuk komposisi class, formatting, dan utilitas lain.
- Menjadi lokasi modul integrasi domain, misalnya akses data Supabase di subfolder khusus.
- Menjaga pemisahan tanggung jawab antara UI dan data/service logic.

## Struktur
- `lib/supabase`: client server/browser dan query functions typed.
- File utilitas lain: helper murni tanpa ketergantungan UI.

## Aturan
- Utility harus side-effect minimal dan reusable.
- Kontrak tipe harus eksplisit untuk fungsi publik.

## Referensi
- `.github/instructions/supabase-data-typing.instructions.md`
- `.github/instructions/naming-conventions.instructions.md`
- `docs/TECHNICAL_GUIDELINES.md`
