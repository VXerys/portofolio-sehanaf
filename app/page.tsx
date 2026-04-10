import { BodyText, DisplayHeading, SectionHeading } from "@/components/ui/typography";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20 bg-base-100">
      <section className="w-full max-w-4xl rounded-3xl border border-base-300 bg-base-200/40 p-8 sm:p-12">
        <DisplayHeading className="text-primary">Portfolio Typography Theme</DisplayHeading>
        <BodyText className="mt-4">
          Maghfirea dipakai sebagai display utama untuk headline, sedangkan Inter menjadi font
          secondary untuk body copy. Seluruh warna teks tetap mengikuti semantic token DaisyUI
          agar konsisten dengan theme aktif.
        </BodyText>

        <div className="mt-10 space-y-4">
          <SectionHeading>Reusable Font System</SectionHeading>
          <BodyText>
            Gunakan komponen typography di components/ui supaya style font tidak di-hardcode
            berulang kali di setiap section.
          </BodyText>
        </div>
      </section>
    </main>
  );
}
