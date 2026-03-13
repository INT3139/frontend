export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center text-sm">
      <div className="w-60 shrink-0 font-semibold text-gray-700">{label}</div>
      <div className="w-6 shrink-0 text-gray-600">:</div>
      <div className="flex-1 text-gray-800">{value}</div>
    </div>
  );
}
