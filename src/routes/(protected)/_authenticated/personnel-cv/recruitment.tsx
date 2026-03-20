import { HeaderWrapper } from '@/components/main/HeaderWrapper';
import { EditRecruitmentDialog } from '@/components/personnel-cv/EditRecruitmentDialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type RecruitmentInfo } from '@/schemas/recruitment';
import { getMyProfile } from '@/services/api/profile';
import { updateRecruitmentInfo } from '@/services/api/recruitment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Download, Edit, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/recruitment',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getMyProfile,
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<RecruitmentInfo>) =>
      updateRecruitmentInfo(profile?.id as number, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
    },
  });

  if (isLoading) {
    return <div className="p-8 text-center">Đang tải thông tin...</div>;
  }

  if (!profile) {
    return (
      <div className="p-8 text-center">Không tìm thấy thông tin nhân sự.</div>
    );
  }

  const recruitment = profile.recruitment;
  const info = recruitment?.info;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <HeaderWrapper title="Thông tin tuyển dụng">
        <Button variant="outline" onClick={() => setIsEditOpen(true)}>
          <Edit className="h-4 w-4" /> Chỉnh sửa
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ['profile', 'me'] })
          }
        >
          <RotateCcw className="h-4 w-4" /> Cập nhật
        </Button>
        <Button>
          <Download className="h-4 w-4" /> Xuất lý lịch
        </Button>
      </HeaderWrapper>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
          <InfoRow
            label="Cơ quan, đơn vị tuyển dụng"
            value={info?.recruitingUnitId || ''}
          />
          <InfoRow
            label="Ngày tuyển dụng"
            value={info?.recruitmentDate || ''}
          />
          <InfoRow label="Hình thức trả lương" value={info?.salaryForm || ''} />
          <InfoRow
            label="Nghề nghiệp trước khi được tuyển dụng"
            value={info?.previousOccupation || ''}
          />
          <InfoRow
            label="Năm vào ngành giáo dục"
            value={info?.eduSectorStartYear || ''}
          />
          <InfoRow
            label="Ngày bắt đầu vào ĐHQGHN"
            value={info?.vnuStartDate || ''}
          />
          <InfoRow
            label="Thâm niên công tác"
            value={info?.workSeniorityYears || ''}
          />
          <InfoRow
            label="Công việc đã làm lâu nhất"
            value={info?.longestJob || ''}
          />
          <InfoRow label="Nhóm vị trí việc làm" value={info?.jobGroup || ''} />
          <InfoRow
            label="Vị trí việc làm cấp ĐHQGHN"
            value={info?.jobPositionVnu || ''}
          />
          <InfoRow
            label="Vị trí việc làm cấp đơn vị"
            value={info?.jobPositionUnit || ''}
          />
          <InfoRow
            label="Công việc chính được giao"
            value={info?.mainAssignedWork || ''}
          />
          <InfoRow label="Ghi chú" value={info?.notes || ''} />
        </div>
      </div>

      <EditRecruitmentDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={info || null}
        onSubmit={async (data) => {
          await updateMutation.mutateAsync(data);
        }}
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
      <span className="w-60 shrink-0 font-semibold tracking-wider">
        {label}
      </span>
      <span className="flex-1 leading-relaxed">{value || '---'}</span>
    </div>
  );
}
