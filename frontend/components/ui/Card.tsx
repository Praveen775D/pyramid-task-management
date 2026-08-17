export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] ${className}`}>
      {children}
    </div>
  );
}
