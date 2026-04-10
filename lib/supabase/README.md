# lib/supabase

Folder ini adalah pusat akses data Supabase yang typed dan aman boundary server/client.

## Kegunaan
- Menyimpan inisialisasi Supabase server client dan browser client.
- Menyimpan query function terpusat untuk kebutuhan portfolio.
- Menjaga konsistensi tipe return dan projection query lintas fitur.

## Aturan Kritis
- Query functions dipusatkan agar mudah diaudit dan dipakai ulang.
- Read path utama portfolio tetap server-first.
- Service role key tidak boleh pernah diekspos ke public environment.
- Setiap perubahan schema wajib diikuti sinkronisasi tipe.

## Batasan
- Hindari query inline acak di komponen UI.
- Hindari penggunaan `any` pada kontrak query.

## Referensi
- `.github/instructions/supabase-data-typing.instructions.md`
- `.github/instructions/supabase-rls-env-boundary.instructions.md`
- `.github/instructions/supabase-schema-type-sync.instructions.md`
- `docs/DATABASE.md`
