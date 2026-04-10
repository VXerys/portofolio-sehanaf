# public

Folder ini menyimpan aset statis yang disajikan langsung oleh Next.js tanpa proses bundling modul.

## Kegunaan
- Menyimpan ikon, gambar, font, dan aset publik lain.
- Menjadi sumber file yang diakses via path absolut, misalnya `/logo.svg`.
- Menjaga pemisahan antara aset runtime UI dan kode aplikasi.

## Struktur Disarankan
- `public/fonts`: file font yang dipakai global.
- `public/images`: aset gambar konten dan dekoratif.

## Batasan
- Hindari menaruh aset sensitif atau private.
- Gunakan penamaan file yang konsisten dan deskriptif.
- Untuk aset berukuran besar, optimalkan ukuran sebelum disimpan.

## Referensi
- `docs/FEATURES.md`
- `docs/TECHNICAL_GUIDELINES.md`
