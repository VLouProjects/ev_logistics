type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function Section({
  eyebrow,
  title,
  description,
  children
}: SectionProps) {
  return (
    <section className="border-t border-border px-6 py-14 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 max-w-3xl md:mb-12">
          {eyebrow && (
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </div>
          )}
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-7 text-gray-500">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}