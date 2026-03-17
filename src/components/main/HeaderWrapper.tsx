export function HeaderWrapper({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border p-4">
      <h2 className="font-semibold uppercase">{title}</h2>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
