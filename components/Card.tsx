type CardProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function Card({ title, description, children }: CardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg shadow-sm">
      <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-3 text-sm leading-6 text-gray-500">{description}</p>
        )}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </div>
  );
}
