import { Download, RefreshCw } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onRefresh?: () => void;
  onExport?: () => void;
  showRefresh?: boolean;
}

export function PageHeader({
  title,
  onRefresh,
  onExport,
  showRefresh = true,
}: PageHeaderProps) {
  return (
    <div className="bg-vnu-bg-light flex items-center justify-between border-b border-gray-200 p-3">
      <h1 className="text-vnu-green ml-2 text-base font-bold uppercase md:text-lg">
        {title}
      </h1>
      <div className="flex gap-2">
        {showRefresh && (
          <button
            onClick={onRefresh}
            className="bg-vnu-yellow flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500"
          >
            <RefreshCw className="h-4 w-4" />
            Cập nhật
          </button>
        )}
        <button
          onClick={onExport}
          className="bg-vnu-teal flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          <Download className="h-4 w-4" />
          Xuất lý lịch
        </button>
      </div>
    </div>
  );
}
