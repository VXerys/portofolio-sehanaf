# .github

Folder ini menyimpan seluruh konfigurasi dan orkestrasi AI coding workflow untuk repository.

## Kegunaan
- Menentukan aturan global agent melalui `copilot-instructions.md`.
- Menyediakan spesialisasi agent di subfolder `agents`.
- Menyediakan instruction pack domain di subfolder `instructions`.
- Menyediakan prompt template di subfolder `prompts`.
- Menyediakan skill workflow reusable di subfolder `skills`.

## Batasan
- Jangan menaruh kode aplikasi runtime di folder ini.
- Perubahan di folder ini harus menjaga konsistensi deskripsi agar auto-selection tetap stabil.
- File yang sudah ada di subfolder tidak diganti namanya tanpa update referensi silang.

## Alur Pakai Singkat
1. Gunakan `agents` untuk pembagian ownership tugas.
2. Gunakan `instructions` untuk guardrail per domain.
3. Gunakan `prompts` untuk shortcut tugas berulang.
4. Gunakan `skills` untuk workflow implementasi yang bisa dipakai ulang.

## Referensi
- `docs/TECHNICAL_GUIDELINES.md`
- `.github/copilot-instructions.md`
- `.github/agents/README.md`
- `.github/instructions/README.md`
- `.github/prompts/README.md`
- `.github/skills/README.md`
