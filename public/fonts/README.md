# public/fonts

Folder ini menyimpan file font statis yang dipakai aplikasi.

## Font Aktif

- Maghfirea sebagai font display utama (heading besar dan hero text).
- Inter sebagai font secondary/body untuk konten UI harian.

## Struktur Saat Ini

- `public/fonts/maghfirea/Maghfirea.ttf`
- `public/fonts/inter/Inter-VariableFont_opsz,wght.ttf`
- `public/fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf`

## Kegunaan

- Menempatkan font lokal agar pengelolaan tipografi konsisten dan terkontrol.
- Mendukung strategi pemuatan font di level layout atau konfigurasi font project.

## Aturan

- Gunakan format modern dan efisien seperti `woff2` bila tersedia.
- Gunakan nama file konsisten berdasarkan keluarga dan varian.
- Pastikan lisensi font valid untuk penggunaan project.
- Integrasi runtime wajib melalui `next/font/local` di root layout, bukan import CDN langsung.
- Paparan variabel font wajib reusable, misalnya `--font-maghfirea` dan `--font-inter`.

## Batasan

- Jangan menyimpan file font duplikat tanpa alasan.
- Hindari file font tidak terpakai agar bundle tetap efisien.
- Jika deployment komersial/public, verifikasi lisensi Maghfirea sebelum rilis.

## Referensi

- `docs/TECHNICAL_GUIDELINES.md`
- `docs/FEATURES.md`
