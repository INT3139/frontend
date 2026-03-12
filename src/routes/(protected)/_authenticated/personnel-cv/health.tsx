import { Button } from '@/components/ui/button';
import {
  HEALTH_RECORD,
  HEALTH_RECORD_MAP,
  HEALTH_STATUS_MAP,
  type HealthRecord,
} from '@/schemas/personnel-cv/health';
import { createFileRoute } from '@tanstack/react-router';
import { Printer, RotateCcw } from 'lucide-react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/health',
)({
  component: RouteComponent,
});

const mockHealthRecord: HealthRecord = {
  health_status: 'B1',
  height: 169,
  weight: 63,
  blood_type: 'AB',
  notes:
    'Thoái hóa khớp nhẹ. A looooooooooooooooooooooooooooooooooooooooong word. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
};

function RouteComponent() {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between border border-gray-400 px-4 py-6">
        <h2 className="text-lg font-semibold uppercase">Tình trạng sức khỏe</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4" /> Cập nhật
          </Button>
          <Button>
            <Printer className="h-4 w-4" /> Xuất lý lịch
          </Button>
        </div>
      </div>
      <InfoGroup />
    </div>
  );
}

function InfoGroup() {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-4 px-4 py-6 lg:grid-cols-2">
      {Object.entries(mockHealthRecord).map(([key, value]) => {
        const label = HEALTH_RECORD_MAP[key as keyof HealthRecord];

        if (key === HEALTH_RECORD.HEALTH_STATUS) {
          value = `Loại ${value} (${HEALTH_STATUS_MAP[value as keyof typeof HEALTH_STATUS_MAP]})`;
        }

        if (key === HEALTH_RECORD.HEIGHT) {
          value = ((value as number) / 100).toFixed(2);
        }

        if (key === HEALTH_RECORD.BLOOD_TYPE && value === 'Unknown') {
          value = '';
        }
        return <InfoRow key={key} label={label} value={value} />;
      })}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-start border-b border-gray-500 py-2 last:border-0">
      <span className="w-40 shrink-0 font-semibold tracking-wider">
        {label}
      </span>
      <span className="flex-1 leading-relaxed break-all">{value || '---'}</span>
    </div>
  );
}
