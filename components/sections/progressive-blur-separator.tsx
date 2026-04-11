import { LogosSlider } from '@/components/ui/logos-slider';

export default function ProgressiveBlurSeparator() {
  return (
    <section
      aria-label="Technology slider transition"
      className="w-full bg-base-100 pb-2 pt-1 sm:pb-3 sm:pt-2"
    >
      <LogosSlider />
    </section>
  );
}
