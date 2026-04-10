import {
  BodyText,
  DisplayHeading,
  LabelText,
  SectionHeading,
} from "@/components/ui/typography";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-base-100">
      <main className="relative z-10 min-h-[120vh] w-full rounded-b-3xl border-b border-base-300/40 bg-base-100 px-4 py-8 shadow-2xl sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
          <section className="rounded-3xl border border-base-300 bg-gradient-to-br from-base-200 to-base-100 p-6 sm:p-10 lg:p-14">
            <LabelText>Theme + Font Showcase</LabelText>
            <DisplayHeading className="mt-3 text-primary">
              M. Sechan Alfarisi
            </DisplayHeading>
            <BodyText className="mt-4 max-w-2xl">
              Ini adalah preview langsung bagaimana Maghfirea tampil sebagai display font dan Inter
              dipakai untuk body text di atas semantic color token DaisyUI.
            </BodyText>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="btn btn-primary font-sans">Primary Action</button>
              <button className="btn btn-outline border-base-300 text-base-content font-sans">
                Secondary Action
              </button>
              <button className="btn btn-ghost text-base-content/80 font-sans">Ghost Action</button>
            </div>
          </section>

          <section className="grid gap-4 sm:gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-base-300 bg-base-200/50 p-5 sm:p-6">
              <LabelText>Display</LabelText>
              <SectionHeading className="mt-2 text-primary">Creative Heading</SectionHeading>
              <BodyText className="mt-3">
                Heading menggunakan Maghfirea untuk karakter visual yang kuat.
              </BodyText>
            </article>

            <article className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
              <LabelText>Body</LabelText>
              <SectionHeading className="mt-2">Readable Paragraph</SectionHeading>
              <BodyText className="mt-3">
                Body copy menggunakan Inter untuk keterbacaan tinggi di mobile maupun desktop.
              </BodyText>
            </article>

            <article className="rounded-2xl border border-base-300 bg-base-200/30 p-5 sm:p-6">
              <LabelText>Contrast</LabelText>
              <SectionHeading className="mt-2">Semantic Text Color</SectionHeading>
              <p className="mt-3 font-sans text-sm leading-relaxed text-base-content/70 sm:text-base">
                Teks mengikuti token text-base-content agar aman lintas theme state.
              </p>
            </article>
          </section>

          <section className="rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-8">
            <LabelText>Typography Scale Check</LabelText>
            <h1 className="mt-4 font-display text-4xl leading-tight text-base-content sm:text-5xl lg:text-6xl">
              Heading H1 Display Scale
            </h1>
            <h2 className="mt-4 font-display text-3xl leading-tight text-base-content sm:text-4xl">
              Heading H2 Display Scale
            </h2>
            <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-base-content/85 sm:text-lg">
              The quick brown fox jumps over the lazy dog. Inter dipakai untuk body text dengan
              line-height yang nyaman dibaca pada viewport kecil 320-375 maupun desktop.
            </p>
          </section>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}
