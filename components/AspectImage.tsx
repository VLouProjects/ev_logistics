import Image from "next/image";

type Ratio = "4/3" | "3/2" | "16/10";

type Props = {
  /** Local path under /public (e.g. "/images/vehicles/light-truck.webp"). Omit to show a branded placeholder. */
  src?: string;
  alt: string;
  ratio?: Ratio;
  /** Fixed-height Tailwind classes (e.g. "h-40 md:h-52"). Overrides `ratio` — use for full-width banners where a pure aspect ratio would be too tall. */
  heightClass?: string;
  /** Responsive sizes hint for the optimizer. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const ratioClass: Record<Ratio, string> = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/10": "aspect-[16/10]"
};

/**
 * Fixed-ratio image frame. Renders a Next.js <Image> when `src` is provided,
 * otherwise a tasteful, on-brand placeholder so layouts read as intentional
 * before real photography is supplied. The aspect ratio is enforced by the
 * wrapper, so cards never shift (CLS = 0) regardless of the source image.
 */
export default function AspectImage({
  src,
  alt,
  ratio = "4/3",
  heightClass,
  sizes = "100vw",
  priority = false,
  className
}: Props) {
  const sizeClass = heightClass ?? ratioClass[ratio];
  return (
    <div
      className={`relative w-full overflow-hidden bg-surface ${sizeClass} ${className ?? ""}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface2"
          role="img"
          aria-label={alt}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-gray-300"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="M21 15l-5-4-6 5-3-2.5L3 17" />
          </svg>
        </div>
      )}
    </div>
  );
}
