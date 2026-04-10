# types

Folder ini menyimpan definisi tipe TypeScript untuk menjaga kontrak data tetap ketat dan konsisten.

## Kegunaan
- Menyimpan tipe hasil generate schema Supabase.
- Menyimpan domain interface turunan yang dipakai oleh komponen dan query.
- Menjadi sumber kebenaran tipe untuk data flow aplikasi.

## Aturan
- Pisahkan tipe generated dan tipe domain agar mudah dirawat.
- Hindari `any` dalam kontrak data.
- Saat schema berubah, regenerasi tipe lalu sinkronkan signature query dan props.

## Batasan
- Jangan menduplikasi tipe yang sudah bisa diturunkan dari source utama.
- Hindari definisi tipe ambigu yang menyulitkan narrowing.

## Referensi
- `.github/instructions/supabase-schema-type-sync.instructions.md`
- `.github/instructions/supabase-data-typing.instructions.md`
- `docs/DATABASE.md`
