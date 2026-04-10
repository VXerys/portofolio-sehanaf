import type { ReactNode } from "react";

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
};

function mergeClassName(base: string, className?: string): string {
  return className ? `${base} ${className}` : base;
}

export function DisplayHeading({ children, className }: BaseTypographyProps) {
  return (
    <h1
      className={mergeClassName(
        "font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-base-content",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function SectionHeading({ children, className }: BaseTypographyProps) {
  return (
    <h2
      className={mergeClassName(
        "font-display text-2xl sm:text-3xl leading-tight text-base-content",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function BodyText({ children, className }: BaseTypographyProps) {
  return (
    <p
      className={mergeClassName(
        "font-sans text-base sm:text-lg leading-relaxed text-base-content/85",
        className,
      )}
    >
      {children}
    </p>
  );
}