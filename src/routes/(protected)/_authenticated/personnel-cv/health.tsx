import { CustomErrorComponent } from '@/components/main/CustomErrorComponent';
import { CustomPendingComponent } from '@/components/main/CustomPendingComponent';
import { HeaderWrapper } from '@/components/main/HeaderWrapper';
import { Button } from '@/components/ui/button';
import { profileQueryOptions } from '@/hooks/use-profile';
import { cn } from '@/lib/utils';
import {
  HEALTH_RECORD,
  HEALTH_RECORD_MAP,
  HEALTH_STATUS_MAP,
  type HealthRecord,
} from '@/schemas/personnel-cv/health';
import { services } from '@/services/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Download, RotateCcw } from 'lucide-react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/health',
)({
  component: RouteComponent,
  errorComponent: CustomErrorComponent,
  pendingComponent: CustomPendingComponent,
});

function RouteComponent() {
  const { data: profile } = useSuspenseQuery(profileQueryOptions);

  const { data: healthRecord } = useSuspenseQuery({
    queryKey: ['health', profile.id],
    queryFn: () => services.getHealthRecord(profile.id),
  });

  return (
    <div className="">
      <HeaderWrapper title="Tình trạng sức khỏe">
        <Button variant="outline">
          <RotateCcw className="h-4 w-4" /> Cập nhật
        </Button>
        <Button>
          <Download className="h-4 w-4" /> Xuất lý lịch
        </Button>
      </HeaderWrapper>
      <InfoGroup healthRecord={healthRecord} />
    </div>
  );
}

function InfoGroup({ healthRecord }: { healthRecord: HealthRecord }) {
  return (
    <div className="mt-2 px-4 py-6">
      <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
        {Object.entries(healthRecord).map(([key, value]) => {
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

          if (key === HEALTH_RECORD.NOTES) {
            return null;
          }

          return <InfoRow key={key} label={label} value={value} />;
        })}
      </div>

      <InfoRow
        label={HEALTH_RECORD_MAP[HEALTH_RECORD.NOTES]}
        value={healthRecord.notes}
        className="border-0 pt-6"
      />
    </div>
  );
}

function InfoRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start border-b py-2', className)}>
      <span className="w-40 shrink-0 font-semibold tracking-wider">
        {label}
      </span>
      <span className="flex-1 leading-relaxed">{value || '---'}</span>
    </div>
  );
}
