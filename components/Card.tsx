type CardProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function Card({ title, description, children }: CardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 transition hover:border-secondary hover:bg-surface2">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-3 text-sm leading-6 text-gray-500">{description}</p>
      )}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}