import { Plus } from 'lucide-react';

interface ActionBarProps {
  onAdd?: () => void;
}

export function ActionBar({ onAdd }: ActionBarProps) {
  return (
    <div className="flex justify-end border-b border-gray-200 bg-slate-50 p-3">
      <button
        onClick={onAdd}
        className="bg-vnu-yellow flex items-center gap-1.5 rounded px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500"
      >
        <Plus className="h-4 w-4" />
        Thêm mới
      </button>
    </div>
  );
}
