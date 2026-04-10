---
name: responsive-device-slicing
description: 'Use when: slicing UI into responsive layouts with mobile-first execution, focused validation on small mobile devices (320-375), touch-safe interactions, and overflow prevention. Keywords: responsive, mobile, breakpoint, viewport, any device.'
argument-hint: 'Jelaskan path komponen, requirement device matrix, dan masalah layout yang ingin diperbaiki.'
user-invocable: true
---

# Responsive Device Slicing

## Tujuan

Skill ini memandu proses slicing UI agar konsisten di semua device, dengan prioritas mobile-first dan fokus khusus pada stabilitas mobile.

## Kapan Digunakan

- Saat implementasi UI dari design ke kode membutuhkan dukungan any devices.
- Saat komponen terlihat benar di desktop tetapi rusak di mobile atau tablet.
- Saat muncul bug seperti horizontal overflow, ukuran tap target terlalu kecil, atau layout collapse pada layar sempit.
- Saat mengadaptasi block interaktif agar tetap usable pada touch device.

## Input Minimal

- Path file yang akan dikerjakan.
- Target behavior pada mobile kecil (320-375) sebagai baseline wajib.
- Target behavior breakpoint lain bila memang dibutuhkan task.
- Batasan visual atau aksesibilitas (jika ada).
- Indikasi apakah komponen mengandung motion berat.

## Prosedur

1. Tetapkan baseline mobile-first.
- Mulai dari viewport kecil terlebih dahulu, kemudian naik ke tablet dan desktop.
- Hindari asumsi desktop-first yang dipaksa turun ke mobile.

2. Klasifikasikan komponen sebelum slicing.
- Tentukan tipe: presentational, interactive block, atau motion-heavy.
- Jika motion-heavy, aktifkan alur degradasi mobile dan branch behavior.

3. Bangun struktur layout yang tahan konten dinamis.
- Gunakan skala spacing dan typography yang konsisten.
- Siapkan antisipasi untuk teks panjang, badge banyak, atau data kosong.

4. Terapkan breakpoint secara eksplisit.
- Definisikan perubahan layout per breakpoint, bukan perubahan acak.
- Pastikan grid, flex direction, dan ukuran elemen punya alasan per device.

5. Adaptasi interaksi untuk touch device.
- Pastikan tap target aman disentuh.
- Kurangi dependensi hover-only behavior di mobile.
- Sediakan fallback interaksi bila fitur desktop tidak tersedia di touch.

6. Lindungi performa mobile.
- Kurangi visual berat pada layar kecil.
- Untuk motion, gunakan branch desktop/mobile yang jelas dan cleanup yang aman.

7. Validasi aksesibilitas dan stabilitas.
- Cek fokus keyboard, urutan baca, dan kontras.
- Pastikan tidak ada horizontal scroll yang tidak disengaja.

8. Final gate sebelum selesai.
- Jalankan checklist verifikasi lintas viewport.
- Dokumentasikan keputusan responsive yang non-obvious.

9. Selaraskan styling dengan semantic token.
- Untuk warna surface, teks, border, dan status gunakan DaisyUI semantic tokens dari app/globals.css seperti bg-base-100, text-base-content, text-primary, dan border-base-300.
- Hindari hardcoded hex color agar slicing tetap konsisten dengan tema aktif.
- Untuk tipografi, gunakan Maghfirea pada heading/display hierarchy dan Inter pada body/secondary copy agar konsisten lintas device.

## Decision Branching

- Jika komponen memakai GSAP atau efek berat:
  Gunakan alur mobile degradation dan matchMedia; desktop boleh kaya efek, mobile harus lebih ringan.
- Jika komponen hanya presentational:
  Fokuskan ke struktur layout, hierarchy spacing, dan readability lintas ukuran.
- Jika komponen menerima data server:
  Pertahankan RSC-first boundary; jangan memindahkan fetch utama ke client saat memperbaiki responsive.
- Jika pattern responsive berulang di banyak file:
  Ekstrak ke wrapper reusable agar konsistensi meningkat.

## Kriteria Selesai

- Tidak ada horizontal overflow pada mobile kecil (320-375).
- Hierarki konten, spacing, dan typography tetap jelas pada mobile kecil.
- Interaksi utama dapat digunakan tanpa hover.
- Tap target elemen interaktif cukup aman untuk touch.
- Jika task mencakup breakpoint tambahan, semua behavior tambahan tervalidasi tanpa regresi mobile kecil.
- Tidak ada regresi terhadap aturan RSC, cn composition, dan motion safety.

## Referensi

- ../../instructions/ui-tailwind-cn.instructions.md
- ../../instructions/motion-mobile-degradation.instructions.md
- ../../instructions/gsap-lenis-motion.instructions.md
- ../../prompts/standardize-ui-tailwind-cn.prompt.md
- ../../prompts/adapt-21st-shadcn-wrapper.prompt.md
- ../adapt-21st-shadcn-component.skill.md
- ../build-scrolltrigger-timeline.skill.md
