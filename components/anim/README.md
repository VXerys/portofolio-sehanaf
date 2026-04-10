# components/anim

Folder ini berisi provider, bridge, dan helper animasi global yang dipakai lintas section.

## Kegunaan
- Menyimpan setup plugin GSAP terpusat.
- Menyimpan setup Lenis yang sinkron dengan GSAP dan ScrollTrigger.
- Menyediakan utilitas animasi reusable dengan cleanup yang aman.

## Aturan Kritis
- Setup GSAP timeline tidak boleh memakai `useEffect`; gunakan `useGSAP` dengan scope.
- Registrasi plugin dilakukan sekali di provider bersama, bukan di body komponen.
- Sinkronisasi Lenis + ScrollTrigger wajib dijaga, termasuk teardown saat unmount.
- Efek berat harus punya degradasi mobile berbasis `gsap.matchMedia`.

## Batasan
- Jangan membuat loop RAF paralel yang bentrok dengan bridge global.
- Hindari properti animasi yang memicu layout thrashing.

## Referensi
- `.github/instructions/gsap-plugin-registration.instructions.md`
- `.github/instructions/lenis-scroll-bridge.instructions.md`
- `.github/instructions/motion-performance-gate.instructions.md`
- `docs/TECHNICAL_GUIDELINES.md`
